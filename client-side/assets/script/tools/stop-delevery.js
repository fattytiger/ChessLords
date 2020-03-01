cc.Class({
    extends: cc.Component,

    properties: {
       
    },
    StopDelivery(evt){
        evt.stopPropagation()
    },
    onLoad () {
        this.node.on(cc.Node.EventType.MOUSE_DOWN,this.StopDelivery)
    },
});
