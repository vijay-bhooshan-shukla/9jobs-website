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
  const videos = [];
  
  page.on('response', (response) => {
    const url = response.url();
    const contentType = response.headers()['content-type'] || '';
    if (contentType.includes('video') || url.includes('mime=video') || url.includes('.mp4')) {
      // Decode efg parameter if present
      const efgMatch = url.match(/efg=([^&]+)/);
      let efgDecoded = null;
      if (efgMatch) {
        try {
          const jsonStr = Buffer.from(decodeURIComponent(efgMatch[1]), 'base64').toString('utf8');
          efgDecoded = JSON.parse(jsonStr);
        } catch (e) {}
      }
      videos.push({ url, contentType, efg: efgDecoded });
    }
  });

  try {
    console.log("Navigating to reel page...");
    await page.goto('https://www.facebook.com/reel/2073172209905679/', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 12000));
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await browser.close();
  }

  console.log(`Found ${videos.length} video URLs:`);
  videos.forEach((v, i) => {
    console.log(`Video #${i + 1}:`);
    console.log(`  Content-Type: ${v.contentType}`);
    console.log(`  efg:`, JSON.stringify(v.efg, null, 2));
    console.log(`  URL: ${v.url.slice(0, 120)}...`);
  });
}

main().catch(console.error);
