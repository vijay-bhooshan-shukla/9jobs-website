const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

const FFMPEG_EXE = 'C:\\Users\\USER\\AppData\\Roaming\\Python\\Python314\\site-packages\\imageio_ffmpeg\\binaries\\ffmpeg-win-x86_64-v7.1.exe';

function downloadFile(url, destPath) {
  // Strip bytestart and byteend parameters
  const cleanUrl = url.replace(/&bytestart=\d+/, '').replace(/&byteend=\d+/, '');
  return new Promise((resolve, reject) => {
    https.get(cleanUrl, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed: Status Code ${res.statusCode}`));
        return;
      }
      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
    }).on('error', reject);
  });
}

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
  const videoUrls = [];
  const audioUrls = [];

  page.on('response', (response) => {
    const url = response.url();
    const contentType = response.headers()['content-type'] || '';
    if (contentType.includes('video') || url.includes('mime=video') || url.includes('.mp4')) {
      const efgMatch = url.match(/efg=([^&]+)/);
      let efg = null;
      if (efgMatch) {
        try {
          const jsonStr = Buffer.from(decodeURIComponent(efgMatch[1]), 'base64').toString('utf8');
          efg = JSON.parse(jsonStr);
        } catch (e) {}
      }
      
      if (efg) {
        if (efg.vencode_tag && efg.vencode_tag.includes('audio')) {
          audioUrls.push({ url, efg });
        } else {
          videoUrls.push({ url, efg });
        }
      }
    }
  });

  try {
    console.log("Navigating to Reel page...");
    await page.goto('https://www.facebook.com/reel/2073172209905679/', { waitUntil: 'networkidle2' });
    
    console.log("Waiting for media streams...");
    await new Promise(r => setTimeout(r, 12000));
  } catch (err) {
    console.error("Navigation error:", err);
  } finally {
    await browser.close();
  }

  // Find best video URL (highest bitrate)
  videoUrls.sort((a, b) => (b.efg.bitrate || 0) - (a.efg.bitrate || 0));
  const bestVideo = videoUrls[0];
  const bestAudio = audioUrls[0];

  if (!bestVideo || !bestAudio) {
    console.error("Could not find video/audio streams!");
    console.log("Videos found:", videoUrls.length, "Audios found:", audioUrls.length);
    return;
  }

  console.log("Best Video Stream:", bestVideo.efg.vencode_tag, "bitrate:", bestVideo.efg.bitrate);
  console.log("Best Audio Stream:", bestAudio.efg.vencode_tag, "bitrate:", bestAudio.efg.bitrate);

  const tempVideoFile = path.join(__dirname, 'temp_video.mp4');
  const tempAudioFile = path.join(__dirname, 'temp_audio.mp4');
  const mergedFile = path.join(__dirname, '..', 'public', 'social-imports', '2026-06-16-reel.mp4');

  console.log("Downloading video stream...");
  await downloadFile(bestVideo.url, tempVideoFile);
  console.log("Downloading audio stream...");
  await downloadFile(bestAudio.url, tempAudioFile);

  console.log("Merging video and audio using ffmpeg...");
  try {
    const cmd = `"${FFMPEG_EXE}" -y -i "${tempVideoFile}" -i "${tempAudioFile}" -c:v copy -c:a aac -map 0:v:0 -map 1:a:0 "${mergedFile}"`;
    console.log("Running command:", cmd);
    execSync(cmd, { stdio: 'inherit' });
    console.log("Merged video saved to:", mergedFile);
    console.log("Merged file size:", fs.statSync(mergedFile).size);
  } catch (err) {
    console.error("FFmpeg merge failed:", err.message);
  } finally {
    // clean up temp files
    if (fs.existsSync(tempVideoFile)) fs.unlinkSync(tempVideoFile);
    if (fs.existsSync(tempAudioFile)) fs.unlinkSync(tempAudioFile);
  }
}

main().catch(console.error);
