const clientPool = []
module.exports = {
    /**
     * @method sendDataToclient send the client data
     * @param client the client instance
     * @param commands the sending commands
     * @param data which data you will send
     * **/
    sendSimpleData:function(client,commands,data){
        //get now date
        let nowDate = new Date()
        //data need to send to client
        let sentdata = [commands,nowDate,data]
        //transfer data
        let transferdata = JSON.stringify(sentdata)
        //send data to client
        client.send(transferdata)
    },
    sendBroadCastData:function(commands,data){
        console.log("broadCastData")
        //get now date
        let nowDate = new Date()
        //data need to send to client
        let sentdata = [commands,nowDate,data]
        //transfer data
        let transferdata = JSON.stringify(sentdata)
        //send data to all clients
        clientPool.forEach(client => {
            client.send(transferdata)
        });
    },
    onClientConnect:function(client){
        clientPool.push(client)
    },
    getAllClient:function(){
        return clientPool
    },
    getClientByHeroID:function(hero_id){
        for (let i = 0; i < clientPool.length; i++) {
            let client = clientPool[i]
            if(client.hero === hero_id){
                return client
            }
        }
    },
    deleteClient:function(client){
        console.log('some one disconnected')

        for (let index = 0; index < clientPool.length; index++) {
            let element = clientPool[index]
            if(element.hero === client.hero){
                clientPool.splice(index,1)
                return
            }
        }
    },
}