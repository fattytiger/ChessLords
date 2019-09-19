const WebSocketServer = require('websocket').server;
const  http = require('http');
const  JudgeLogin = require('./JudgeData/common')
const rescode = require('./ResCode')
const lib = require('./lib')


const server = http.createServer(function(request, response) {
    console.log(' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(8000, function() {
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
//connect pool
let clients = []
let clientsNum = 0

wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
        // Make sure we only accept requests from an allowed origin
        request.reject();
        console.log(' Connection from origin ' + request.origin + ' rejected.');
        return;
    }
    const connection = request.accept('echo-protocol', request.origin)
    connection.on('message', function(message) {
        // if (message.type === 'utf8') {
        //     let userData = JSON.parse(message.utf8Data)
        //     console.log(userData)
        //     let res = {
        //         code: 0,
        //         errMsg: 'success linked'
        //     }
        // }
        if(message.type === 'utf8'){
            //login
            let userData = JSON.parse(message.utf8Data)
            console.log(userData)
            if(userData.type == 'login'){
                clients.push(connection)
                connection.sendUTF(JSON.stringify(rescode.loginSuccess))

            }
            if(userData.type == 'match'){
                if(clients.length < 2 ){
                    clients.forEach(function (connection) {
                        console.log(clientsNum)
                        connection.sendUTF(JSON.stringify(rescode.matchNow))
                    })
                }else if(clients.length >= 2){
                    clients.forEach(function (connection) {
                        connection.sendUTF(JSON.stringify(rescode.matchSuccess))
                    })
                }

            }
        }

            // let userData = JSON.parse(message.utf8Data)
            // console.log(message,userData)
            //
            // let loginSuccess = {
            //     login:true
            // }
            // let loginFailed = {
            //     login: false
            // }
            //
            // if(userData.login == true){
            //     let res = JSON.stringify(loginSuccess)
            //     connection.sendUTF(res)
            // }else {
            //     let res = JSON.stringify(loginFailed)
            //     connection.sendUTF(res)
            // }


        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.')
        clients = clients.filter(function (connection1) {
            return connection1 !== connection
        })
    });
});
