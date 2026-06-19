const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

async function main() {
  console.log("Launching browser...");
  let executablePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  if (!fs.existsSync(executablePath)) {
    executablePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
  }

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  
  console.log("Navigating to Facebook Page...");
  await page.goto('https://www.facebook.com/profile.php?id=61589408708559', { waitUntil: 'networkidle2' });
  
  console.log("Waiting for page load...");
  await new Promise(r => setTimeout(r, 6000));

  // Try to dismiss any initial cookie/login prompts
  try {
    const closeButtons = await page.$$('div[role="dialog"] div[aria-label*="Close"], div[role="dialog"] div[aria-label*="close"], div[aria-label="Close"]');
    if (closeButtons.length > 0) {
      console.log("Dismissing popup...");
      await closeButtons[0].click();
      await new Promise(r => setTimeout(r, 1000));
    }
  } catch (e) {
    console.log("No popup to dismiss.");
  }

  // Scroll several times to load dynamic posts
  console.log("Scrolling page to load more posts...");
  for (let i = 0; i < 6; i++) {
    await page.evaluate(() => window.scrollBy(0, 1000));
    await new Promise(r => setTimeout(r, 3000));
    
    // Check again for close buttons
    try {
      const closeBtn = document.querySelector('div[role="dialog"] div[aria-label*="Close"], div[role="dialog"] div[aria-label*="close"], div[aria-label="Close"]');
      if (closeBtn) {
        closeBtn.click();
      }
    } catch (e) {}
  }

  // Parse images and texts
  const posts = await page.evaluate(() => {
    const data = [];
    const articles = document.querySelectorAll('div[role="article"]');
    
    articles.forEach((art) => {
      // Find caption text
      const dirAuto = art.querySelectorAll('div[dir="auto"]');
      let text = '';
      dirAuto.forEach((el) => {
        if (el.innerText && el.innerText.trim().length > text.length) {
          text = el.innerText.trim();
        }
      });
      
      // Find images
      const imgElements = art.querySelectorAll('img');
      const imgs = [];
      imgElements.forEach((img) => {
        // Exclude icons, avatars, and tiny images
        if (img.src && img.src.startsWith('https://') && !img.src.includes('/rsrc.php/') && img.naturalWidth > 150) {
          imgs.push(img.src);
        }
      });

      // Find link
      const linkElement = art.querySelector('a[href*="/posts/"], a[href*="/videos/"], a[href*="/reel/"]');
      const link = linkElement ? linkElement.href : '';

      if (text || imgs.length > 0) {
        data.push({ text, imgs, link });
      }
    });
    return data;
  });

  console.log("TOTAL_POSTS_FOUND:" + posts.length);
  console.log("Parsed posts:", JSON.stringify(posts, null, 2));

  await browser.close();
}

main().catch(err => console.error(err));
