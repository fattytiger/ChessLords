
const DEFAULT = { BLOCKCHAIN: 'icon', NETWORK: 'mainnet', LANGUAGE_CODE: 'en' }

const i18n = require("LanguageData")
const SoundManager = require('SoundManage')
const HttpEvent = require('HttpEvent')




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
        bgSound: {
            default: null,
            type: cc.AudioClip
        },
        SocialButtonRoot: {
            default: null,
            type: cc.Node
        },
        testPrefab: {
            default: null,
            type: cc.Prefab
        }
    },

    //init the app
    appInit() {
        cc.global = {}

        cc.nodeName = {}

        cc.global.HttpEvent = new HttpEvent()

        cc.nodeName.progressBar = cc.find('Canvas/bgLayer/progressBar')

        cc.nodeName.playButton = cc.find('Canvas/bgLayer/playButton')

        cc.gameSpace = {},

        cc.user = {}

        cc.user.login = false

        cc.user.name = ''
    },

    connectServer: function (self) {
        const ws = new WebSocket('ws://localhost:8080', 'echo-protocol')
        switch (ws.readyState) {
            case WebSocket.CONNECTING:
                console.log('connecting')
                break
            case WebSocket.OPEN:
                console.log('open')
                break
            case WebSocket.CLOSING:
                console.log('closing')
                break
            case WebSocket.CLOSED:
                console.log('closed')
            default:
                break
        }
        ws.onopen = function (evt) {
            let message = JSON.stringify(cc.user)
            ws.send(message)
        }
        ws.onmessage = function (evt) {
            let res = JSON.parse(evt.data)
            if (res.login == true) {
                self.LocationButton.node.active = true
                self.progressBar.node.active = false
            }
        }
    },





    //loadsources
    loadSound: function () {

        cc.loader.loadResDir('sound', cc.AudioClip, (completeCount, totalCount) => {
            this.loadingProgress.string = `Loading audio resource ${completeCount}/${totalCount}`
            this.progressBar.progress = completeCount / totalCount
        }, (err, resource) => {
            console.log('load the source is OK')
            //check the cocos server and wallet
            this.login()
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
        cc.global.soundManager.onPlayEffect('Battle_Start_Button')
    },

    onLoad() {
        this.LocationButton.node.active = false
        this.progressBar.node.active = true
        this.appInit()
        cc.audioEngine.playMusic(this.bgSound, false)
        this.loadImage()

    },

    login: function () {
        if (window.BcxWeb) {
            console.log(window.BcxWeb)
            cc.user.login = true
            cc.user.name = window.BcxWeb.account_name

            let self = this
            this.connectServer(self)
        } else {
            console.log('no have bcxweb')
        }
    },



    start() {

    },

    update(dt) { },
});
