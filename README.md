# Automated Calls
This automation is called JavaScript calls for potential XSS findings: DOM XSS, Reflected XSS. I wouldn't like to recommend to test this for Stored XSS at all. Test it only for DOM XSS and Reflected XSS. This automation can be tested on any OS, no matter what is it, Windows, some Linux distribution, MacOS and so on.

# Installation
In order to be able to run this automation, make sure you have installed following modules:

- axios module
- argparse module
- fs module
- dompurify module

They can be found on official npm documentations.

# Run
First of all git clone this repository and then in your terminal make sure you have installed these modules that I have mentioned above. After that, in your terminal navigate to `~/src` directory where's `main.js` and `config.js` files and type this following command:

`node main.js`

- This command will display list of command-line arguments.

If you want to run this automation with your target's URL, do this which is really simple:

`node main.js -u https://example.com/?test=`

Here we used `example.com` as a example domain  and `?test=` query parameter as a example but make sure you specify right domain, endpoint and as well right query parameter if you want to test for Reflected XSS but however we can use this automation for DOM XSS testing too.

# Configuration
If you'd like to make some changes here, make sure to go to config.js file and change `payloadFile` value to another one. Obviously if you have better XSS wordlist. But however I made a 11k wordlist with all possible JavaScript malicious payloads. But still I might have missed something. However if you want to modify this automation in order to make it stop once right one XSS payload was found, change this:

- In  the #26 line add this following code:

```javascript
const sanitizeHtmlExists = typeof sanitizeHtml === 'function';

let payloadDetected = false;
```
- And modify this following code:
```javascript
for (const payload of payloads) {
```
To this following code:
```javascript
for (const payload of payloads) {
if (payloadDetected) {
break;
}
```

- Line #44 at this following code:
```javascript
if (status === 200 && !headers['content-security-policy']) {
                console.log('XSS Payload Detected:');
                console.log('URL:', targetUrl);
                console.log('Payload:', payload);
                console.log('---');
                payloadDetected = true;
                break;
            }
```

