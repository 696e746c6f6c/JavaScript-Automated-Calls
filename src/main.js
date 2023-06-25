const axios = require('axios');
const cheerio = require('cheerio');
const jsesc = require('jsesc');
const { ArgumentParser } = require('argparse');
const config = require('./config');

// Here we create an argument parser using ArgumentParser() constructor function that is called on an parser object
const parser = new ArgumentParser({
    description: 'XSS Automation Tool',
    version: '1.0.0', // Replace with your version number
});

parser.add_argument('-t', '--target', { help: 'URL of the app', required: true });

const args = parser.parse_args();

// This is simple, here parse_args() method is called on the parser object to parse the command-line arguments
const arguments = parser.parse_args();

// Here this code will read payloads from the file specified in the config file
const payloadsFile = config.x().payloadFile;
const payloads = fs.readFileSync(payloadsFile, 'utf8').split('\n');

// This is a main constructor function for this whole automation
async function xssAutomation() {
    try {
        const subdomains = config.x().subdomains;
        for (const subdomain of subdomains) {
            const url = `${config.x().protocol}//${subdomain}.${config.x().host}${config.x().path}`;

            // Make an simple HTTP request to the application using the config options
            const response = await axios.request({
                url: targetURL,
                method: config.x().method,
                data: config.x().postData,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            // Here we will extract HTML content from the  response
            const html = response.data

            // Parse the HTML using cheerio module
            const $ = cheerio.load(html);

            // Here this code snippet iterates over the payloads and inject them into the app's element
            payloads.forEach(payload => {
                const appelement = $('#app-element');
                const encodedpayload = jsesc(payload);
                appelement.html(encodedpayload);

                // Request for the modified HTML after JS injection
                const modifiedhtml = $.html();

                // Output the modified HTML
                console.log(modifiedhtml);
            });
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

xssAutomation();
