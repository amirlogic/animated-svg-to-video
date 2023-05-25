import * as puppeteer from 'puppeteer';

import { PuppeteerScreenRecorder } from 'puppeteer-screen-recorder';


const Config = {
    followNewTab: true,
    fps: 25,
    ffmpeg_Path:  null,   // '<path of ffmpeg_path>' ||
    videoFrame: {
      width: 1024,
      height: 768,
    },
    videoCrf: 18,
    videoCodec: 'libx264',
    videoPreset: 'ultrafast',
    videoBitrate: 1000,
    autopad: {
      color: 'black' | '#35A5FF',
    },
    aspectRatio: '4:3',
  };

  //const recorder = new PuppeteerScreenRecorder(page, Config);

  (async () => {

    console.log("Launching browser...")

    const browser = await puppeteer.launch({headless: "new"});
    const page = await browser.newPage();

    const recorder = new PuppeteerScreenRecorder(page, Config);

    await recorder.start('./report/video/demo.mp4'); // supports extension - mp4, avi, webm and mov
    await page.goto('https://apple.com');
  
    //await page.goto('https://test.com');
    await recorder.stop();

    console.log("Recorder is stopped")

    await browser.close();

  })();