const axios = require('axios');
const fs = require('fs');
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

        for (const payload of payloads) {
            const data = `paramName1=${encodeURIComponent(payload)}&paramName2=value2`;

            const response = await axios.post(targetUrl, data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            const status = response.status;
            const headers = response.headers;

            if (status === 200 && !headers['content-security-policy']) {
                console.log('XSS Payload Detected:');
                console.log('URL:', targetUrl);
                console.log('Payload:', payload);
                console.log('---');
            }
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

xssAutomation();
