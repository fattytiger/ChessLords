

const DEFAULT = { BLOCKCHAIN: 'cocosbcx', NETWORK: 'cocosnet', LANGUAGE_CODE: 'en' }
const EventType = require('EventType')
const bcxAdapter = require('bcxAdapter')
cc.Class({
    extends: cc.Component,

    properties: {
        progressLabel: {
            default: null,
            type: cc.Label
        },
        progressBar: {
            default: null,
            type: cc.Sprite
        },
        progress: {
            default: null,
            type: cc.Sprite
        },
        playButton: {
            default: null,
            type: cc.Node
        },
        popupContainer: {
            default: null,
            type: cc.Node
        },
        LoginHeroAmount: {
            default: null,
            type: cc.Label
        },
        ReadyHeroAmount: {
            default: null,
            type: cc.Label
        }
    },

    onEnable: function () {

    },
    bindEvents: function () {
        cc.zz.net.addHandler(cc.zz.net.constants.MAP_DATA, this.mapData.bind(this), true)
        cc.zz.net.addHandler(cc.zz.net.constants.HERO_LOGIN, this.initServer.bind(this))
        cc.zz.net.addHandler(cc.zz.net.constants.HERO_READY, this.playerReady.bind(this))
        cc.zz.net.addHandler(cc.zz.net.constants.INTO_GAME, this.intoGame.bind(this))
        cc.zz.net.addHandler(cc.zz.net.constants.RECONNECT_CONNECTION, this.reconnectConnection.bind(this))
        cc.zz.net.addHandler(cc.zz.net.constants.SHOW_HERO_LOGIN_NUMBER, this.showHeroLoginNumber.bind(this), true)
        cc.zz.net.addHandler(cc.zz.net.constants.SHOW_HERO_READY_NUMBER, this.showHeroReadyNumber.bind(this), true)

    },

    onDisable: function () {
        cc.zz.net.fnError = undefined
    },

    onLoad: function () {
        this.getLoginData(DEFAULT.BLOCKCHAIN, DEFAULT.NETWORK, (logindata) => {
            this.init(logindata)
        })
    },

    start: function () {

    },

    getLoginData: function (blockchain, network, callback) {
        //init bcx
        bcxAdapter.initSDK((result) => {
            if (result === true) {
                bcxAdapter.login((account) => {
                    const LoginData = require('LoginData')
                    if (callback) {
                        let logindata = new LoginData(account.account_id, account.account_name, blockchain, network)
                        callback(logindata)
                    }
                })
            } else {
                window.alert("请确保已经安装cocospay钱包")
                if (window.alert) { location.reload() }
            }
        })
    },



    initServer: function (data) {
        console.log(data)
        //set the hero anamy
        cc.zz.LoginData.setHeroAnamy(data.anamy)

        //prevent the disconnected button
        if (this.playButton === null) {
            return
        }

        let ingame = data.ingame
        console.log(ingame)
        //if ingame values true,then send send the reconnect
        // if (ingame === true) {
        //     cc.zz.net.send(cc.zz.net.constants.RECONNECT_REQUEST, [cc.zz.LoginData.getHeroID()])
        //     return
        // } else {
        //     this.playButton.active = true
        //     this.progressBar.node.active = false
        // }
        this.playButton.active = true
        this.progressBar.node.active = false
    },


    init: function (logindata) {

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

        let MapData = require('map-data')
        cc.zz.MapData = new MapData()

        cc.zz.fire.on(EventType.POP_UP, this.showPopup.bind(this))
        //start load resources
        this.loadCommonSprite()
    },

    //Step 1
    loadCommonSprite: function () {
        cc.loader.loadResDir("common", (function (completedCount, totalCount) {
            this.progressLabel.string = "Loading common sprites: " + completedCount + "/" + totalCount;
            this.progress.node.width = (completedCount / totalCount) * (this.progressBar.node.width)
        }).bind(this), (function (err, resouce) {
            if (err) {
                return
            }
            this.loadMapSprites()
        }).bind(this))
    },

    //step2
    loadMapSprites: function () {
        cc.loader.loadResDir("map", (function (completedCount, totalCount) {
            this.progressLabel.string = "Loading common sprites: " + completedCount + "/" + totalCount;
            this.progress.node.width = (completedCount / totalCount) * (this.progressBar.node.width)
        }).bind(this), (function (err, resouce) {
            if (err) {
                return
            }
            this.loadSettings()
        }).bind(this))
    },

    //step3
    loadSettings: function () {
        cc.loader.loadResDir("table", (function (completedCount, totalCount) {
            this.progressLabel.string = "Loading common sprites: " + completedCount + "/" + totalCount;
            this.progress.node.width = (completedCount / totalCount) * (this.progressBar.node.width)
        }).bind(this), (function (err, table) {
            if (err) {
                return
            }
            cc.zz.TableDataManage.initTableList(table)
            this.connectToServer()
        }).bind(this))
    },

    //step4
    connectToServer: function () {
        this.progressLabel.string = "Connect to server..."
        this.progress.node.width = (this.progressBar.node.width) / 2
        cc.zz.net.connect(cc.zz.net.getIpAddress(cc.zz.LoginData.getBlockchainType(), cc.zz.LoginData.getNetType()), (function () {
            this.finally()
        }).bind(this), (function (attempts) {
            if (-1 === attempts) {
                this.progressLabel.string = "Failed to connect to server. Please try again later!"
            } else {
                let dot = "."
                let dots = dot.repeat(attempts + 1)
                console.log(dots);
                this.progressLabel.string = "Trying to establish a server connection" + dots
                this.progress.node.width += (attempts * 0.1) * this.progressBar.node.width
            }
        }).bind(this))
    },

    finally: function () {
        this.bindEvents()
        //init the hero
        let heroID = cc.zz.LoginData.getHeroID()
        let heroName = cc.zz.LoginData.getHeroName()
        cc.zz.net.send(cc.zz.net.constants.HERO_LOGIN, [heroID, heroName])
    },

    showPopup: function (type, data, callback) {
        this.popupContainer.getComponent('pop-up').show(type, data, callback)
    },

    playerReady: function (data) {
        cc.zz.fire.fire(EventType.POP_UP, cc.zz.Popup.TYPE.WAITTING_ANOTHER_PLAYER.id, {})
        cc.director.preloadScene('MainScene', function () {

        })
    },

    intoGame: function (data) {
        console.log(data)
        //into game
        cc.zz.fire.fire(EventType.POP_UP, cc.zz.Popup.TYPE.FIND_ANOTHER_PLAYER.id, {}, () => {
            cc.zz.fire.un(EventType.POP_UP, this.showPopup.bind(this))
            cc.zz.net.removeHandler(cc.zz.net.constants.HERO_LOGIN, this.initServer.bind(this))
            cc.zz.net.removeHandler(cc.zz.net.constants.HERO_READY, this.playerReady.bind(this))
            cc.zz.net.removeHandler(cc.zz.net.constants.INTO_GAME, this.intoGame.bind(this))
            cc.zz.net.removeHandler(cc.zz.net.constants.SHOW_HERO_LOGIN_NUMBER, this.showHeroLoginNumber.bind(this), true)
            cc.zz.net.removeHandler(cc.zz.net.constants.SHOW_HERO_READY_NUMBER, this.showHeroReadyNumber.bind(this), true)
            cc.director.loadScene("MainScene")
        })
    },

    mapData: function (data) {
        cc.zz.MapData.pushMapElement(data)
    },

    reconnectConnection: function (data) {
        console.log(data)
        cc.zz.MapData.setConnectionData(data)
        cc.zz.fire.un(EventType.POP_UP, this.showPopup.bind(this), true)
        cc.director.loadScene("MainScene")
    },

    onClickPlayBtn: function () {
        let heroID = cc.zz.LoginData.getHeroID()
        let parameters = []
        bcxAdapter.callSmartContract(bcxAdapter.startContract, "startgame", parameters, (result) => {
            console.log(result)
            if (result.code === 1) {
                cc.zz.net.send(cc.zz.net.constants.HERO_READY, [heroID])
            }
            if(result.isError === true){
                window.alert("请确认钱包已经解锁")
                if(window.alert){location.reload()}
            }
        })
    },
    //recive the logined players amount
    showHeroLoginNumber: function (data) {
        let heroes = parseInt(data)
        cc.zz.LoginData.setLoginHeroes(heroes)
        this.LoginHeroAmount.string = `Logined Heroes : ${heroes}`
    },
    //recive the ready players amount
    showHeroReadyNumber: function (data) {
        let heroes = parseInt(data)
        cc.zz.LoginData.setReadyHeroes(heroes)
        this.ReadyHeroAmount.string = `Ready Heroes : ${heroes}`
    }
});
