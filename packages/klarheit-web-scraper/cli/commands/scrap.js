const puppeteer = require('puppeteer');

module.exports = async args => {
    const environment = args.environment || args.e || 'production';
    const url = args.url || args.u;
    const query = args.query || args.q;
    let browser;
    
    if (environment === 'development') {
        browser = await puppeteer.launch({
            args: ['--start-fullscreen'],
            defaultViewport: null,
            devtools: true,
        });
    } else {
        browser = await puppeteer.launch();
    }

    const pages = await browser.pages();
    const page = pages[0];

    await page.goto(url);
    await page.addScriptTag({ path: 'dist/mole.js' });

    const result = await page.evaluate(extractionQuery => {
        const extractionResults = new Mole(document, extractionQuery).extract();

        if (environment === 'development') {
            console.log(extractionResults);
            await browser.close();
        }

        return extractionResults;
    }, require(query));

    console.log(result);

    if (environment !== 'development') {
        await browser.close();
    }

};
