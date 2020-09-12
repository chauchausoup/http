//basic routing: do things based on path provided by the user


const http=require('http');

function index(request,response){
    //console.log(request.connection.remoteAddress)
    response.writeHead(200);
    response.end('Hello World')
}

http.createServer(function(request,response){
    if(request.url==='/'){
        return index(request,response)
    }
    response.writeHead(404," this is a reason phrase");
    response.end(http.STATUS_CODES[404])
}).listen(1337)






