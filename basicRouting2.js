//revised version
//routing with http server API


var http= require('http')



var routes = {
    '/': function(request,response){
        response.writeHead(200);
        response.end('Hello World !')
        
    },
    '/help':(request,response)=>{
        response.writeHead(200);
        response.end("Do you need some help ? ")
    }
}



http.createServer((request,response)=>{
    if(request.url in routes){

        //console.log(routes[request.url]) 
       
        return routes[request.url](request,response);
    }
    response.writeHead(404);
    response.end(http.STATUS_CODES[404])

}).listen(3030)


