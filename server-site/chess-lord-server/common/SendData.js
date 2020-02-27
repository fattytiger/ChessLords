module.exports = {

    /**
     * @method sendDataToclient send the client data
     * @param client the client instance
     * @param commands the sending commands
     * @param data which data you will send
     * **/
    sendDataToclient:function(client,commands,data){
        //get now date
        let nowDate = new Date()
        //data need to send to client
        let sentdata = [commands,nowDate,data]
        //transfer data
        let transferdata = JSON.stringify(sentdata)
        //send data to client
        client.send(transferdata)
    }
}