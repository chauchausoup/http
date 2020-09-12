const http = require('http');

var dataPoster = JSON.stringify({
    name: 'John Doe',
    job: 'Content Writer'
});

const options = {
    hostname: '127.0.0.1',
    port:8080,
    path: '/user',
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