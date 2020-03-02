
const SOLDIER_CONSUME = [ 
    { NAME:"soldier",CONSUME:20 ,RECOVERY_TIME: 10},
    { NAME:"cavalry",CONSUME:10 ,RECOVERY_TIME: 10},
    { NAME:"archer" ,CONSUME:25 ,RECOVERY_TIME: 5}
 ]

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad:function(){
        this.heroManager = cc.Canvas.instance.node.getComponent('hero-manager')
        this.moveLogic = cc.Canvas.instance.node.getComponent('move-logic')
    },

    calculateDistance:function(tile_from,tile_to){
        let path =  this.moveLogic.researchPath(tile_from,tile_to)
        return path.length
    },

    /**
     * @method isEnoughStamina calculate is enough stamina
     * @param troop_id which troop need move 
     * @param block_id which block need stand on
     * **/
    beChangedStamina:function(troop_id,block_id){

        let troop = this.heroManager.getTroopScriptByTroopID(troop_id)
        let troopStamina = troop.getTroopStamina()
        let troopTileFrom = troop.getTroopTileTO()
        let troopTileTo   = parseInt(block_id)
        let troop_type = troop.getTroooType()
        let distance = this.calculateDistance(troopTileFrom,troopTileTo)

        let needDecreaseStamina = SOLDIER_CONSUME[troop_type - 1].CONSUME * distance
        let changedStamina = troopStamina - needDecreaseStamina
        console.log(changedStamina)

        return changedStamina
    },

});
