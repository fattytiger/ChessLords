const EventType = require('EventType')
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onEnable:function(){
        //load atalas resources
        cc.zz.fire.on(EventType.LOAD_ATLAS_RESOURCE,this.loadAtlasResource.bind(this))
    },
    onDisable:function(){
        cc.zz.fire.un(EventType.LOAD_ATLAS_RESOURCE,this.loadAtlasResource.bind(this))
    },

    loadResource:function(url,type,callback){
        cc.loader.loadRes(url,type,function(err,resource){
            if(err){console.log(err);return}
            callback(resource)
        })
    },

    loadAtlasResource:function(path,url,callback){
        cc.loader.loadRes(path,cc.SpriteAtlas,function(err,atlas){
            if(err){console.log(err);return}
            let frame = atlas.getSpriteFrame(`${url}`)
            callback(frame)
        })
    },

});
