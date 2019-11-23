cc.Class({
    extends: cc.Component,
    properties:{

    },
    // LIFE-CYCLE CALLBACKS:
    readyToAttacked(attack){

    },


    onMouseDown(event){
        console.log('this')
        let mouseType = event.getButton()
        if(mouseType == cc.Event.EventMouse.BUTTON_LEFT){
            if(!this.attackedLock){
                this.nodeAction.consumeLive(this.attackedNum)
            }
        }
    },

    readyToAttacked(attack){
        this.attackedLock = false
        this.attackedNum  = attack
        console.log(attack)
    },
    
    onLoad () {
        this.RegionLock   = false
        this.attackedLock = true
        this.nodeAction    = this.node._components[2]

        this.nearHaveBndit = false
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this)
    },

    start () {

    },

    // update (dt) {},
});
