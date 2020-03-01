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
        
    },
    onDisable:function(){
        cc.zz.fire.un(EventType.POP_UP, this.showpopup.bind(this),true)
    },

    showpopup: function (type, data, callback) {
        this.popupContainer.getComponent('pop-up').show(type, data, callback)
    },
    onLoad:function(){
        cc.zz.fire.on(EventType.POP_UP, this.showpopup.bind(this),true)
    }
});
