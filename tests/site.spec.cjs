const { test, expect } = require('@playwright/test');

test('one responsive page, verified content, navigation and schedule filters', async ({page}) => {
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('.service-card')).toHaveCount(9);
  await expect(page.locator('#dokter h3')).toHaveCount(4);
  await expect(page.locator('.schedule-card:visible')).toHaveCount(11);
  await expect(page.locator('.schedule-day-block')).toHaveCount(6);
  await expect(page.locator('.schedule-day-block[aria-label="Selasa"] .schedule-card')).toHaveCount(2);
  await expect(page.locator('.schedule-flyer img')).toBeVisible();
  await expect(page.locator('.service-card a[href*="wa.me"], .doctor-card a[href*="wa.me"], .schedule-card a[href*="wa.me"]')).toHaveCount(0);
  expect(await page.locator('a[href*="wa.me"]').count()).toBeLessThanOrEqual(7);
  const faq=page.locator('.faq-item').first();
  await faq.locator('summary').focus();await page.keyboard.press('Enter');
  await expect(faq).toHaveAttribute('open','');
  const invalidAnchors=await page.locator('a[href^="#"]').evaluateAll(links=>links.map(a=>a.getAttribute('href')).filter(href=>href==='#'||!document.getElementById(href.slice(1))));
  expect(invalidAnchors).toEqual([]);
  for (const width of [360,390,768,1024,1440]) {
    await page.setViewportSize({width,height:900});
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow at ${width}`).toBe(true);
  }
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>scrollTo(0,0));
  await page.getByRole('button',{name:'Buka menu navigasi'}).click();
  await expect(page.locator('#mobile-menu')).toBeVisible();
  await page.keyboard.press('Escape');await expect(page.locator('#mobile-menu')).toBeHidden();
  await page.getByRole('button',{name:'Buka menu navigasi'}).click();
  await page.locator('#mobile-menu a[href="#jadwal"]').click();
  await expect(page.locator('#mobile-menu')).toBeHidden();
  // Verify the map is requested only on demand; keep this interaction test independent of Google's availability.
  await page.route('https://maps.google.com/maps?**',route=>route.fulfill({contentType:'text/html',body:'<!doctype html><title>Map test response</title><p>Map loaded</p>'}));
  await expect(page.locator('.map-panel iframe')).not.toHaveAttribute('src');
  await page.getByRole('button',{name:'Tampilkan peta'}).click();
  await expect(page.locator('.map-panel iframe')).toBeVisible();
  await expect(page.locator('.map-fallback')).toHaveAttribute('href',/13495330233105393482/);
  expect(errors).toEqual([]);
});

test('visual captures and image loading',async({page})=>{
  await page.setViewportSize({width:1440,height:1000});await page.goto('/');
  await page.locator('img').evaluateAll(images=>images.forEach(img=>img.loading='eager'));
  await page.evaluate(()=>Promise.all([...document.images].map(img=>img.decode().catch(()=>{}))));
  const broken=await page.locator('img').evaluateAll(images=>images.filter(img=>!img.naturalWidth).map(img=>img.alt));
  console.log('Images not loaded:',JSON.stringify(broken));
  expect(broken).toEqual([]);
  await page.screenshot({path:'test-results/desktop.png',fullPage:true});
  await page.setViewportSize({width:390,height:844});
  await page.evaluate(()=>scrollTo(0,0));
  await page.screenshot({path:'test-results/mobile-hero.png'});
  await page.screenshot({path:'test-results/mobile.png',fullPage:true});
  await page.locator('#lokasi').scrollIntoViewIfNeeded();
  await page.locator('#lokasi').screenshot({path:'test-results/mobile-location.png'});
  console.log('Map frames:',page.frames().map(frame=>frame.url()));
  await page.emulateMedia({reducedMotion:'reduce'});
  expect(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
});
