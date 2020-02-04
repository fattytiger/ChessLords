

const DEFAULT = { BLOCKCHAIN:'cocosbcx' , NETWORK:'privatenet' ,LANGUAGE_CODE:'en' }
const EventType = require('EventType')
const bcxAdapter = require('bcxAdapter')
cc.Class({
    extends: cc.Component,

    properties: {
        LocationButton: {
            default: null,
            type: cc.Button
        },

        progressLabel:{
            default:null,
            type:cc.Label
        },
        progressBar: {
            default: null,
            type: cc.ProgressBar
        },
        playButton:{
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

    init:function(logindata){

        cc.zz = {}
        cc.zz.http = require('http')
        cc.zz.fire = require('onfire')

        cc.zz.LoginData = logindata

        var Net = require('Net')
        cc.zz.net = new Net()

        
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
            this.progressBar.progress = completedCount/totalCount
        }).bind(this),(function(err,resouce){
            if(err){
                return
            }
            this.loadMapSprites()
        }).bind(this))
    },

    loadMapSprites:function(){
        cc.loader.loadResDir("map",(function(completedCount,totalCount){
            this.progressLabel.string = "Loading common sprites: "+completedCount+"/"+totalCount;
            this.progressBar.progress = completedCount/totalCount
        }).bind(this),(function(err,resouce){
            if(err){
                return
            }
            this.connectToServer()
        }).bind(this))
    },

    connectToServer:function(){
        this.progressLabel.string = "Connect to server..."
        this.progressBar.progress = 0.5

        let ipAddress = cc.zz.net.getIpAddress(cc.zz.LoginData.getBlockchainType(),cc.zz.LoginData.getNetType())
        console.log(ipAddress);
        
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
                this.progressLabel.progress = 0.1 + (attempts * 0.1)
            }
        }).bind(this))

    },

    finally:function(){
        this.playButton.active = true
        this.progressBar.node.active = false
    }


});
