//revised version
//routing with http server API

var http= require('http')
const portNo=8080;

var data={
    name:"MaMa",
    lastname:"Black Sheep"
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
    '/complete':(request,response)=>{
        let body = '';
        request.on('data', chunk => {
            console.log(chunk);
            body += chunk; //what the chunk?
        });
        request.on('end', () => {
            data["post1"]=body;
            console.log(data)
            
        });
        response.writeHead(200);
        response.end("Thank you for making a Rhyme!")
           
    }
}



http.createServer((request,response)=>{
   //console.log(request)

    if(request.url in getRoutes){

        return getRoutes[request.url](request,response);

    }
    if(request.url in postRoutes){
       // console.log("");
        return postRoutes[request.url](request,response)
    }

    response.writeHead(404);
    response.end(http.STATUS_CODES[404])

}).listen(portNo,startCb)


function startCb(){
    console.log('Start HTTP on port ' + portNo)
   }
   


