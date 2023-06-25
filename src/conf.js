const fs = require('fs');

const x = () => {
    const subdomains = fs.readFileSync('subdomains.txt', 'utf8').split('\n');

    return {
        // This is a Proxy Config that we will need
        // proxy: {
        //     host: "127.0.0.1",
        //     port: 8888
        // },

        payloadFile: "xsstesting/xsspayloads.txt",
        fileOutput: false,
        subdomains,
        port: [80, 443], // Here we specify multiple ports as an array, 8080 port is same as 80 port but however if there's something going on feel free to modify conf.js file.
        path: "/param.plp?page={0}",
        method: ["POST", "GET"], // Here we specify multiple methods as an array
        protocol: "https:",
        postData: "paramName1={0}&paramName2=paramValue2",
    };
};

module.exports = {
    x,
};
