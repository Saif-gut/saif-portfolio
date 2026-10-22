import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const cwd=resolve(dirname(fileURLToPath(import.meta.url)), '..');
const git=(...args)=>execFileSync('git',args,{cwd,maxBuffer:32*1024*1024});
const patterns=[
 ['GitHub token', /\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,})\b/g],
 ['AI API key', /\bsk-(?:proj-|ant-)?[A-Za-z0-9_-]{32,}\b/g],
 ['AWS access key', /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/g],
 ['Google API key', /\bAIza[0-9A-Za-z_-]{35}\b/g],
 ['Slack token', /\bxox[baprs]-[A-Za-z0-9-]{20,}\b/g],
 ['Private key', /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/g],
 ['Credential in connection string', /(?:postgres(?:ql)?|mysql|mongodb(?:\+srv)?):\/\/[^\s:@/]+:[^\s@/]+@/gi],
 ['JWT credential', /\beyJ[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{15,}\b/g],
 ['Assigned credential', /\b(?:api[_-]?key|access[_-]?token|auth[_-]?token|client[_-]?secret|password|passwd|service[_-]?role[_-]?key)\s*[=:]\s*["'][^"'\r\n]{8,}["']/gi],
];
const riskyPath=/(?:^|\/)(?:\.env(?:\..*)?|credentials[^/]*|id_rsa|id_ed25519|[^/]+\.(?:pem|key|pfx|p12|sqlite3?|db|bak|backup|zip|7z|bundle))$/i;
const placeholders=/example|placeholder|changeme|your[_ -]|REPLACE|test[_ -]|process\.env|os\.getenv|<[^>]+>/i;
const findings=new Map(); let scanned=0;
function scan(buffer,path,commit='working-tree'){
 if(riskyPath.test(path)&&!/(?:\.env\.example|\.env\.sample)$/.test(path)) findings.set(`file:${path}`,{path,risk:'Sensitive configuration or backup filename',commit});
 if(buffer.includes(0)) return;
 const s=buffer.toString('utf8'); scanned++;
 for(const [risk,re] of patterns){ re.lastIndex=0; for(const m of s.matchAll(re)){
   if(risk==='Assigned credential'&&placeholders.test(m[0]))continue;
   const line=s.slice(0,m.index).split('\n').length;
   findings.set(`${path}:${risk}:${line}`,{path,line,risk,commit});
 }}
}
const commits=git('rev-list','--all').toString().trim().split('\n').filter(Boolean);
const objects=new Map();
for(const commit of commits){
 for(const e of git('ls-tree','-rz',commit).toString().split('\0').filter(Boolean)){
  const [meta,path]=e.split('\t');const [,type,sha]=meta.split(' ');if(type!=='blob')continue;
  if(riskyPath.test(path)&&!/(?:\.env\.example|\.env\.sample)$/.test(path))findings.set(`file:${path}`,{path,risk:'Sensitive configuration or backup filename',commit:commit.slice(0,12)});
  if(!objects.has(sha))objects.set(sha,{path,commit:commit.slice(0,12)});
 }
}
for(const [sha,{path,commit}]of objects)scan(git('cat-file','blob',sha),path,commit);
for(const path of git('ls-files','--cached','--others','--exclude-standard','-z').toString().split('\0').filter(Boolean)){
 try{scan(readFileSync(resolve(cwd,path)),path);}catch(error){if(error.code!=='ENOENT')throw error;}
}
// Never print matching lines or credential values.
console.log(JSON.stringify({commits:commits.length,uniqueHistoricalBlobs:objects.size,textVersionsScanned:scanned,findings:[...findings.values()],limitations:['Pattern-based scan; no guarantee against arbitrary or obfuscated secrets.','Remote Actions secret values and account settings are not accessible.']},null,2));
// Historical backup paths require review, but are not proof of a leaked credential.
if([...findings.values()].some(finding => finding.risk !== 'Sensitive configuration or backup filename' || finding.commit === 'working-tree')) process.exitCode=1;
