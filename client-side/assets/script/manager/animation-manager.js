const EventType = require("EventType")
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    ctor:function(){
        this.COLOR_TYPE = {
            "BLACK":"black",
            "BLUE" :"blue",
            "RED" :"red",
            "WHITE" :"white",
            "YELLOW" :"yellow",
        },
        this.TROOP_TYPE = {
            "ARCHER":"archer",
            "CAVALRY":"cavalry",
            "SOLDIER":"soldier"
        },
        this.DIRECTION_TYPE = {
            "XS":"xs",
            "UP":"up",
            "CE":"ce",
            "DOWN":"down",
            "XX":"xx"
        }
    },

    onEnable:function(){
        cc.zz.fire.on(EventType.GET_ANIMATION_NAME,this.getAnimationName.bind(this))
    },
    onDisable:function(){
        cc.zz.fire.un(EventType.GET_ANIMATION_NAME,this.getAnimationName.bind(this))
    },


    catchTroopType:function(troop_type){
        let troopType = parseInt(troop_type)
        if(troopType == 1){
            return this.TROOP_TYPE.SOLDIER
        }
        if(troopType == 2){
            return this.TROOP_TYPE.CAVALRY
        }
        if(troopType == 3){
            return this.TROOP_TYPE.ARCHER
        }
    },
    catchTroopColor:function(troop_color){
        let troopColor = troop_color.toLowerCase()
        if(troopColor == "black"){
            return this.COLOR_TYPE.BLACK
        }
        if(troopColor == "white"){
            return this.COLOR_TYPE.WHITE
        }
        if(troopColor == "yellow"){
            return this.COLOR_TYPE.YELLOW
        }
        if(troopColor == "blue"){
            return this.COLOR_TYPE.BLUE
        }
        if(troopColor == "red"){
            return this.COLOR_TYPE.RED
        }
    },

    catchTroopDirection:function(direction){

        if(direction === "LEFT_UP"){
            return this.DIRECTION_TYPE.XX
        }
        if(direction === "CENTER_UP"){
            return  this.DIRECTION_TYPE.DOWN
        }
        if(direction === "RIGHT_UP"){
            return  this.DIRECTION_TYPE.XX
        }
        if(direction === "LEFT_CENTER"){
            return  this.DIRECTION_TYPE.CE
        }
        if(direction === "RIGHT_CENTER"){
            return this.DIRECTION_TYPE.CE
        }
        if(direction === "LEFT_BOTTOM"){
            return this.DIRECTION_TYPE.XS
        }
        if(direction === "CENTER_BOTTOM"){
            return this.DIRECTION_TYPE.UP
        }
        if(direction === "RIGHT_BOTTOM"){
            return this.DIRECTION_TYPE.XS
        }
    },

    getAnimationName:function(troop_type,troop_color,anim_direct,callback){
        let animaionName = `${this.catchTroopColor(troop_color)}_${this.catchTroopType(troop_type)}_${this.catchTroopDirection(anim_direct)}`
        callback(animaionName)
    },
    
});
