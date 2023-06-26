const axios = require('axios');
const { ArgumentParser } = require('argparse');
const fs = require('fs');
const { sanitize: DOMPurify } = require('dompurify');

// Here we used ArgumentParser Constructor function to create an object called parser and parsed following arguments that will be our command line arguments
const parser = new ArgumentParser({
    add_help: true,
    description: 'JavaScript automated calls',
});

parser.add_argument('-u', '--url', {
    help: 'Apps URL',
    required: true,
});

const args = parser.parse_args();
const appURL = args.url;

// This is a main function for this whole JavaScript calling automation,  without this function code wouldn't work
async function mainFunction() {
    try {
        // Here we read malicious JavaScript payloads from a file using fs.readFileSync() method and as well it all comes from fs module 
        const payloadsFile = '../xsstesting/xsspayloads.txt';
        const payloads = fs.readFileSync(payloadsFile, 'utf8').split('\n');

        // This block of code iterates through each malicious JavaScript payload
        for (const payload of payloads) {
            // Another part of code encodes the payload using encodeURIComponent() function and construct the data for the POST request
            const data = `paramName1=${encodeURIComponent(payload)}&paramName2=value2`;

            // This code snippet needs to send a POST request to the application URL with the above data
            const response = await axios.post(appURL, data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            const status = response.status;
            const headers = response.headers;

            // Here we use if statement to check if the payload was successfully executed and as well if CSP is not being used at this point. But however if payload is being reflected in the DOM
            // and it's not executing, that doesn't mean there's a CSP at this point, it could be  due to several reasons such as: browser or client side features and so on.
            if (status === 200 && !headers['content-security-policy']) {
                console.log('XSS Payload is working:');
                console.log('URL:', appURL);
                console.log('Payload:', payload);
                console.log('---');
            }

            // I used a DOMPurify module, reason why is to check if DOMPurify library is available on target's application. DOMPurify became one of the most popular sanitizers these days
            if (typeof DOMPurify !== 'undefined') {
                const sanitizedHTML = DOMPurify(response.data, { SAFE_FOR_JQUERY: true });

                // if statement is being used to check if the sanitized HTML contains the payload
                if (sanitizedHTML.includes(payload)) {
                    console.log('XSS payload for DOMPurify sanitization was detected:');
                    console.log('URL:', targetUrl);
                    console.log('Payload:', payload);
                }
            } else {
                console.log('DOMPurify was not detected. Continue with further testing ');
            }
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// And at the main function of this automation is being called
mainFunction();
