var http = require('http');
http.createServer((req,res)=>{

    // tell the browser everything is ok by setting status as 200
    //data is a plain text 
    //writes data
    //ends after setting

    res.writeHead(200,{
       'Content-Type':'text/plain' 
    })

    res.write('Hello World \n');
    res.end()

}).listen(3030);



