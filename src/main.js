const axios = require('axios');
const cheerio = require('cheerio');
const jsesc = require('jsesc');
const { ArgumentParser } = require('argparse');

// Here we create an argument parser using ArgumentParser() constructor function that is called on an parser object
const parser = new ArgumentParser({
    description: 'JavaScript Calls Automation'
});

parser.add_argument('-v', '--version', { action: 'version', version });
parser.add_argument('-t', '--target', { help: 'URL of the app', required: true });

// This is simple, here parse_args() method is called on the parser object to parse the command-line arguments
const args = parser.parse_args();
