const http = require('http');

var dataPoster = JSON.stringify({
    italics: true,
    filler: 'Have you any wool ?'
});

const options = {
    hostname: '127.0.0.1',
    port:8080,
    path: '/complete',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': dataPoster.length
    }
};


const req = http.request(options, (res) => {
    var data='';

    console.log('Status Code:', res.statusCode);

    res.on('data', (chunk) => {
        //console.log(`Chunk: ${chunk}`)
        data += chunk;
    });

    res.on('end', () => {
        console.log('Body: ',data.toString() );
    });

});

req.on("error", (err) => {
    console.log("Error: ", err.message);
});

req.write(dataPoster);
req.end();
