//revised version
//routing with http server API

var http = require('http')
const querystring = require('querystring')
const portNo = 8080;

var data = [{
        name: "MaMa",
        lastname: "Black Sheep"
    },
    {
        name: "MaMa2",
        lastname: "Black Sheep2"
    }
];



var getRoutes = {
    '/': function(request, response) { //Reading
        if (request.params.name == null) {
            response.writeHead(200, { 'content-type': 'application/json' });
            response.write(JSON.stringify(data));
        } else if (data.findIndex(x => x.name == request.params.name) != -1) {
            response.writeHead(200, { 'content-type': 'application/json' });
            response.write(JSON.stringify(data.find(x => x.name == request.params.name)));
        } else {
            response.writeHead(404);
        }
        response.end()

    },
    '/help': (request, response) => {
        response.writeHead(200);
        response.end("Do you need some help ? ")
    }

}


var postRoutes = {
    '/complete': (request, response) => {
        console.log(request);
        let body = '';
        request.on('data', chunk => {
            console.log(chunk);
            body += chunk; //what the chunk?
        });
        request.on('end', () => {
            data["post1"] = body;
            console.log(data)

        });
        response.writeHead(200);
        response.end("Thank you for making a Rhyme!")

    },
    '/': (request, response) => { //Creating
        let body = '';
        request.on('data', chunk => {
            body += chunk; //what the chunk?
        });
        request.on('end', () => {
            console.log(body)
             //https://medium.com/javascript-in-plain-english/parsing-post-data-3-different-ways-in-node-js-e39d9d11ba8
            let parsedData = querystring.decode(body)
            data.push({
                name: parsedData.name,
                lastname: parsedData.lastname
            })
            response.writeHead(201);
            response.end()
            console.log(data)
        });
    }
}

var putRoutes = {
    '/': (request, response) => { //Updating
        let body = '';
        request.on('data', chunk => {
            body += chunk; //what the chunk?
        });
        request.on('end', () => {
            let parsedData = querystring.decode(body)
            var dataIndex = data.findIndex(x => x.name == parsedData.name);
            if (dataIndex == -1) {
                data.push({
                    name: parsedData.name,
                    lastname: parsedData.lastname
                })
                response.writeHead(201);
            } else {
                data[dataIndex].lastname = parsedData.lastname
                response.writeHead(204); //200 or 204 used
            }
            console.log(data);
            response.end()
        });
    }
}

var deleteRoutes = {
    '/': function(request, response) { //Deleting
        if (request.params.name == null) {
            response.writeHead(404);
        } else if (data.findIndex(x => x.name == request.params.name) != -1) {
            data.splice(data.findIndex(x => x.name == request.params.name), 1)
            response.writeHead(200); //200 or 204 used
        } else {
            response.writeHead(404);
        }
        console.log(data);
        response.end()
    }
}

http.createServer((request, response) => {
    //console.log(request)

    if (request.method == 'GET' || request.method == 'DELETE') {
        //request url http://localhost:8080/ or http://localhost:8080/?name=MaMa
        var parsedUrl = ''
        var params = {};
        if (request.url.indexOf('?') != -1) {
            parsedUrl = request.url.substring(0, request.url.indexOf('?'));
            var paramsString = request.url.substring(request.url.indexOf('?') + 1, request.url.length);
            var splitParams = paramsString.split('&');
            for (var i = 0; i < splitParams.length; i++) {
                var splitParam = splitParams[i].split('=');
                params[splitParam[0]] = splitParam[1];
            }
        } else
            parsedUrl = request.url;
        request.params = params;
        if (request.method == 'GET') {
            if (parsedUrl in getRoutes) {
                return getRoutes[parsedUrl](request, response);
            }
        } else if (request.method == 'DELETE') {
            //https://stackoverflow.com/questions/299628/is-an-entity-body-allowed-for-an-http-delete-request
            if (parsedUrl in getRoutes) {
                return deleteRoutes[parsedUrl](request, response);
            }
        }
    } else if (request.method == 'POST') {
        if (request.url in postRoutes) {
            return postRoutes[request.url](request, response)
        }
    } else if (request.method == 'PUT') { //also patch can be used
        if (request.url in putRoutes) {
            return putRoutes[request.url](request, response)
        }
    }

    response.writeHead(404);
    response.end(http.STATUS_CODES[404])

}).listen(portNo, startCb)


function startCb() {
    console.log('Start HTTP on port ' + portNo)
}