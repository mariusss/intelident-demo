const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    page.on('console', msg => {
        if (msg.type() === 'error') {
            console.log(`PAGE LOG ERROR:`, msg.text());
        }
    });

    page.on('pageerror', error => {
        console.log(`PAGE ERROR:`, error.message);
    });

    await page.goto('http://localhost:5173');

    await new Promise(r => setTimeout(r, 2000));

    // Click on UI2 toggle
    const buttons = await page.$$('button');
    for (let btn of buttons) {
        const text = await btn.evaluate(node => node.innerText);
        if (text.includes('UI2')) {
            await btn.click();
            break;
        }
    }

    await new Promise(r => setTimeout(r, 1000));

    await browser.close();
})();
