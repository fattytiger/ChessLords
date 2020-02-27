/****************************************************************************
 Copyright (c) 2019.    Arctic Seascape
 Author                 Medet Ahmetson (admin@blocklords.io)

 https://www.blocklords.io/

 Manages heroes on the map

 ****************************************************************************/

const EventType = require("EventType");

cc.Class({
    extends: cc.Component,

    properties: () => ({
        /**
         * !#en Prefab of the hero.
         *      IMPORTANT! This prefab is not used to show the heroes of the player who plays the game.
         *      They are managed by another script. 
         * !#zh 
         * @property onlineHero
         * @type {cc.Prefab}
         */
        onlineHero: {
            default: null,
            type: cc.Prefab
        },

        mainCamera:{
            default:null,
            type:cc.Camera
        },
        /**
         * !#en Map view in the scene, where heroes will be inserted in.
         *      Simply, this map node is a parent of sprites of online heroes
         * !#zh 
         * @property map
         * @type {cc.Node}
         */
        map: {
            default: null,
            type: cc.Node
        },
    }),

    ///////////////////////////////////////////////////////////////////////////////
    // LIFE-CYCLE CALLBACKS
    ///////////////////////////////////////////////////////////////////////////////

    ctor: function() {
        
    },
    start: function() { 
        this.blocksManager = cc.Canvas.instance.node.getComponent('blocks-manager')
        this.onlineHeroes = [];
        this.heroMappings = {};
    },

    onEnable: function() {
        cc.zz.net.addHandler(cc.zz.net.constants.MAP_DATA, this.onMapData.bind(this), true);
    },

    onDisable: function() {
        cc.zz.net.removeHandler(cc.zz.net.constants.MAP_DATA, this.onMapData.bind(this), true)
    },


    ///////////////////////////////////////////////////////////////////////////////
    // PRIVATE METHODS
    ///////////////////////////////////////////////////////////////////////////////
    /**
     * !#en Recieved players, buildings and occupied tiles list from server
     * !#zh 
     * @method onMapData
     * @param  {data} data
     */
    onMapData (data) {
        if(data && data.players){
            this.showOnlineHeroes(data.players)
        }
    },
    /**
     * !#en Show heroes on the map 
     * !#zh 
     * @method showOnlineHeroes
     * @param  {Array} heroes
     */
    showOnlineHeroes (heroes) {
        let heroesAmount = heroes.length;

        for (let i = 0; i < heroesAmount; i++) {
            let heroId = heroes[i].hero_id;
        
            let hero = cc.instantiate(this.onlineHero)

            let heroScript = hero.getComponent('online-hero');

            // TODO pass troop type (Sprite of Hero) and color
            heroScript.initOriginData (heroes[i])

            // List of references to the hero nodes on the map
            this.onlineHeroes.push(hero);

            // Mapping to find hero on the map by hero ID
            this.heroMappings[heroId] = this.onlineHeroes.length - 1;

            // Show hero on the map
            this.map.addChild(hero)
        }
    },


    lockCameraAtHero:function(){
        let selfWallet = cc.zz.LoginData.getWallet()

        let tileID = this.getHeroLocationByWallet(selfWallet)

        let posX = this.blocksManager.getBlockPositionByID(tileID).x - this.mainCamera.node.x 
        let posY = this.blocksManager.getBlockPositionByID(tileID).y - this.mainCamera.node.y 

        this.mainCamera.node.runAction( cc.moveBy(0.5,cc.v2(posX,posY)))
    },

    fristJoinMap:function(data){
        console.warn('new player joined the game');
        let initHeroData = data


        let heroId = data.hero_id;

        //change the heroid
        initHeroData.id = data.hero_id
        initHeroData.morale = data.current_morale
        console.warn(initHeroData);
        let hero = cc.instantiate(this.onlineHero)

        let heroScript = hero.getComponent('online-hero');

        if (!heroScript) {
            throw "online script was not found";
        }

        else {
            // Initialize hero parameters
            // TODO pass troop type (Sprite of Hero) and color
            heroScript.initOriginData (initHeroData)

            // List of references to the hero nodes on the map
            this.onlineHeroes.push(hero);

            // Mapping to find hero on the map by hero ID
            this.heroMappings[heroId] = this.onlineHeroes.length - 1;

            // Show hero on the map
            this.map.addChild(hero)

            // show the hero with correct troop color and troop type
            cc.zz.fire.fire(EventType.CHANGE_TROOP_SPRITE, initHeroData.troop_color, parseInt(initHeroData.troop_type), heroScript.heroSprite);
        }
    },

    receiveHeroData(data) {
        cc.zz.fire.fire(EventType.SHOW_OTHER_HERO_PANEL,data)
    },

    refillHeroTroops:function(data){
        let walletAddress = data.wallet_address
        let selfWallet    = cc.zz.LoginData.getWallet()
        let heroScript = this.getHeroScriptByWallet(walletAddress)

        let consumeWheat = parseInt(data.wheat)
        let currentTroops = parseInt(data.troops)
        let maxTrooops   = parseInt(data.max_troops)

        if(heroScript == null){
            console.warn(`can not find the hero on line`);
        }

        heroScript.updateHeroTroops(currentTroops,maxTrooops)

        if(selfWallet === walletAddress){
            cc.zz.fire.fire(EventType.CHANGE_SOURCE,'wheat',-consumeWheat)
        }        

    },

    sendHeroMoveReq:function(tile_id){


        if(this.blocksManager == null){
            this.blocksManager = cc.Canvas.instance.node.getComponent('blocks-manager')
        }

        let canMove = this.blocksManager.getBlockScriptByID(tile_id).canMove
        let selfWallet = cc.zz.LoginData.getWallet()
        let selfScript = this.getHeroScriptByWallet(selfWallet)

        let protectStatus = selfScript.getHeroMoveProtect()

        if(protectStatus === true){
            console.warn(`you are moving now`);
            return 
        }

        //consume the stamina
        let stamina = parseInt(cc.zz.LoginData.getHeroData().base.stamina);
        if(stamina - 5 < 0){
            console.warn(`does't have enough stamina`);
            cc.zz.fire.fire(EventType.POP_UP,cc.zz.Popup.TYPE.NOT_ENOUGH_STAMINA.id,{normal_paragraph:`You does't have enough stamina`})
            return
        }

        // let protectStatus = selfScript.getHeroProtect()
        let standHero     = this.blocksManager.getBlockScriptByID(tile_id).getStandHero()

        if(standHero == true){
            cc.log('there already have a hero')
            return
        }

        if(canMove == null){
            console.warn(`block does not exist`);
        }

        if(selfScript == null){
            console.warn(`can not find the hero script`);
        }

        if(canMove == true){
            let tileID = selfScript.tile_id
            cc.zz.net.send(4004,[selfWallet,tileID,tile_id,1,0])
        }

        if(canMove == false){
            cc.log('out of the move range area')
        }
    },

    


    mapHeroMove(data){
        let walletAddress     = data.wallet_address

        if(walletAddress == null){
            console.warn('the received wallet_address was wrong');
        }

        let heroScript  =  this.getHeroScriptByWallet(walletAddress)
        if(heroScript === null){
            console.warn(`does not exist the hero on the map`);
            return 
        }

        heroScript.heroMove(data)
    },

    

    
    /**
     * !#en Hides certain hero from the map.
     * !#zh 
     * @method hide
     * @param  {Boolean} isDisappear
     * @param  {number} heroId
     */
    changeVisibility (settings) {
        if (settings.heroId == undefined) {
            return;
        }

        let hero = this.getHeroNode(settings.heroId)
        if (hero == null) {
            throw 'Hero (ID '+settings.heroId+') not found on a map';
        }
        else {
            if (settings.isDisappear) {
                let duration = 1
                hero.runAction(cc.fadeOut(duration),cc.callFunc(function(){
                        hero.active = false
                    },this))
            }
            else if (!this.intoBuilding) {
                hero.active = true
                let duration = 1
                hero.runAction(cc.fadeIn(duration),cc.callFunc(function(){
                    hero.active = false
                },this))
            }
        }
    },


    /**
     * !#en Get the hero node on the map by hero id
     * !#zh 
     * @method getHeroNode
     * @param {number} heroId 
     * @return {cc.Node|null}
     */
    getHeroNode (heroId) {
        if (!this.heroMappings) {
            return null;
        }

        if (this.heroMappings[heroId] == undefined) {
            return null;
        }

        // index of node on a nodes list
        let i = this.heroMappings[heroId];
    
        if (this.onlineHeroes[i] == undefined) {
            return null;
        }

        return this.onlineHeroes[i];
    },

    /**
     * !#en Get the hero sprite showed on the map by player ID
     * !#zh 
     * @method getHeroNodeByWallet
     * @param {string} walletAddress
     * @return {cc.SpriteFrame|null}
     */
    getHeroSpriteByWallet (walletAddress) {
        if (this.onlineHeroes == undefined) {
            return;
        }

        let heroesAmount = this.onlineHeroes.length;

        for (let i = 0; i<heroesAmount; ++i) {
            let heroScript = this.onlineHeroes[i].getComponent('online-hero');

            if (!heroScript) {
                continue;
            }

            if (!heroScript.wallet_address) {
                continue;
            }

            if (walletAddress == heroScript.wallet_address) {
                return heroScript.heroSprite;
            }
        }

        return  null;
    },


    /**
     * !#en Change the appearance of hero on the map
     * !#zh 
     * @method onMapData
     * @param  {data} data
     */
    onAppearanceChange (data) {

        let heroSprite = this.getHeroSpriteByWallet(data.wallet_address);
        let heroScript = this.getHeroScriptByWallet(data.wallet_address)
        let heroMoveLogic = this.getHeroMoveLogicByWallet(data.wallet_address)

        if (heroSprite == null) {
            return;
        }
        if(heroScript == null){
            return 
        }
        heroScript.setTroopColor(data.color)
        heroScript.setTroopType(data.troop_type)
        heroMoveLogic.changeTroopType(data.troop_type,data.wallet_address)

        cc.zz.fire.fire(EventType.CHANGE_TROOP_SPRITE, data.color, data.troop_type, heroSprite);
    },


    /**
     * !#en Get the tile id on the map where hero is located on by player ID
     * !#zh 
     * @method getHeroNodeByWallet
     * @param {string} walletAddress
     * @return {cc.SpriteFrame|null}
     */
    getHeroLocationByWallet (walletAddress) {
        if (this.onlineHeroes == undefined) {
            return;
        }

        let heroesAmount = this.onlineHeroes.length;

        for (let i = 0; i<heroesAmount; ++i) {
            let heroScript = this.onlineHeroes[i].getComponent('online-hero');

            if (!heroScript) {
                continue;
            }

            if (!heroScript.wallet_address) {
                continue;
            }

            if (walletAddress == heroScript.wallet_address) {
                return heroScript.tile_id;
            }
        }

        return  null;
    },


    /**
     * !#en Get the hero node on the map by player ID
     * !#zh 
     * @method getHeroNodeByWallet
     * @param {string} walletAddress
     * @return {cc.Node|null}
     */
    getHeroNodeByWallet (walletAddress) {
        if (this.onlineHeroes == undefined) {
            return;
        }
        let heroesAmount = this.onlineHeroes.length;

        for (let i = 0; i<heroesAmount; ++i) {
            let heroScript = this.onlineHeroes[i].getComponent('online-hero');

            if (!heroScript) {
                continue;
            }

            if (!heroScript.wallet_address) {
                continue;
            }

            if (walletAddress == heroScript.wallet_address) {
                return this.onlineHeroes[i];
            }
        }

        return  null;
    },

    /**
     * !#en Get the hero script by player ID. Hero script is otherPlayer.js component
     * !#zh 
     * @method getHeroScriptByWallet
     * @param {string} walletAddress
     * @return {otherPlayer|null}
     */
    getHeroScriptByWallet (walletAddress) {
        if (this.onlineHeroes == undefined) {
            return;
        }

        let heroesAmount = this.onlineHeroes.length;

        for (let i = 0; i<heroesAmount; ++i) {
            let heroScript = this.onlineHeroes[i].getComponent('online-hero');
            if (!heroScript) {
                continue;
            }

            if (!heroScript.wallet_address) {
                continue;
            }

            if (walletAddress == heroScript.wallet_address) {
                return heroScript;
            }
        }

        return  null;
    },

    getHeroTroopTypeByWallet(wallet_address){
        if(this.onlineHeroes == undefined){
            return
        }

        let heroesAmount = this.onlineHeroes.length

        for (let index = 0; index < heroesAmount; index++) {

            let heroScript = this.onlineHeroes[index].getComponent('online-hero');
            if (!heroScript) {
                continue;
            }

            if (!heroScript.wallet_address) {
                continue;
            }

            if (wallet_address == heroScript.wallet_address) {
               return heroScript.troop_type
            }

        }
    },

    getHeroTroopsByWallet(wallet_address){
        if(this.onlineHeroes == undefined){
            return
        }

        let heroesAmount = this.onlineHeroes.length

        for (let index = 0; index < heroesAmount; index++) {

            let heroScript = this.onlineHeroes[index].getComponent('online-hero');
            if (!heroScript) {
                continue;
            }

            if (!heroScript.wallet_address) {
                continue;
            }

            if (wallet_address == heroScript.wallet_address) {
               return heroScript.currentTroops
            }
        }
    },

    getHeroMaxTroopsByWallet(wallet_address){
        if(this.onlineHeroes == undefined){
            return
        }

        let heroesAmount = this.onlineHeroes.length

        for (let index = 0; index < heroesAmount; index++) {

            let heroScript = this.onlineHeroes[index].getComponent('online-hero');
            if (!heroScript) {
                continue;
            }

            if (!heroScript.wallet_address) {
                continue;
            }

            if (wallet_address == heroScript.wallet_address) {
               return heroScript.maxTroops
            }

        }
    },

    getHeroMoraleByWallet(wallet_address){
        if(this.onlineHeroes == undefined){
            return
        }

        let heroesAmount = this.onlineHeroes.length

        for (let index = 0; index < heroesAmount; index++) {

            let heroScript = this.onlineHeroes[index].getComponent('online-hero');
            if (!heroScript) {
                continue;
            }

            if (!heroScript.wallet_address) {
                continue;
            }

            if (wallet_address == heroScript.wallet_address) {
               return heroScript.currentMorale
            }

        }
    },

    getHeroHeroNameByWallet(wallet_address){
        if(this.onlineHeroes == undefined){
            return
        }

        let heroesAmount = this.onlineHeroes.length

        for (let index = 0; index < heroesAmount; index++) {

            let heroScript = this.onlineHeroes[index].getComponent('online-hero');
            if (!heroScript) {
                continue;
            }

            if (!heroScript.wallet_address) {
                continue;
            }

            if (wallet_address == heroScript.wallet_address) {
               return heroScript.heroName
            }

        }
    },

    getHeroTroopColorByWallet(wallet_address){
        if(this.onlineHeroes == undefined){
            return
        }

        let heroesAmount = this.onlineHeroes.length

        for (let index = 0; index < heroesAmount; index++) {

            let heroScript = this.onlineHeroes[index].getComponent('online-hero');
            if (!heroScript) {
                continue;
            }

            if (!heroScript.wallet_address) {
                continue;
            }

            if (wallet_address == heroScript.wallet_address) {
               return heroScript.troop_color
            }

        }
    },


    getHeroMoveLogicByWallet(wallet_address){
        if(this.onlineHeroes == undefined){
            return
        }

        let heroesAmount = this.onlineHeroes.length

        for (let index = 0; index < heroesAmount; index++) {

            let heroScript = this.onlineHeroes[index].getComponent('online-hero');
            let heroMoveLogic = this.onlineHeroes[index].getComponent('move-logic')
            if (!heroScript) {
                continue;
            }

            if (!heroScript.wallet_address) {
                continue;
            }

            if (wallet_address == heroScript.wallet_address) {
               return heroMoveLogic
            }

        }
    }
});
