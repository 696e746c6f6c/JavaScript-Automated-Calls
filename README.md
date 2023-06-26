# Automated Calls
This automation is called JavaScript calls for potential XSS findings: DOM XSS, Reflected XSS. I wouldn't like to recommend to test this for Stored XSS at all. Test it only for DOM XSS and Reflected XSS. This automation can be tested on any OS, no matter what is it, Windows, some Linux distribution, MacOS and so on.

# Installation
In order to be able to run this automation, make sure you have installed following modules:

- axios module
- argparse module
- fs module
- dompurify module

They can be found on official npm documentations. 

# Configuration
If you'd like to make some changes here, make sure to go to config.js file and change `payloadFile` value to another one. Obviously if you have better XSS wordlist. But however I made a 11k wordlist with all possible JavaScript malicious payloads. But still I might have missed something. 
