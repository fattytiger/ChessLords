const EventType = require('EventType')
cc.Class({
    extends: cc.Component,
    properties: {
        popupContainer:{
            default:null,
            type:cc.Node
        }
    },
    onEnable:function(){
        cc.zz.fire.on(EventType.POP_UP, this.showpopup.bind(this),true)
    },
    onDisable:function(){
        cc.zz.fire.un(EventType.POP_UP, this.showpopup.bind(this),true)
    },

    showpopup: function (type, data, callback) {
        this.popupContainer.getComponent('pop-up').show(type, data, callback)
    },
    onLoad:function(){
        let heroID = cc.zz.LoginData.getHeroID()
        cc.zz.net.send(cc.zz.net.constants.MAP_DATA,[heroID])
    }
});
