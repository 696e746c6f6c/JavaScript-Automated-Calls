# JavaScript Automated Calls
This automation was built using Node.js framework and is called JavaScript calls for potential XSS findings: DOM XSS, Reflected XSS. I wouldn't like to recommend to test this for Stored XSS at all. Test it only for DOM XSS and Reflected XSS. This automation can be tested on any OS, no matter what is it, Windows, some Linux distribution, MacOS and so on. However the wordlist I made is pretty big but still it would be bigger with BigQuery generated set. However you need to buy BigQuery which is not free. 

# Installation
In order to be able to run this automation, make sure you have installed following modules:

- axios module
- argparse module
- fs module
- dompurify module

They can be found on official npm documentations. And don't forget to install Node.js framework if you still haven't.

# Usage
First of all git clone this repository and then in your terminal make sure you have installed these modules that I have mentioned above. After that, in your terminal navigate to `~/src` directory where's `main.js` and `config.js` files and type this following command:

`node main.js`

- This command will display list of command-line arguments.

If you want to run this automation with your target's URL, do this which is really simple:

`node main.js -u https://example.com/?test=`

Here we used `example.com` as a example domain  and `?test=` query parameter as a example but make sure you specify right domain, endpoint and as well right query parameter if you want to test for Reflected XSS but however we can use this automation for DOM XSS testing too.

# Configuration
If you'd like to make some changes here, make sure to go to config.js file and change `payloadFile` value to another one. Obviously if you have better XSS wordlist. But however I made a 11k wordlist with all possible JavaScript malicious payloads. But still I might have missed something. However if you want to modify this automation in order to make it stop once right one XSS payload was found, change this:

- Line #26 line add this following code:

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

- Line #44 add this following code:
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

## Attention
If for some reason code automation doesn't work which I don't think so, please copy `main.js` and `config.js` files in your terminal and put them into `~/src` directory and make sure `xsspayloads.txt` is in new directory called `xsstesting`. But don't forget to sort this into one directory example `project` directory. After that modify this constant variable in the #24 line:

```javascript
const payloadsFile = '../xsstesting/xsspayloads.txt';
```

- Modify it to this following code again which is same one:

```javascript
const payloadsFile = '../yourdirectoryinprojectdir/yourffile.txt';
```
Here I used `../` notation in the file path which is used to navigate up one level in the directory hierarchy. It specifies that the file `xsspayloads.txt` is located in a directory one level above the current directory. Automation should be working file but still let's not make confusions here. 
