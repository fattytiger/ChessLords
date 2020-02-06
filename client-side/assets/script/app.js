

const DEFAULT = { BLOCKCHAIN:'cocosbcx' , NETWORK:'privatenet' ,LANGUAGE_CODE:'en' }
const EventType = require('EventType')
const bcxAdapter = require('bcxAdapter')
cc.Class({
    extends: cc.Component,

    properties: {
        progressLabel:{
            default:null,
            type:cc.Label
        },
        progressBar:{
            default:null,
            type:cc.Sprite
        },
        progress:{
            default:null,
            type:cc.Sprite
        },
        playButton:{
            default:null,
            type:cc.Node
        },
        popupContainer:{
            default:null,
            type:cc.Node
        }
    },

    onLoad:function(){
        this.getLoginData(DEFAULT.BLOCKCHAIN,DEFAULT.NETWORK,(logindata) => {
            this.init(logindata)
        })
    },

    start:function(){
        this.loadCommonSprite()
    },

    onEnable:function(){
        
    },
    onDisable:function(){

    },

    initServer:function(data){
        console.log(data)
        this.playButton.active = true
        this.progressBar.node.active = false
    },

    init:function(logindata){

        cc.zz = {}
        cc.zz.http = require('http')
        cc.zz.fire = require('onfire')

        cc.zz.LoginData = logindata

        let TableDataManage = require('TableDataManage')
        cc.zz.TableDataManage = new TableDataManage()

        let Popup = require('Popup')
        cc.zz.Popup = new Popup();

        let Utils = require('Utils')
        cc.zz.utils = new Utils()

        var Net = require('Net')
        cc.zz.net = new Net()

    },

    loadisOver:function(){
        console.log('over load')
    },

    getLoginData:function(blockchain,network,callback){
        bcxAdapter.initSDK((result) => {
            if(result === true){
                bcxAdapter.login((account) => {
                    const LoginData = require('LoginData')
                    if(callback){
                        let logindata = new LoginData(account.account_id,account.account_name,blockchain,network)
                        callback(logindata)
                    }
                })
            }else{
                console.log('init SDK FAILD')
            }
        })
    },

    //Step 1
    loadCommonSprite:function(){
        cc.loader.loadResDir("common",(function(completedCount,totalCount){
            this.progressLabel.string = "Loading common sprites: "+completedCount+"/"+totalCount;
            this.progress.node.width = (completedCount/totalCount) * (this.progressBar.node.width)
        }).bind(this),(function(err,resouce){
            if(err){
                return
            }
            this.loadMapSprites()
        }).bind(this))
    },

    //step2
    loadMapSprites:function(){
        cc.loader.loadResDir("map",(function(completedCount,totalCount){
            this.progressLabel.string = "Loading common sprites: "+completedCount+"/"+totalCount;
            this.progress.node.width = (completedCount/totalCount) * (this.progressBar.node.width)
        }).bind(this),(function(err,resouce){
            if(err){
                return
            }
            this.loadSettings()
        }).bind(this))
    },

    //step3
    loadSettings:function(){
        cc.loader.loadResDir("table",(function(completedCount,totalCount){
            this.progressLabel.string = "Loading common sprites: "+completedCount+"/"+totalCount;
            this.progress.node.width = (completedCount/totalCount) * (this.progressBar.node.width)
        }).bind(this),(function(err,table){
            if(err){
                return
            }
            cc.zz.TableDataManage.initTableList(table)
            this.connectToServer()
        }).bind(this))
    },

    //step4
    connectToServer:function(){
        this.progressLabel.string = "Connect to server..."
        this.progress.node.width =  (this.progressBar.node.width) / 2

        cc.zz.net.connect(cc.zz.net.getIpAddress(cc.zz.LoginData.getBlockchainType(),cc.zz.LoginData.getNetType()),(function(){
            
            this.finally()
        }).bind(this),(function(attempts){
            if(-1 === attempts){
                this.progressLabel.string = "Failed to connect to server. Please try again later!"
            }else{
                let dot = "."
                let dots = dot.repeat(attempts + 1)
                console.log(dots);
                this.progressLabel.string = "Trying to establish a server connection" + dots
                this.progress.node.width += (attempts * 0.1) * this.progressBar.node.width
            }
        }).bind(this))

    },

    finally:function(){
        cc.zz.net.addHandler(10000,this.initServer.bind(this))
        cc.zz.fire.on(EventType.POP_UP,this.showPopup.bind(this))
        //init the hero
        let hero_id = cc.zz.LoginData.getHeroID()
        let hero_name = cc.zz.LoginData.getHeroName()
        cc.zz.net.send(8005,[hero_id,hero_name])
    },

    showPopup:function(type,data,callback){
        console.log('disconnected')
        this.popupContainer.getComponent('pop-up').show(type,data,callback)
    }


});
