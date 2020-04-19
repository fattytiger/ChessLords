const EventType = require('EventType')
const bcxAdapter = require('bcxAdapter')
cc.Class({
    extends: cc.Component,
    properties: {
        popupContainer:{
            default:null,
            type:cc.Node
        },
        LoginHeroAmount:{
            default:null,
            type:cc.Label
        },
        readyHeroAmount:{
            default:null,
            type:cc.Label
        }
    },
    onEnable:function(){
        cc.zz.fire.on(EventType.POP_UP, this.showpopup.bind(this),true)
        cc.zz.net.addHandler(cc.zz.net.constants.SHOW_HERO_LOGIN_NUMBER,this.showHeroLoginNumber.bind(this),true)
        cc.zz.net.addHandler(cc.zz.net.constants.SHOW_HERO_READY_NUMBER,this.showHeroReadyNumber.bind(this),true)
        cc.zz.net.addHandler(cc.zz.net.constants.FINISHED_BATTLE,this.finishGame.bind(this))
    },
    onDisable:function(){
        cc.zz.fire.un(EventType.POP_UP, this.showpopup.bind(this),true)
        cc.zz.net.removeHandler(cc.zz.net.constants.SHOW_HERO_LOGIN_NUMBER,this.showHeroLoginNumber.bind(this),true)
        cc.zz.net.removeHandler(cc.zz.net.constants.SHOW_HERO_READY_NUMBER,this.showHeroReadyNumber.bind(this),true)
        cc.zz.net.removeHandler(cc.zz.net.constants.FINISHED_BATTLE,this.finishGame.bind(this))
    },

    showpopup: function (type, data, callback) {
        this.popupContainer.getComponent('pop-up').show(type, data, callback)
    },
    onLoad:function(){
        this.LoginHeroAmount.string = `Logined Heroes : ${cc.zz.LoginData.getLoginedHeroes()}`
        this.readyHeroAmount.string = `Ready Heroes : ${cc.zz.LoginData.getReadyHeroes()}`
    },
    //show logined heroes amount
    showHeroLoginNumber:function(data){
        let heroes = parseInt(data)
        cc.zz.LoginData.setLoginHeroes(heroes)
        this.LoginHeroAmount.string = `Logined Heroes : ${heroes}`
    },
    //show ready heroes amount
    showHeroReadyNumber:function(data){
        let heroes = parseInt(data)
        cc.zz.LoginData.setReadyHeroes(heroes)
        this.readyHeroAmount.string = `Ready Heroes : ${heroes}`
    },
    finishGame:function(data){
        let winner = data.winner
        let loser  = data.loser
        if(winner === cc.zz.LoginData.getHeroID()){ 
            cc.zz.fire.fire(EventType.POP_UP, cc.zz.Popup.TYPE.WINNER_PANEL.id, {},this.wingame.bind(this))
         }
         if(loser === cc.zz.LoginData.getHeroID()){
             cc.zz.fire.fire(EventType.POP_UP,cc.zz.Popup.TYPE.LOSER_PANEL.id,{},this.losegame.bind(this))
         }
    },
    wingame:function(){
        let parameters = []
        bcxAdapter.callSmartContract(bcxAdapter.startContract, "endgame", parameters, (result) => {
            console.log(result)
            if (result.code === 1) {
                window.alert("Play Again?")
                if (window.alert) { location.reload() }
            }
        })
    },
    losegame:function(){
        window.alert("Player Again?")
        if(window.alert){location.reload()}
    }
});
