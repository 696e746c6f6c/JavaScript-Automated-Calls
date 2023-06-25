const axios = require('axios');
const fs = require('fs');
const cheerio = require('cheerio');
const jsesc = require('jsesc');
const { ArgumentParser } = require('argparse');
const config = require('./config');

const parser = new ArgumentParser({
    addHelp: true,
    description: 'XSS Automation Tool',
});

parser.addArgument('-t', '--target', {
    help: 'Target URL',
    required: true,
});

const args = parser.parseArgs();
const targetUrl = args.target;

async function xssAutomation() {
    try {
        const payloadsFile = '../xsstesting/xsspayloads.txt';
        const payloads = fs.readFileSync(payloadsFile, 'utf8').split('\n');

        const response = await axios.request({
            url: targetUrl,
            method: 'POST',
            data: 'paramName1=value1&paramName2=value2',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const html = response.data;
        const $ = cheerio.load(html);

        payloads.forEach(payload => {
            const appelement = $('#app-element');
            const encodedpayload = jsesc(payload);
            appelement.html(encodedpayload);

            const modifiedhtml = $.html();
            console.log(modifiedhtml);
        });
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

xssAutomation();
