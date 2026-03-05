const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const outDir = '/Users/mariusserban/.gemini/antigravity/brain/a1a35be5-4c0e-42d0-b5fe-3d7b05a526df/artifacts';

(async () => {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    console.log('Navigating to app...');
    await page.goto('http://localhost:5176/', { waitUntil: 'networkidle2' });

    // Wait for initial render
    await new Promise(r => setTimeout(r, 4000));

    // Dashboard is the default page
    console.log('Capturing Dashboard...');
    await page.screenshot({ path: path.join(outDir, '01_dashboard.png') });

    const navs = [
        { id: 'patients', label: 'Patients' },
        { id: 'schedule', label: 'Schedule' },
        { id: 'reactivation', label: 'Reactivation' },
        { id: 'notes', label: 'AI Notes' },
        { id: 'billing', label: 'Billing' },
        { id: 'forms', label: 'Forms' },
    ];

    for (const nav of navs) {
        console.log(`Clicking ${nav.label}...`);
        await page.evaluate((label) => {
            const buttons = Array.from(document.querySelectorAll('button'));
            const btn = buttons.find(b => b.innerText.includes(label));
            if (btn) btn.click();
        }, nav.label);

        await new Promise(r => setTimeout(r, 2000));
        console.log(`Capturing ${nav.label}...`);
        await page.screenshot({ path: path.join(outDir, `0${navs.indexOf(nav) + 2}_${nav.id}.png`) });
    }

    await browser.close();
    console.log('Done screenshots!');
})().catch(err => {
    console.error(err);
    process.exit(1);
});
