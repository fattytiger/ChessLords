cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    ctor:function(){
        this.mapData = []
        this.connectData = {}
    },

    setConnectionData:function(data){
        this.connectData = data
    },

    pushMapElement:function(data){
        console.log(data,this.mapData.length)
        //judge the data is exsited on map data
        if(this.isHaveHero(data) === true){
            console.warn(`have been exsited`);
        }
        //if doest have ,then push it
        if(this.isHaveHero(data) === false){
            this.mapData.push(data)
        }
        
    },
    isHaveHero:function(hero){
        //if the map data is empty ,return false directly
        if(this.mapData.length === 0){
            return false
        }
        //get the hero ID
        let heroID = hero.hero.hero_id
        //recycle the map data
        for (let i = 0; i < this.mapData.length; i++) {
            let hero = this.mapData[i].hero
            if(hero.hero_id === heroID){
                //exstetd
                return true
            }
        }
        return false
    },
    isEnoughHero:function(){
        return this.mapData.length === 2
    },
    start () {

    },

    // update (dt) {},
});
