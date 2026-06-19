const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function runTest() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const artifactDir = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\f903758f-2943-4a36-a67f-8d14620255e8';
  const blogListImg = path.join(artifactDir, 'blog_listings_reduced_height.png');
  const reelDetailImg = path.join(artifactDir, 'reel_detail_reduced_height.png');

  console.log("Launching headless Chrome...");
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1200 });

  page.on('console', msg => {
    console.log(`[BROWSER CONSOLE] ${msg.type().toUpperCase()}: ${msg.text()}`);
  });

  try {
    console.log("Navigating to live blog listing page...");
    // Let's use the local dev server or live website
    await page.goto('https://9jobs.co/blog', { waitUntil: 'networkidle2' });

    // Wait a couple of seconds
    await new Promise(r => setTimeout(r, 2000));

    // Scroll down to cards section on listing page
    console.log("Scrolling down to cards section...");
    await page.evaluate(() => {
      const section = document.querySelector('.fj-card-grid');
      if (section) section.scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await new Promise(r => setTimeout(r, 1000));

    console.log("Taking blog listing page screenshot...");
    await page.screenshot({ path: blogListImg });
    console.log(`Saved: ${blogListImg}`);

    // Let's check the size/dimensions of card media elements
    const cardStyles = await page.evaluate(() => {
      const cardMedia = document.querySelector('.fj-social-card-media--reel');
      if (!cardMedia) return 'No card media found';
      const styles = window.getComputedStyle(cardMedia);
      return {
        width: cardMedia.clientWidth,
        height: cardMedia.clientHeight,
        aspectRatio: styles.aspectRatio,
        maxHeight: styles.maxHeight
      };
    });
    console.log("Reel Listing Card Style info:", JSON.stringify(cardStyles, null, 2));

    console.log("Navigating to the first Reel detail page...");
    await page.goto('https://9jobs.co/blog/almost-giving-up-on-your-job-search-you-re-not-alone-facebook-2073172209905679', { waitUntil: 'networkidle2' });

    // Wait a couple of seconds
    await new Promise(r => setTimeout(r, 2000));

    // Scroll to video container
    console.log("Scrolling to player container...");
    await page.evaluate(() => {
      const player = document.querySelector('.fj-reel-container');
      if (player) player.scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await new Promise(r => setTimeout(r, 1000));

    // Let's check the video properties on detail page
    const videoProps = await page.evaluate(() => {
      const video = document.querySelector('.fj-reel-container video');
      if (!video) return { error: 'No video element found' };
      return {
        src: video.src,
        preload: video.preload,
        muted: video.muted,
        playsInline: video.playsInline,
        loop: video.loop,
        autoplay: video.autoplay
      };
    });
    console.log("Reel Player Video properties info:", JSON.stringify(videoProps, null, 2));

    const playerStyles = await page.evaluate(() => {
      const player = document.querySelector('.fj-reel-container');
      if (!player) return 'No player container found';
      const styles = window.getComputedStyle(player);
      return {
        width: player.clientWidth,
        height: player.clientHeight,
        maxWidth: styles.maxWidth,
        maxHeight: styles.maxHeight,
        aspectRatio: styles.aspectRatio
      };
    });
    console.log("Reel Player Container Style info:", JSON.stringify(playerStyles, null, 2));

    console.log("Taking reel detail page screenshot...");
    await page.screenshot({ path: reelDetailImg });
    console.log(`Saved: ${reelDetailImg}`);

    console.log("E2E Reels UI verification finished successfully!");
  } catch (err) {
    console.error("Verification failed:", err.message);
  } finally {
    await browser.close();
  }
}

runTest();
