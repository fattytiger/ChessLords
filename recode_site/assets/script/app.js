
const DEFAULT = { BLOCKCHAIN: 'icon', NETWORK: 'mainnet', LANGUAGE_CODE: 'en' }
const ws = new WebSocket('ws://120.78.68.145:8000', 'echo-protocol')
const i18n = require("LanguageData")
const SoundManager = require('SoundManage')
const HttpEvent = require('HttpEvent')
const http = new HttpEvent()
const soundManager = new SoundManager()
const NetInfo = require('NetInfo')
const netinfo = new NetInfo()
const bcxAdapter = require('bcxAdapter')
//http setting

cc.Class({
    extends: cc.Component,

    properties: {
        LocationButton: {
            default: null,
            type: cc.Button
        },
        progressBar: {
            default: null,
            type: cc.ProgressBar
        },
        loadingProgress: {
            default: null,
            type: cc.Label
        },
        SocialButtonRoot: {
            default: null,
            type: cc.Node
        },
        LoginTip:{
            type:cc.Prefab,
            default:null
        }
    },




    //loadsources
    loadSound: function () {

        cc.loader.loadResDir('sound', cc.AudioClip, (completeCount, totalCount) => {
            this.loadingProgress.string = `Loading audio resource ${completeCount}/${totalCount}`
            this.progressBar.progress = completeCount / totalCount
        }, (err, resource) => {
            if (window.BcxWeb) {
                console.log(window.BcxWeb)
                // http.connectServer(window.BcxWeb.account_name,this)
            } else {
                console.log('no have bcxweb')
            }
        })

    },
    loadImage: function () {


        cc.loader.loadResDir('image', (completeCount, totalCount) => {
            this.loadingProgress.string = `Loading image resource ${completeCount}/${totalCount}`
            this.progressBar.progress = completeCount / totalCount
        }, (err, resource) => {
            this.loadSound()
        })

    },

    //open Website about blocklordsgame
    openTwitter: function () {
        cc.sys.openURL(`https://twitter.com/blocklords`)
    },
    openFaceBook: function () {
        cc.sys.openURL(`https://www.facebook.com/blocklordsgame`)
    },
    openDiscord: function () {
        cc.sys.openURL(`https://discordapp.com/invite/K64J3Vw`)
    },
    openTelegram: function () {
        cc.sys.openURL(`https://t.me/joinchat/HGG3Zg-6yvZthjnYGSPCEA`)
    },



    //buttonOption
    playOption: function () {
        soundManager.basicclickSound()
        // bcxAdapter.sendWinCocos(this.account_name,this.score,function(res){
        //     console.log("sendWinCocos",res)
        // })
        bcxAdapter.transfer(function(res){
            if(res.code == 1){
                ws.send(JSON.stringify(netinfo.matchData()))
            }else {
                console.log('no transfer')
            }
        })
    },

    onLoad() {
        this.account_name = ''
        let self = this
        if(bcxAdapter){
            bcxAdapter.initSDK(function(res){
                console.log('initSDK',res)
                if(res){
                    bcxAdapter.login(function(res){
                        console.log('login',res)
                        console.log(res.account_name)
                        self.account_name = res.account_name
                    })
                }
            })
        }


        this.LocationButton.node.active = false
        this.progressBar.node.active = true
        soundManager.onPlayWorldBgSound()
        this.loadImage()
    },


    



    start() {
        cc.login = false
    },

    update(dt) { },
});
