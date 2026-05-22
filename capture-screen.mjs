import puppeteer from 'puppeteer';

try {
  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto('http://localhost:3001', { 
    waitUntil: 'networkidle2',
    timeout: 10000 
  });
  
  // Scroll to dashboard section
  await page.evaluate(() => {
    const el = document.querySelector('#dashboard');
    if (el) el.scrollIntoView();
  });
  
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'dashboard-screenshot.png' });
  
  console.log('✅ Screenshot saved: dashboard-screenshot.png');
  await browser.close();
} catch (e) {
  console.error('Screenshot failed:', e.message);
}
