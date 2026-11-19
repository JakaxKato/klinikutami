const { test, expect } = require("@playwright/test");

test("one responsive page, verified content, navigation and weekly schedule", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator(".service-card")).toHaveCount(9);
  await expect(
    page.locator(".service-card details, details.service-card"),
  ).toHaveCount(0);
  await expect(page.locator(".hero h1")).toContainText("Perawatan gigi yang");
  await expect(
    page.locator(".photo-credit, .photo-index, .hero-image-credit"),
  ).toHaveCount(0);
  await expect(page.locator('a[href*="unsplash.com"]')).toHaveCount(0);
  await expect(page.locator(".patient-guide")).toHaveCount(0);
  await expect(page.locator("#dokter h3")).toHaveCount(4);
  await expect(page.locator(".schedule-card:visible")).toHaveCount(11);
  await expect(page.locator(".schedule-day-block")).toHaveCount(6);
  await expect(
    page.locator('.schedule-day-block[aria-label="Selasa"] .schedule-card'),
  ).toHaveCount(2);
  await expect(page.locator(".schedule-flyer img")).toBeVisible();
  await expect(
    page.locator(
      '.service-card a[href*="wa.me"], .doctor-card a[href*="wa.me"], .schedule-card a[href*="wa.me"]',
    ),
  ).toHaveCount(0);
  expect(await page.locator('a[href*="wa.me"]').count()).toBeLessThanOrEqual(7);
  const faq = page.locator(".faq-item").first();
  await faq.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(faq).toHaveAttribute("open", "");
  const invalidAnchors = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links
        .map((a) => a.getAttribute("href"))
        .filter(
          (href) => href === "#" || !document.getElementById(href.slice(1)),
        ),
    );
  expect(invalidAnchors).toEqual([]);
  for (const width of [320, 360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `overflow at ${width}`,
    ).toBe(true);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => scrollTo(0, 0));
  await page.getByRole("button", { name: "Buka menu navigasi" }).click();
  await expect(page.locator("#mobile-menu")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-menu")).toBeHidden();
  await page.getByRole("button", { name: "Buka menu navigasi" }).click();
  await page.locator('#mobile-menu a[href="#jadwal"]').click();
  await expect(page.locator("#mobile-menu")).toBeHidden();
  // Verify the map is requested only on demand; keep this interaction test independent of Google's availability.
  await page.route("https://maps.google.com/maps?**", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: "<!doctype html><title>Map test response</title><p>Map loaded</p>",
    }),
  );
  await expect(page.locator(".map-panel iframe")).not.toHaveAttribute("src");
  await page.getByRole("button", { name: "Tampilkan peta" }).click();
  await expect(page.locator(".map-panel iframe")).toBeVisible();
  await expect(page.locator(".map-fallback")).toHaveAttribute(
    "href",
    /13495330233105393482/,
  );
  expect(errors).toEqual([]);
});

test("visual captures and image loading", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page
    .locator("img")
    .evaluateAll((images) => images.forEach((img) => (img.loading = "eager")));
  await page.evaluate(() =>
    Promise.all(
      [...document.images].map((img) => img.decode().catch(() => {})),
    ),
  );
  await page.evaluate(() => document.fonts.ready);
  const broken = await page
    .locator("img")
    .evaluateAll((images) =>
      images.filter((img) => !img.naturalWidth).map((img) => img.alt),
    );
  console.log("Images not loaded:", JSON.stringify(broken));
  expect(broken).toEqual([]);
  await page.screenshot({ path: "test-results/desktop.png", fullPage: true });
  await page.screenshot({ path: "test-results/desktop-hero.png" });
  const sectionCaptureStyle = ".site-header { visibility: hidden; }";
  await page.locator("#jadwal").screenshot({
    path: "test-results/desktop-schedule.png",
    style: sectionCaptureStyle,
  });
  await page.locator("#dokter").screenshot({
    path: "test-results/desktop-doctors.png",
    style: sectionCaptureStyle,
  });
  await page.locator("#faq").screenshot({
    path: "test-results/desktop-faq.png",
    style: sectionCaptureStyle,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({ path: "test-results/mobile-hero.png" });
  await page.screenshot({ path: "test-results/mobile.png", fullPage: true });
  await page.locator("#jadwal").screenshot({
    path: "test-results/mobile-schedule.png",
    style: sectionCaptureStyle,
  });
  await page.locator("#lokasi").scrollIntoViewIfNeeded();
  await page
    .locator("#lokasi")
    .screenshot({ path: "test-results/mobile-location.png" });
  console.log(
    "Map frames:",
    page.frames().map((frame) => frame.url()),
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
});

test("motion supports interrupted interactions and live reduced-motion changes", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");

  // Rapid input must finish in the latest requested state, without clipped content.
  const service = page.locator(".faq-item").nth(1);
  await service.locator("summary").focus();
  await page.keyboard.press("Enter");
  await page.keyboard.press("Enter");
  await page.keyboard.press("Enter");
  await expect(service).toHaveAttribute("open", "");
  await expect
    .poll(() => service.evaluate((element) => element.style.height))
    .toBe("");
  await expect(service.locator(".faq-answer")).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(service).not.toHaveAttribute("open", "");
  await expect
    .poll(() => service.evaluate((element) => element.style.overflow))
    .toBe("");

  await page.evaluate(() => scrollTo(0, 0));
  const menuToggle = page.locator(".menu-toggle");
  await menuToggle.focus();
  await page.keyboard.press("Enter");
  await page.keyboard.press("Enter");
  await page.keyboard.press("Enter");
  await expect(menuToggle).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#mobile-menu")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-menu")).toBeHidden();
  await expect(menuToggle).toBeFocused();

  await page.locator("#jadwal").scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      page.locator(".scroll-progress").evaluate((element) => {
        const transform = getComputedStyle(element).transform;
        return (
          transform !== "none" && new DOMMatrixReadOnly(transform).a > 0.05
        );
      }),
    )
    .toBe(true);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".scroll-progress")).toBeHidden();
  await service.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(service).toHaveAttribute("open", "");
  expect(await service.evaluate((element) => element.style.height)).toBe("");
  expect(errors).toEqual([]);
});

test("clinic information and disclosures remain usable when JavaScript is unavailable", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/");
  await expect(page.locator(".service-card")).toHaveCount(9);
  await expect(page.locator(".schedule-card:visible")).toHaveCount(11);
  await expect(page.locator(".service-card p").first()).toBeVisible();
  const service = page.locator(".faq-item").nth(1);
  await service.locator("summary").click();
  await expect(service).toHaveAttribute("open", "");
  await expect(service.locator(".faq-answer")).toBeVisible();
  await expect(page.locator('.hero-actions a[href*="wa.me"]')).toBeVisible();
  await context.close();
});

test("doctor profiles remain keyboard accessible and essential assets stay local", async ({
  page,
}) => {
  const externalFontRequests = [];
  page.on("request", (request) => {
    if (/fonts\.(googleapis|gstatic)\.com/.test(request.url()))
      externalFontRequests.push(request.url());
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator('.hero-secondary[href="#layanan"]').click();
  await expect(page.locator("#layanan h2")).toBeVisible();
  const service = page.locator(".doctor-details").first();
  await service.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(service).toHaveAttribute("open", "");
  await expect(service.locator("p")).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(service).not.toHaveAttribute("open", "");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator(".header-contact")).toHaveAccessibleName(
    "Tanya jadwal melalui WhatsApp",
  );
  expect(externalFontRequests).toEqual([]);
});
