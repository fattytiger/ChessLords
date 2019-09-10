const WebSocketServer = require('websocket').server;
const  http = require('http');
const  JudgeLogin = require('./JudgeData/common')
const server = http.createServer(function(request, response) {
    console.log(' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(8080, function() {
    console.log(' Server is listening on port 8080');
});

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
    // put logic here to detect whether the specified origin is allowed.
        return true;
}

wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
        // Make sure we only accept requests from an allowed origin
        request.reject();
        console.log(' Connection from origin ' + request.origin + ' rejected.');
        return;
    }
    const connection = request.accept('echo-protocol', request.origin)
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            let userData = JSON.parse(message.utf8Data)
            console.log(message,userData)

            let loginSuccess = {
                login:true
            }
            let loginFailed = {
                login: false
            }

            if(userData.login == true){
                let res = JSON.stringify(loginSuccess)
                connection.sendUTF(res)
            }else {
                let res = JSON.stringify(loginFailed)
                connection.sendUTF(res)
            }

        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});
