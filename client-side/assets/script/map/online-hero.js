const EventType = require('EventType')

const SOLDIER_CONSUME = [ 
    { NAME:"soldier",CONSUME:20 ,RECOVERY_TIME: 10},
    { NAME:"cavalry",CONSUME:10 ,RECOVERY_TIME: 10},
    { NAME:"archer" ,CONSUME:25 ,RECOVERY_TIME: 5}
 ]

 const SOLDIER_PROPERTY = [
    { ID : 3, NAME : "Archer"  ,  MOVE_CIRCLE : 1, ATTACK_CIRCLE:2},
    { ID : 2, NAME : "Cavalry" ,  MOVE_CIRCLE : 2, ATTACK_CIRCLE:1},
    { ID : 1, NAME : "Infantry",  MOVE_CIRCLE : 1, ATTACK_CIRCLE:1},
]
cc.Class({
    extends: cc.Component,

    properties: {
        heroSprite:{
            default:null,
            type:cc.Sprite
        },
        troopHPPro:{
            default:null,
            type:cc.ProgressBar
        },
        troopStamina:{
            default:null,
            type:cc.ProgressBar
        },
        chooseFlag:{
            default:null,
            type:cc.Node
        },
        animDuration:{
            default:0.5,
            type:cc.Float
        }
    },
    ///////////////////////////////////////////////////////////////////////////////
    // Life cycle Methods
    ///////////////////////////////////////////////////////////////////////////////
    ctor:function(){
        this.MOVE_ACTION = {
            MOVE_TO:"MOVE_TO",
            ESCAPE_FROM:"ESCAPE_FROM"
        }
    },

    onLoad:function(){
        this.continueTime  = -1
        this.continueClick = false
        this.safeTime = 1000
        this.node.on(cc.Node.EventType.MOUSE_DOWN,this.mouseClick,this)
        this.node.on(cc.Node.EventType.MOUSE_ENTER,this.mouseEnter,this)
    },

    ///////////////////////////////////////////////////////////////////////////////
    // Click method
    ///////////////////////////////////////////////////////////////////////////////
    mouseEnter:function(){
        let selfHeroID = cc.zz.LoginData.getHeroID()
        if(this.heroID !== selfHeroID){
            cc.zz.fire.fire(EventType)
        }
    },

    mouseClick:function(){
        if(this.continueTime === -1){
            this.continueTime = new Date().getTime()
            this.clickMouse()
            return
        }
        let now = new Date().getTime()
        if(now - this.continueTime < this.safeTime){
            return
        }else{
            this.continueTime = now
            this.clickMouse()
        }  
    },
    clickMouse:function(){
        let selfHeroID = cc.zz.LoginData.getHeroID()
        console.log('click troop')
        if(selfHeroID !==  this.heroID){
            return
        }
        if(selfHeroID === this.heroID){
            cc.zz.fire.fire(EventType.CHOOSE_TROOP_FLAG,this.troopID)
        }
    },
    ///////////////////////////////////////////////////////////////////////////////
    // Private Method
    ///////////////////////////////////////////////////////////////////////////////
    initConfig:function(){        
        this.blocksManager = cc.Canvas.instance.node.getComponent('blocks-manager')
        this.movelogic = this.node.getComponent('move-logic')
        this.rangearea = this.node.getComponent('range-area')
    },
    initOriginData:function(troop){
        this.initConfig()
        this.heroID  = troop.hero_id
        this.troopID = troop._id
        this.tile_from = parseInt(troop.tile_from)
        this.tile_to   = parseInt(troop.tile_to)
        this.havetimer = false
        
        this.moveProtect = false

        this.setHeroLocation()
        this.setTroopType(troop.troop_type)
        this.setTroopHP(troop.troop_hp)
        this.setTroopStamina(troop.troop_stamina)
        this.setTroopMaster(troop.master_troop)
        
    },
    setTroopType:function(troop_type){

        this.troop_type = parseInt(troop_type)
        let color = null
        let selfHeroID = cc.zz.LoginData.getHeroID()
        if(this.heroID === selfHeroID){
            color = "e"
        }
        if(this.heroID !== selfHeroID){
            color = "c"
        }
        let path = "atalasElements/unit"
        let url  = `unit_${color}0${this.troop_type}`

        cc.zz.fire.fire(EventType.LOAD_ATLAS_RESOURCE,path,url,(function(sprite){
            this.heroSprite.spriteFrame = sprite
        }).bind(this))
    },

    getTroooType:function(){
        return this.troop_type
    },

    onChooseFlag:function(){
        this.chooseFlag.active = true
        this.moveAction(this.MOVE_ACTION.MOVE_TO,this.tile_to)
    },
    cancleChooseFlag:function(){
        this.chooseFlag.active = false
        this.moveAction(this.MOVE_ACTION.ESCAPE_FROM,this.tile_to)
    },

    setTroopTileFrom:function(tile_from){
        this.tile_from = parseInt(tile_from)
    },
    setTroopTileTo:function(tile_to){
        this.tile_to = parseInt(tile_to)
    },
    getTroopTileFrom:function(){
        return this.tile_from
    },

    getTroopTileTO:function(){
        return this.tile_to
    },

    setTroopHP:function(troop_hp){
        this.troop_hp = parseInt(troop_hp)
        this.troopHPPro.progress = this.troop_hp / 100
    },
    setTroopStamina:function(troop_stamina){
        this.troop_stamina =  parseInt(troop_stamina)
        this.troopStamina.progress = this.troop_stamina / 100
    },
    getTroopStamina:function(){
        return this.troop_stamina
    },

    setTroopMaster:function(troop_master){
        let selfHeroID = cc.zz.LoginData.getHeroID()
        if(troop_master === true && selfHeroID === this.heroID){
            cc.zz.fire.fire(EventType.CHOOSE_TROOP_FLAG,this.troopID)
        }
    },
    setHeroLocation:function(){
        let pos = this.blocksManager.getBlockPositionByID(this.tile_to)
        this.node.x = pos.x + 100
        this.node.y = pos.y + 150
    },

    

    setTroopMoveProtect:function(){
        this.moveProtect = !this.moveProtect
    },  
    getTroopMoveProtect:function(){
        return this.moveProtect
    },

    
    ///////////////////////////////////////////////////////////////////////////////
    // Movement
    ///////////////////////////////////////////////////////////////////////////////
    heroMove:function(tile_from,tile_to){
        this.tile_from = parseInt(tile_from)
        this.tile_to = parseInt(tile_to)
        this.excuteMoveTask()  
        this.initStaminaInterval()
    },

    initStaminaInterval:function(){

        if(this.havetimer === true){
            console.warn('there already have the interval');
            return
        }
        this.havetimer = true
        
        let amount = SOLDIER_CONSUME[this.troop_type - 1].CONSUME
        let interval = SOLDIER_CONSUME[this.troop_type - 1].RECOVERY_TIME
        console.log(amount,interval)
        this.schedule(() => {
            let changedStamina = this.troop_stamina + amount
            console.log(changedStamina)
            if(changedStamina >= 100){
                changedStamina = 100
                this.setTroopStamina(changedStamina)
            }
            if(changedStamina < 100){
                this.setTroopStamina(changedStamina)
            }
        },interval, cc.macro.REPEAT_FOREVER)
    },

    excuteMoveTask() {
        //set hero protect when he is moving
        this.setTroopMoveProtect()
        //get the move path from the moveLogic.researchPath function
        let movePath = this.movelogic.researchPath(this.tile_from, this.tile_to)
        //init the move array
        this.moveTask = []
        for (let index = 0; index < movePath.length; index++) {
            let task = {}
            if (movePath[index]) {
                task.finish = false
                task.to = movePath[index].id
            }
            if (movePath[index - 1]) {
                task.from = movePath[index - 1].id
            }
            if (!movePath[index - 1]) {
                task.from = this.tile_from
            }
            //set move task
            this.moveTask.push(task)
        }
        this.moveOneBlock()
    },

    moveOneBlock: function () {
        let selfHeroID = cc.zz.LoginData.getHeroID()
        let task = {}
        for (let index = 0; index < this.moveTask.length; index++) {
            //find the next task 
            if (this.moveTask[index].finish === false) {
                task = this.moveTask[index]
                break
            }
        }
        //when the task is all excuted,unlock the hero protect 
        if (task.finish == null) {
            this.setTroopMoveProtect()
            return
        }
        //hero run action
        this.node.runAction(cc.sequence((cc.moveBy(this.animDuration, cc.v2(
            -this.blocksManager.getBlockPositionByID(task.from).x + this.blocksManager.getBlockPositionByID(task.to).x,
            -this.blocksManager.getBlockPositionByID(task.from).y + this.blocksManager.getBlockPositionByID(task.to).y
        ))), cc.callFunc(function () {
            if(selfHeroID === this.heroID){
                this.moveAction(this.MOVE_ACTION.ESCAPE_FROM,task.from)
                this.moveAction(this.MOVE_ACTION.MOVE_TO,task.to)
            }

            for (let index = 0; index < this.moveTask.length; index++) {
                if (task.to == this.moveTask[index].to) {
                    this.moveTask[index].finish = true
                }
            }
            //when finished the action ,excute the next task right now
            this.moveOneBlock()
        }, this)))
    },

    moveAction(move_type,tile_id){
        //calculate the range area
        let circle = this.getCircleAmount()
        let rangeArea = this.rangearea.calcRange(this.tile_to,circle)
        //move to the a tile,highlight the tile
        if(move_type === this.MOVE_ACTION.MOVE_TO){
            //set the tile_id this.tile_id
            this.tile_id = tile_id
            //highlight the move range
            for (let index = 0; index < rangeArea.length; index++) {
                let lightScript = this.blocksManager.getBlockScriptByID(rangeArea[index].id)
                if(lightScript === undefined){
                    continue
                }
                lightScript.moveHighLight()
            }
        }
        //escape from the tile ,unlight the tile
        if(move_type === this.MOVE_ACTION.ESCAPE_FROM){
            //set the tile_from as this.tile_form
            this.tile_from = tile_id
            //unhighlight the move range
            for (let index = 0; index < rangeArea.length; index++) {
                let lightScript = this.blocksManager.getBlockScriptByID(rangeArea[index].id)
                if(lightScript === undefined){
                    continue
                }
                lightScript.leaveHighLight()
            }
        }
    },
    getCircleAmount(){
        for (let index = 0; index < SOLDIER_PROPERTY.length; index++) {
            if(this.troop_type == SOLDIER_PROPERTY[index].ID){
                return SOLDIER_PROPERTY[index].MOVE_CIRCLE
            }
        }
    },

    ///////////////////////////////////////////////////////////////////////////////
    // Attack
    ///////////////////////////////////////////////////////////////////////////////

    showAttackArea:function(){
        let circle =  this.getAttackCircleAmount()
        let rangeArea = this.rangeArea.calcRange(this.tile_to,circle)
    },

    getAttackCircleAmount(){
        for(let index = 0;index < SOLDIER_PROPERTY.length ; index ++){
            if(this.troopType === SOLDIER_PROPERTY[index].ID){
                return SOLDIER_PROPERTY[index].ATTACK_CIRCLE
            }
        }
    },

});
