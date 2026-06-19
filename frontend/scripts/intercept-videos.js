const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function main() {
  const executablePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  console.log("Listening to responses...");
  const videoUrls = new Set();
  
  page.on('response', (response) => {
    const url = response.url();
    const contentType = response.headers()['content-type'] || '';
    if (contentType.includes('video') || url.includes('mime=video') || url.includes('.mp4')) {
      console.log(`[VIDEO URL FOUND] Content-Type: ${contentType} | URL: ${url.slice(0, 150)}...`);
      videoUrls.add(url);
    }
  });

  try {
    console.log("Navigating to reel page...");
    await page.goto('https://www.facebook.com/reel/2073172209905679/', { waitUntil: 'networkidle2' });
    
    console.log("Waiting for video elements to load...");
    await new Promise(r => setTimeout(r, 12000));
    
    const videoSrcs = await page.evaluate(() => {
      const videos = Array.from(document.querySelectorAll('video'));
      return videos.map(v => ({
        src: v.src,
        html: v.outerHTML
      }));
    });
    console.log("DOM Video tags:", videoSrcs);

  } catch (err) {
    console.error("Error during navigation:", err);
  } finally {
    await browser.close();
  }

  console.log("Unique video URLs intercepted count:", videoUrls.size);
  console.log("Unique video URLs:", Array.from(videoUrls).slice(0, 5));
}

main().catch(console.error);
