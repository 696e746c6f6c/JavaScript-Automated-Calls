const x = (target) => {
    return {
        // Proxy Config - one example, watch req/res through Fiddler.
        // proxy: {
        //     host: "127.0.0.1",
        //     port: 8888
        // },

        payloadFile: 'xsstesting/xsspayloads.txt',
        fileOutput: false,
        host: target,
        port: 80,
        path: '/special.plp?page={0}',
        method: 'POST',
        protocol: 'http:',
        postData: 'paramName1={0}&paramName2=paramValue2',
    };
};

module.exports = {
    x,
};
