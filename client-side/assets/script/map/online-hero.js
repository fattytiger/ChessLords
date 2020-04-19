const EventType = require('EventType')

const SOLDIER_CONSUME = [
    { NAME: "soldier", CONSUME: 20, RECOVERY_TIME: 10 },
    { NAME: "cavalry", CONSUME: 10, RECOVERY_TIME: 10 },
    { NAME: "archer", CONSUME: 25, RECOVERY_TIME: 5 }
]

const SOLDIER_PROPERTY = [
    { ID: 3, NAME: "Archer", MOVE_CIRCLE: 1, ATTACK_CIRCLE: 2 },
    { ID: 2, NAME: "Cavalry", MOVE_CIRCLE: 2, ATTACK_CIRCLE: 1 },
    { ID: 1, NAME: "Infantry", MOVE_CIRCLE: 1, ATTACK_CIRCLE: 1 },
]
cc.Class({
    extends: cc.Component,

    properties: {
        heroSprite: {
            default: null,
            type: cc.Sprite
        },
        troopHPPro: {
            default: null,
            type: cc.ProgressBar
        },
        troopStamina: {
            default: null,
            type: cc.ProgressBar
        },
        chooseFlag: {
            default: null,
            type: cc.Node
        },
        animDuration: {
            default: 0.5,
            type: cc.Float
        },
        attackerCDPro:{
            default:null,
            type:cc.Sprite
        }
    },
    ///////////////////////////////////////////////////////////////////////////////
    // Life cycle Methods
    ///////////////////////////////////////////////////////////////////////////////
    ctor: function () {
        this.MOVE_ACTION = {
            MOVE_TO: "MOVE_TO",
            ESCAPE_FROM: "ESCAPE_FROM"
        }
        this.LIGHT_ACTION = {
            HIGH_LIGHT: "HIGH_LIGHT",
            UNHIGH_LIGHT: "UNHIGH_LIGHT"
        }
        this.ATTACK_CD = {
            "ARCHER"   : 20,
            "INFANTRY" : 15,
            "CAVALRY"  : 10
        },
        this.TROOP_TYPE_NAME = {
            "INFANTRY":1,
            "CAVALRY":2,
            "ARCHER"   : 3
        }
    },

    onLoad: function () {
        this.continueTime = -1
        this.continueClick = false
        this.safeTime = 1000

        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.mouseClick, this)
        this.node.on(cc.Node.EventType.MOUSE_MOVE, this.mouseEnter, this)
        this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.mouseLeave, this)
    },

    ///////////////////////////////////////////////////////////////////////////////
    // Click method
    ///////////////////////////////////////////////////////////////////////////////
    mouseEnter: function () {
        console.log('enter')
        let selfHeroID = cc.zz.LoginData.getHeroID()
        if (this.heroID !== selfHeroID) {
            cc.zz.fire.fire(EventType.SHOW_ATTACK_AREA)
        }
    },
    mouseLeave: function () {
        console.log('leave')
        let selfHeroID = cc.zz.LoginData.getHeroID()
        if (this.heroID !== selfHeroID) {
            cc.zz.fire.fire(EventType.HIDE_ATTACK_AREA)
        }
    },

    mouseClick: function () {
        if (this.continueTime === -1) {
            this.continueTime = new Date().getTime()
            this.clickMouse()
            return
        }
        let now = new Date().getTime()
        if (now - this.continueTime < this.safeTime) {
            return
        } else {
            this.continueTime = now
            this.clickMouse()
        }
    },
    clickMouse: function () {
        let selfHeroID = cc.zz.LoginData.getHeroID()
        if (selfHeroID !== this.heroID) {
            cc.zz.fire.fire(EventType.REQUEST_FIGHT_OTHER, this.troopID)
        }
        if (selfHeroID === this.heroID) {
            cc.zz.fire.fire(EventType.CHOOSE_TROOP_FLAG, this.troopID)
        }
    },
    ///////////////////////////////////////////////////////////////////////////////
    // Private Method
    ///////////////////////////////////////////////////////////////////////////////
    initConfig: function () {
        this.blocksManager = cc.Canvas.instance.node.getComponent('blocks-manager')
        this.movelogic = this.node.getComponent('move-logic')
        this.rangearea = this.node.getComponent('range-area')
    },
    initOriginData: function (troop) {
        this.initConfig()
        this.heroID = troop.hero_id
        this.troopID = troop._id
        this.tile_from = parseInt(troop.tile_from)
        this.tile_to = parseInt(troop.tile_to)
        this.troop_name = troop.troop_name
        this.havetimer = false

        this.moveProtect = false
        this.fightProtect = false
        this.lockAttack = false

        this.setTroopColor()
        this.setHeroLocation()
        this.setTroopType(troop.troop_type)
        this.setTroopHP(troop.troop_hp)
        this.setTroopStamina(troop.troop_stamina)
        this.setTroopMaster(troop.master_troop)
    },
    setTroopType: function (troop_type) {
        this.troop_type = parseInt(troop_type)
        let color = null
        let selfHeroID = cc.zz.LoginData.getHeroID()
        if (this.heroID === selfHeroID) {
            color = "e"
        }
        if (this.heroID !== selfHeroID) {
            color = "c"
        }
        let path = "atalasElements/unit"
        let url = `unit_${color}0${this.troop_type}`
        cc.zz.fire.fire(EventType.LOAD_ATLAS_RESOURCE, path, url, (function (sprite) {
            this.heroSprite.spriteFrame = sprite
        }).bind(this))
    },

    getTroooType: function () {
        return this.troop_type
    },

    onChooseFlag: function () {
        this.chooseFlag.active = true
        this.moveAction(this.MOVE_ACTION.MOVE_TO, this.tile_to)
    },
    cancleChooseFlag: function () {
        this.chooseFlag.active = false
        this.moveAction(this.MOVE_ACTION.ESCAPE_FROM, this.tile_to)
    },

    setTroopTileFrom: function (tile_from) {
        this.tile_from = parseInt(tile_from)
    },
    setTroopTileTo: function (tile_to) {
        this.tile_to = parseInt(tile_to)
    },
    getTroopTileFrom: function () {
        return this.tile_from
    },

    getTroopTileTO: function () {
        return this.tile_to
    },

    setTroopColor: function () {
        let selfHeroID = cc.zz.LoginData.getHeroID()
        if (this.heroID === selfHeroID) {
            this.troop_color = "blue"
        }
        if (this.heroID !== selfHeroID) {
            this.troop_color = "red"
        }
    },

    setTroopHP: function (troop_hp) {
        if (troop_hp <= 0) {
            this.troop_hp = 0
            this.troopHPPro.progress = 0 / 100
        }
        this.troop_hp = parseInt(troop_hp)
        this.troopHPPro.progress = this.troop_hp / 100
    },
    setTroopStamina: function (troop_stamina) {
        this.troop_stamina = parseInt(troop_stamina)
        this.troopStamina.progress = this.troop_stamina / 100
    },
    getTroopStamina: function () {
        return this.troop_stamina
    },

    setTroopMaster: function (troop_master) {
        let selfHeroID = cc.zz.LoginData.getHeroID()
        if (troop_master === true && selfHeroID === this.heroID) {
            cc.zz.fire.fire(EventType.CHOOSE_TROOP_FLAG, this.troopID)
        }
    },
    setHeroLocation: function () {
        let pos = this.blocksManager.getBlockPositionByID(this.tile_to)
        this.node.x = pos.x + 100
        this.node.y = pos.y + 150
    },

    lockMoveProtect:function(){
        this.moveProtect = true
    },
    unlockMoveProtect:function(){
        this.moveProtect = false
    },
    getTroopMoveProtect: function () {
        return this.moveProtect
    },

    
    lockFightProtect:function(){
        this.fightProtect = true
    },
    unlockFightProtect:function(){
        this.fightProtect = false
    },
    getFightProtect:function(){
        return this.fightProtect
    },


    lockAttackCD:function(){
        this.lockAttack = true
    },
    unlockAttackCD:function(){
        this.lockAttack = false
    },
    getLockAttack:function(){
        return this.lockAttack
    },


    ///////////////////////////////////////////////////////////////////////////////
    // Movement
    ///////////////////////////////////////////////////////////////////////////////
    heroMove: function (tile_from, tile_to) {
        this.tile_from = parseInt(tile_from)
        this.tile_to = parseInt(tile_to)
        this.excuteMoveTask()
        this.initStaminaInterval()
    },

    initStaminaInterval: function () {

        if (this.havetimer === true) {
            console.warn('there already have the interval');
            return
        }
        this.havetimer = true
        let amount = SOLDIER_CONSUME[this.troop_type - 1].CONSUME
        let interval = SOLDIER_CONSUME[this.troop_type - 1].RECOVERY_TIME
        console.log(amount, interval)
        this.schedule(() => {
            let changedStamina = this.troop_stamina + amount
            console.log(changedStamina)
            if (changedStamina >= 100) {
                changedStamina = 100
                this.setTroopStamina(changedStamina)
            }
            if (changedStamina < 100) {
                this.setTroopStamina(changedStamina)
            }
        }, interval, cc.macro.REPEAT_FOREVER)
    },

    excuteMoveTask() {
        //set hero protect when he is moving
        this.lockMoveProtect()
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
            this.unlockMoveProtect()
            return
        }
        //hero run action
        this.node.runAction(cc.sequence((cc.moveBy(this.animDuration, cc.v2(
            -this.blocksManager.getBlockPositionByID(task.from).x + this.blocksManager.getBlockPositionByID(task.to).x,
            -this.blocksManager.getBlockPositionByID(task.from).y + this.blocksManager.getBlockPositionByID(task.to).y
        ))), cc.callFunc(function () {
            if (selfHeroID === this.heroID) {
                this.moveAction(this.MOVE_ACTION.ESCAPE_FROM, task.from)
                this.moveAction(this.MOVE_ACTION.MOVE_TO, task.to)
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
    moveAction(move_type, tile_to) {
        //calculate the range area
        let circle = this.getCircleAmount()
        let rangeArea = this.rangearea.calcRange(tile_to, circle)

        //move to the a tile,highlight the tile
        if (move_type === this.MOVE_ACTION.MOVE_TO) {
            this.showAttackArea(this.LIGHT_ACTION.HIGH_LIGHT, tile_to)
            this.highMovementArea(rangeArea)
        }
        //escape from the tile ,unlight the tile
        if (move_type === this.MOVE_ACTION.ESCAPE_FROM) {
            this.showAttackArea(this.LIGHT_ACTION.UNHIGH_LIGHT, tile_to)
            this.unhighMovementArea(rangeArea)
        }
    },
    highMovementArea: function (range_area) {
        for (let index = 0; index < range_area.length; index++) {
            let lightScript = this.blocksManager.getBlockScriptByID(range_area[index].id)
            lightScript.moveHighLight()
        }
    },
    unhighMovementArea: function (range_area) {
        for (let index = 0; index < range_area.length; index++) {
            let lightScript = this.blocksManager.getBlockScriptByID(range_area[index].id)
            lightScript.leaveHighLight()
        }
    },

    getCircleAmount() {
        for (let index = 0; index < SOLDIER_PROPERTY.length; index++) {
            if (this.troop_type == SOLDIER_PROPERTY[index].ID) {
                return SOLDIER_PROPERTY[index].MOVE_CIRCLE
            }
        }
    },

    ///////////////////////////////////////////////////////////////////////////////
    // Attack
    ///////////////////////////////////////////////////////////////////////////////

    showAttackArea: function (enter_type, tile_to) {
        let circle = this.getAttackCircleAmount()
        let rangeArea = this.rangearea.calcRange(tile_to, circle)

        if (enter_type === this.LIGHT_ACTION.HIGH_LIGHT) {
            this.highAttackArea(rangeArea)
        }
        if (enter_type === this.LIGHT_ACTION.UNHIGH_LIGHT) {
            this.unhighAttackArea(rangeArea)
        }
    },

    highAttackArea: function (range_area) {
        let rangeArea = range_area
        for (let i = 0; i < rangeArea.length; i++) {
            let block = this.blocksManager.getBlockScriptByID(rangeArea[i].id)
            block.attackHighlight()
        }
    },

    unhighAttackArea: function (range_area) {
        let rangeArea = range_area
        for (let i = 0; i < rangeArea.length; i++) {
            let block = this.blocksManager.getBlockScriptByID(rangeArea[i].id)
            block.unattackHighlight()
        }
    },

    getAttackCircleAmount() {
        for (let index = 0; index < SOLDIER_PROPERTY.length; index++) {
            if (this.troop_type === SOLDIER_PROPERTY[index].ID) {
                return SOLDIER_PROPERTY[index].ATTACK_CIRCLE
            }
        }
    },

    attackAnimation: function (anim_direction, hp) {
        if (anim_direction === "RIGHT_UP"
            || anim_direction === "RIGHT_CENTER"
            || anim_direction === "RIGHT_BOTTOM") {
            //change animSprite scale based on animation direction 
            this.node.scaleX = -1
        }
        if (anim_direction === "LEFT_UP"
            || anim_direction === "LEFT_CENTER"
            || anim_direction === "LEFT_BOTTOM"
            || anim_direction === "UP"
            || anim_direction === "DOWN") {
            //change animSprite scale based on animation direction 
            this.node.scaleX = 1
        }
        //set fight protect
        this.lockFightProtect()
        //play animation
        let animation = this.node.getComponent(cc.Animation)
        //play animation
        cc.zz.fire.fire(EventType.GET_ANIMATION_NAME, this.troop_type, this.troop_color, anim_direction, (function (animation_name) {
            console.log(animation_name)
            let animationState = animation.getAnimationState(animation_name)
            //set animation acelerate speed
            animationState.speed = 1
            //set the animation model as warpMode
            animationState.wrapMode = cc.WrapMode.Normal
            //set the animation repeat count as 3
            animationState.repeatCount = 5
            //play the animation
            animation.play(animation_name)
            //listen when animation finished
            animation.on('finished', function () { this.attackAnimationFinished(anim_direction, hp) }, this)
        }).bind(this))
    },
    attackAnimationFinished: function (troop_hp) {
        console.log('finished animation')
        //set fight protect as false
        this.unlockFightProtect()
        //replace the troop sprite
        this.setTroopType(this.troop_type)
        //set the troop hp
        this.setTroopHP(troop_hp)
        //set the attacker CD
        this.setAttackCD()
    },
    setAttackCD:function(){
        //set attack lock as true
        this.lockAttackCD()
        //set fillRange as 1
        this.attackerCDPro.fillRange = 1
        //start interval
        if(this.troop_type === this.TROOP_TYPE_NAME.INFANTRY){
            //get wattingCD
            let interval = this.ATTACK_CD.INFANTRY 
            //get the decrease
            let decrease = 1 / 1000
            //start interval
            let timer =  setInterval(() => {
                if(this.attackerCDPro.fillRange <= 0){
                    //cancle attack lock 
                    this.unlockAttackCD()
                    //set fillrange as 0
                    this.attackerCDPro.fillRange = 0
                    //clear timer
                    clearInterval(timer)
                }
                if(this.attackerCDPro.fillRange > 0){
                    this.attackerCDPro.fillRange -= decrease
                }
            }, interval);
        }
        if(this.troop_type === this.TROOP_TYPE_NAME.CAVALRY){
            //get wattingCD
            let interval = this.ATTACK_CD.INFANTRY 
            let decrease = 1 / 1000
            //start interval
            let timer =  setInterval(() => {
                if(this.attackerCDPro.fillRange <= 0){
                    //cancle attack lock 
                    this.unlockAttackCD()
                    //set fillrange as 0
                    this.attackerCDPro.fillRange = 0
                    //clear timer
                    clearInterval(timer)
                }
                if(this.attackerCDPro.fillRange > 0){
                    this.attackerCDPro.fillRange -= decrease
                }
            }, interval);
        }
        if(this.troop_type === this.TROOP_TYPE_NAME.ARCHER){
            //get wattingCD
            let interval = this.ATTACK_CD.INFANTRY 
            let decrease = 1 / 1000
            //start interval
            let timer =  setInterval(() => {
                if(this.attackerCDPro.fillRange <= 0){
                    //cancle attack lock 
                    this.unlockAttackCD()
                    //set fillrange as 0
                    this.attackerCDPro.fillRange = 0
                    //clear timer
                    clearInterval(timer)
                }
                if(this.attackerCDPro.fillRange > 0){
                    this.attackerCDPro.fillRange -= decrease
                }
            }, interval);
        }
    },


    defendAnimation: function (anim_direction, troop_hp) {
        if (anim_direction === "RIGHT_UP"
            || anim_direction === "RIGHT_CENTER"
            || anim_direction === "RIGHT_BOTTOM") {
            //change animSprite scale based on animation direction 
            this.node.scaleX = -1
        }
        if (anim_direction === "LEFT_UP"
            || anim_direction === "LEFT_CENTER"
            || anim_direction === "LEFT_BOTTOM"
            || anim_direction === "UP"
            || anim_direction === "DOWN") {
            //change animSprite scale based on animation direction 
            this.node.scaleX = 1
        }
        let moveDistance = 10
        //set the fightProtect as true
        this.lockFightProtect()
        let moveAnim = cc.sequence(
            cc.moveBy(this.animDuration, cc.v2(-moveDistance, 0)),
            cc.moveBy(this.animDuration, cc.v2(moveDistance, 0)),
            cc.moveBy(this.animDuration, cc.v2(moveDistance, 0)),
            cc.moveBy(this.animDuration, cc.v2(-moveDistance, 0)))
        let colorAnim = cc.sequence(
            cc.tintBy(this.animDuration, 255, 125, 125),
            cc.tintBy(this.animDuration, 255, 0, 0),
            cc.tintBy(this.animDuration, 255, 125, 125),
            cc.tintBy(this.animDuration, 255, 255, 255), cc.callFunc(function () {
                //set the fightProtect as false
                this.unlockFightProtect()
                //change the hp
                this.setTroopHP(troop_hp)
            }, this))
        this.heroSprite.node.runAction(cc.spawn(moveAnim, colorAnim))
    }

});
