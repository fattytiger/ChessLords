

const LoginData =  cc.Class({
    properties: {

    },
    ctor:function(){

        let account_id = arguments[0]
        let account_name = arguments[1]
        let blockchain = arguments[2]
        let network    = arguments[3]

        this.hero_id = account_id
        this.hero_name = account_name
        this.blockchain = blockchain
        this.network  = network
        this.anamy = null
    },

    getHeroID:function(){
        return this.hero_id
    },

    getHeroName:function(){
        return this.hero_name
    },

    getNetType:function(){
        return this.network
    },

    getBlockchainType:function(){
        return this.blockchain
    },
    setHeroAnamy:function(anamy){
        this.anamy = anamy
    },
    getHeroAnamy:function(){
        return this.anamy
    }


});
