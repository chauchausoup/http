var http = require("http");

var options = {
    hostname: "127.0.0.1",
    port: 8080,
    path: "/",
    method: "GET",
};

var req = http.request(options, function(res) {
    console.log("STATUS: " + res.statusCode);
    console.log("HEADERS: " + JSON.stringify(res.headers));

    res.setEncoding("utf8");
    let data = '';
    res.on("data", function(chunk) {
        data += chunk;
    });


    res.on("end", function(chunk) {
        console.log("Response: " + (data));
        console.log("Response ENDED");
    });
});


req.on("error", function(e) {
    console.log("problem with request: " + e.message);
});
req.end();