import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [320, 390, 430, 768, 1024, 1366, 1440, 1920]) {
  test(`layout, assets and accessibility at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("response", (response) => {
      if (response.status() >= 400)
        errors.push(`${response.status()}: ${response.url()}`);
    });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.locator("summary").first().click();
    await page.locator("summary").nth(1).click();
    // Exercise every image, including lazy images, and every major section.
    for (const section of await page.locator("main section").all()) {
      await section.scrollIntoViewIfNeeded();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
    await page.getByRole("button", { name: "Python-Editor", exact: true }).click();
    for (const img of await page.locator("img:visible").all()) {
      await img.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          img.evaluate((image) => image.complete && image.naturalWidth > 0),
        )
        .toBe(true);
    }
    await page.getByRole("button", { name: "Lernraum", exact: true }).click();
    const overflowing = await page.locator("main *").evaluateAll((elements) =>
      elements
        .filter((element) => {
          const box = element.getBoundingClientRect();
          return box.width && (box.right > innerWidth + 1 || box.left < -1);
        })
        .map((element) => `${element.tagName}.${element.className}`),
    );
    expect(overflowing).toEqual([]);
    expect(errors).toEqual([]);
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      audit.violations.map((item) => ({
        id: item.id,
        nodes: item.nodes.map((node) => node.target),
      })),
    ).toEqual([]);
  });
}

test("mobile menu: keyboard, Escape, anchors and resize", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Menü" });
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  for (const id of [
    "start",
    "projekte",
    "about",
    "skills",
    "lernweg",
    "kontakt",
  ]) {
    await toggle.click();
    await page.locator(`.main-nav a[href="#${id}"]`).click();
    await expect(page.locator(`#${id}`)).toBeFocused();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(page.locator(`.main-nav a[href="#${id}"]`)).toHaveAttribute(
      "aria-current",
      "location",
    );
  }
  await toggle.click();
  await page.setViewportSize({ width: 1366, height: 900 });
  await expect(page.locator(".menu-toggle")).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  await expect(page.locator(".main-nav")).toBeVisible();
});

test("course data and details remain accessible without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 800 },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4174");
  await expect(page.locator(".main-nav")).toBeVisible();
  await page.locator("summary").first().click();
  const rows = await page
    .locator("tbody tr")
    .evaluateAll((rows) =>
      rows.map((row) =>
        [...row.cells].slice(1).map((cell) => Number(cell.textContent)),
      ),
    );
  expect(rows.length).toBe(9);
  expect(rows.reduce((sum, row) => sum + row[1], 0)).toBe(324);
  expect(rows.reduce((sum, row) => sum + row[2], 0)).toBe(39);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await context.close();
});

test("skip link and reduced motion", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Zum Inhalt springen" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
});

for (const file of ["impressum.html", "datenschutz.html"]) {
  test(`${file}: responsive layout and accessibility`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto("/" + file);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(audit.violations.map((item) => item.id)).toEqual([]);
    await page.getByRole("link", { name: "Zurück zum Portfolio" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Saif Aldien",
    );
  });
}

test("project filters, count, restoration and gallery", async ({ page }) => {
  await page.goto("/");
  for (const [category, count] of [["app", 3], ["game", 2], ["study", 2], ["all", 7]]) {
    await page.locator(`[data-filter="${category}"]`).click();
    await expect(page.locator("[data-project]:visible")).toHaveCount(count);
    await expect(page.locator(".filter-status")).toHaveText(`${count} Projekte`);
    await expect(page.locator(`[data-filter="${category}"]`)).toHaveAttribute("aria-pressed", "true");
  }
  await page.getByRole("button", { name: "Python-Editor", exact: true }).click();
  await expect(page.locator("#screen-editor")).toBeVisible();
  await expect(page.locator("#screen-dashboard")).toBeHidden();
  await page.locator('[data-filter="game"]').click();
  await page.getByRole("link", { name: "Codegarten ansehen", exact: true }).click();
  await expect(page.locator("#codegarten")).toBeVisible();
  await expect(page.locator('[data-filter="all"]')).toHaveAttribute("aria-pressed", "true");
});

test("publication uses local resources and keeps private assistant unlinked", async ({ page }) => {
  const external=[];
  page.on("request", request => { if(new URL(request.url()).origin !== "http://127.0.0.1:4174") external.push(request.url()); });
  await page.goto("/");
  await expect(page.locator('a[href*="Jarvis-assistant"]')).toHaveCount(0);
  const csp=await page.locator('meta[http-equiv="Content-Security-Policy"]').getAttribute("content");
  expect(csp).toContain("object-src 'none'");
  expect(csp).toContain("connect-src 'none'");
  expect(external).toEqual([]);
});
