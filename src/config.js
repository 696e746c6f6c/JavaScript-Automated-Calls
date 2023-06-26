const x = (target) => {
    return {
        // Proxy Config 
        // proxy: {
        //     host: "127.0.0.1",
        //     port: 8888
        // },

        payloadFile: 'xsstesting/xsspayloads.txt',
        fileOutput: false,
        host: "url",
        port: 80,
        path: '/search.php?test={0}',
        method: 'POST',
        protocol: 'http:',
        postData: 'paramName1={0}&paramName2=paramValue2',
    };
};

module.exports = {
    x,
};
