const EventType = require("EventType")
cc.Class({
    extends: cc.Component,

    properties: {
        
    },
    ctor:function(){
        this.ANIM_DIRECTION = {
            "LEFT_UP":"LEFT_UP",
            "CENTER_UP":"CENTER_UP",
            "RIGHT_UP":"RIGHT_UP",
            "LEFT_CENTER":"LEFT_CENTER",
            "RIGHT_CENTER":"RIGHT_CENTER",
            "LEFT_BOTTOM":"LEFT_BOTTOM",
            "CENTER_BOTTOM":"CENTER_BOTTOM",
            "RIGHT_BOTTOM":"RIGHT_BOTTOM"
        }
    },

    onEnable:function(){
        cc.zz.fire.on(EventType.REQUEST_FIGHT_OTHER,this.requestFightOther.bind(this))
        cc.zz.fire.on(EventType.REQUEST_FIGHT_BASE,this.requestFightBase.bind(this))

        cc.zz.net.addHandler(cc.zz.net.constants.RECEIVE_TROOP_FIGHT,this.receiveTroopFight.bind(this))
        cc.zz.net.addHandler(cc.zz.net.constants.RECEIVE_FIGHT_BASE,this.receiveFightBase.bind(this))
    },
    onDisable:function(){
        cc.zz.fire.un(EventType.REQUEST_FIGHT_OTHER,this.requestFightOther.bind(this))
        cc.zz.fire.un(EventType.REQUEST_FIGHT_BASE,this.requestFightBase.bind(this))

        cc.zz.net.removeHandler(cc.zz.net.constants.RECEIVE_TROOP_FIGHT,this.receiveTroopFight.bind(this))
        cc.zz.net.removeHandler(cc.zz.net.constants.RECEIVE_FIGHT_BASE,this.receiveFightBase.bind(this))
    },

    onLoad:function(){
        this.heroManager = this.node.getComponent('hero-manager')
        this.blocksManager = this.node.getComponent('blocks-manager')
        this.buildingManager = this.node.getComponent("building-manager")
    },

    requestFightOther:function(troop_id){
        let attackerID = this.heroManager.getMasterTroopID()
        let defenderID = troop_id

        let attacker = this.heroManager.getTroopScriptByTroopID(attackerID)
        let defender = this.heroManager.getTroopScriptByTroopID(defenderID)

        let attackerMoveProtect = attacker.getTroopMoveProtect()
        let defenderMoveProtect = defender.getTroopMoveProtect()

        if(attackerMoveProtect === true){
            console.warn(`attacker is moving`);
            return
        }
        if(defenderMoveProtect === true){
            console.warn(`defender is moving`);
            return
        }

        let attackerFightProtect = attacker.getFightProtect()
        let defenderFightProtect = defender.getFightProtect()

        if(attackerFightProtect === true){
            console.warn(`attacker is fighting now`);
            return
        }
        if(defenderFightProtect === true){
            console.warn(`defender is fighting now`);
            return
        }

        let attackerLockFight = attacker.getLockAttack()
        
        if(attackerLockFight === true){
            console.warn(`attacker was lock fight`);
            return
        }

        let defenderTileTo = defender.getTroopTileTO()
        let defenderLocation = this.blocksManager.getBlockScriptByID(defenderTileTo)
        if(defenderLocation.getAttackArea() === false){
            console.warn(`out of attack range`);
            return
        }
        cc.zz.net.send(cc.zz.net.constants.REQUEST_TROOP_FIGHT,[attackerID,defenderID])
    },

    requestFightBase:function(base_id){
        let attackerID = this.heroManager.getMasterTroopID()
        let defenderID = base_id

        let attacker = this.heroManager.getTroopScriptByTroopID(attackerID)
        let defender = this.buildingManager.findBaseByBaseID(defenderID)        

        let attackerMoveProtect = attacker.getTroopMoveProtect()
        if(attackerMoveProtect === true){
            console.warn(`attacker is moving`);
            return
        }

        let attackerFightProtect = attacker.getFightProtect()
        let defenderFightProtect = defender.getFightProtect()
        if(attackerFightProtect === true){
            console.warn(`attacker is fighting now`);
            return
        }
        if(defenderFightProtect === true){
            console.warn('defender is fighting now');
        }

        let attackerLockFight = attacker.getLockAttack()
        if(attackerLockFight === true){
            console.warn(`attacker was lock fight`);
            return
        }

        let defenderTileTo = defender.getTileID()
        let defenderLocation = this.blocksManager.getBlockScriptByID(defenderTileTo)
        if(defenderLocation.getAttackArea() === false){
            console.warn(`out of attack range`);
            return
        }
        
        cc.zz.net.send(cc.zz.net.constants.REQUEST_FIGHT_BASE,[attackerID,defenderID])
    },

    

    receiveTroopFight:function(data){
        console.log(data)
        let attackerHP = data.attacker.troop_hp
        let defenderHP = data.defender.troop_hp

        let attackerID = data.attacker._id
        let defenderID = data.defender._id

        let attacker = this.heroManager.getTroopScriptByTroopID(attackerID)
        let defender = this.heroManager.getTroopScriptByTroopID(defenderID)

        let attackerTileTo = attacker.getTroopTileTO()
        let defenderTileTo = defender.getTroopTileTO()

        let attackerAnimationDirection = this.getAnimDirection(attackerTileTo,defenderTileTo)
        let defenderAnimationDirection = this.getAnimDirection(defenderTileTo,attackerTileTo)

        attacker.attackAnimation(attackerAnimationDirection,attackerHP)
        defender.defendAnimation(defenderAnimationDirection,defenderHP)
    },

    receiveFightBase:function(data){
        console.log(data)
        let attackerID = data.attacker._id
        let defenderID = data.defender._id

        let attackerHP = data.attacker.troop_hp
        let defenderHP = data.defender.base_hp

        let attacker = this.heroManager.getTroopScriptByTroopID(attackerID)
        let defender = this.buildingManager.findBaseByBaseID(defenderID)

        let attackerTileTo = attacker.getTroopTileTO()
        let defenderTileID = defender.getTileID()

        let attackerAnimationDirection = this.getAnimDirection(attackerTileTo,defenderTileID)
        let defenderAnimationDirection = this.getAnimDirection(defenderTileID,attackerTileTo)

        attacker.attackAnimation(attackerAnimationDirection,attackerHP)
        defender.defendAnimation(defenderAnimationDirection,defenderHP)
    },


    getAnimDirection(attacker_id, defender_id) {
        let attackerPos = this.blocksManager.getBlockPositionByID(attacker_id)
        let defenderPos = this.blocksManager.getBlockPositionByID(defender_id)

        let attackerPosX = parseInt(attackerPos.x)
        let attackerPosY = parseInt(attackerPos.y)

        let defenderPosX = parseInt(defenderPos.x)
        let defenderPosY = parseInt(defenderPos.y)

        //left up
        if(attackerPosX < defenderPosX      && attackerPosY > defenderPosY){  return   this.ANIM_DIRECTION.LEFT_UP}

        //center up
        if(attackerPosX === defenderPosX    && attackerPosY > defenderPosY){ return this.ANIM_DIRECTION.CENTER_UP}

        //right up
        if(attackerPosX > defenderPosX      && attackerPosY > defenderPosY) {return this.ANIM_DIRECTION.RIGHT_UP}

        //left center
        if(attackerPosX < defenderPosX      && attackerPosY === defenderPosY) {return this.ANIM_DIRECTION.LEFT_CENTER}

        //right center
        if(attackerPosX > defenderPosX      && attackerPosY === defenderPosY){return this.ANIM_DIRECTION.RIGHT_CENTER}

        //left bottom
        if(attackerPosX < defenderPosX      && attackerPosY < defenderPosY){return this.ANIM_DIRECTION.LEFT_BOTTOM}

        //left center
        if(attackerPosX === defenderPosX    && attackerPosY < defenderPosY){return this.ANIM_DIRECTION.CENTER_BOTTOM}

        //right bottom
        if(attackerPosX > defenderPosX      && attackerPosY < defenderPosY){return this.ANIM_DIRECTION.RIGHT_BOTTOM}
    },
});
