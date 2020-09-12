//revised version
//routing with http server API

var http= require('http')
const portNo=8080;

var data={
    name:"mama",
    lastname:"black sheep"
};



var getRoutes = {
    '/': function(request,response){
        response.writeHead(200);
        response.write(JSON.stringify(data));
        response.end()
        
    },
    '/help':(request,response)=>{
        response.writeHead(200);
        response.end("Do you need some help ? ")
    }
    
}

var postRoutes ={
    '/user':(request,response)=>{
        let body = '';
        request.on('data', chunk => {
            body += chunk; // convert Buffer to string
        });
        request.on('end', () => {
            data["post1"]=body;
            console.log(data)
            
        });
        response.writeHead(200);
        response.end("Posted your data!")
           
    }
}



http.createServer((request,response)=>{
   //console.log(request)

    if(request.url in getRoutes){

        return getRoutes[request.url](request,response);

    }
    if(request.url in postRoutes){
        console.log("triggered");
        return postRoutes[request.url](request,response)
    }

    response.writeHead(404);
    response.end(http.STATUS_CODES[404])

}).listen(portNo,startCb)

function startCb(){
    console.log('Start HTTP on port ' + portNo)
   }
   


