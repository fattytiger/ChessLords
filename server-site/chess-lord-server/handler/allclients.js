const clientPool = []
module.exports = {
    onClientConnect:function(client){
        clientPool.push(client)
        console.log(clientPool.length)
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
    }
}