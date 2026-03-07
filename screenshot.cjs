const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto("https://intelident-demo.vercel.app/chart", { waitUntil: "networkidle0" });
    await page.screenshot({ path: "/Users/mariusserban/.gemini/antigravity/brain/9d6cd598-33cd-459b-9d6f-c0bcdaf45e91/media_vercel_chart.png" });
    await browser.close();
    console.log("Screenshot saved.");
})();
