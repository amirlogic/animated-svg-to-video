import * as puppeteer from 'puppeteer';

import { PuppeteerScreenRecorder } from 'puppeteer-screen-recorder';

import * as readline from 'node:readline';

import * as url from 'url';

import process from 'node:process';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const durl = `file://${__dirname}/svg`;

const vext = 'mp4'; // supports extension - mp4, avi, webm and mov

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
    recordDurationLimit: 10,
  };

  //const recorder = new PuppeteerScreenRecorder(page, Config);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    console.log("Please enter filename:")

    rl.on('line', async line => {

        console.log("Launching browser...")

        const browser = await puppeteer.launch({headless: "new"});
        const page = await browser.newPage();

        const recorder = new PuppeteerScreenRecorder(page, Config);

        await recorder.start(`./report/video/${line}.${vext}`);     // demo
        await page.goto(`${durl}/${line}`);   // url 'https://apple.com'
    
        //await page.goto('https://test.com');
        await recorder.stop();

        console.log("Recorder is stopped")

        await browser.close();

        process.exit()

    });
