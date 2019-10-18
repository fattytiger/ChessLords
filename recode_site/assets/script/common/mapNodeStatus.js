
cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.find(`Canvas/background/LeftCity`).getComponent('playerFightCity').status = this
        cc.find(`Canvas/background/BottomCity/knight`).getComponent('playerAction').status = this
        cc.find(`Canvas/background/BottomCity/archer`).getComponent('playerAction').status = this
        cc.find(`Canvas/background/BottomCity/troop`).getComponent('playerAction').status = this
        this.node.on('startfight',function(node,attack,target){
            this.listenOtherNode(node,attack,target) 
        },this)
    },


    startFight(node,attack,target){
        // this.node.emit('startfight',node,attack,target)
        for(let i=0;i<target.length;i++){
            target[i]._components[1].readyToAttacked(attack)
        }
    },

    // listenOtherNode(node,attack,target){
    //     console.log(node,attack,target)
    // },

    start () {

    },

    // update (dt) {},
});
