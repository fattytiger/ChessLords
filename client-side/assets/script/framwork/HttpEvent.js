// const ws = new WebSocket('ws://127.0.0.1:8000', 'echo-protocol')
const NetInfo = require('NetInfo')
const netinfo = new NetInfo()
const BottomPlayer = require('BottomPlayer')
const bottomPlayer = new BottomPlayer()
module.exports = cc.Class({
    extends: cc.Component,

    connectServer: function (userinfo,self) {
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
        let message = netinfo.loginData(userinfo)
        console.log(message)
        ws.send(JSON.stringify(message))
        ws.onmessage = function (evt) {
            console.log(evt)
            let res = JSON.parse(evt.data)
            if (res.code === 0) {
                self.LocationButton.node.active = true
                self.progressBar.node.active = false
            }
            if(res.code === 1000){
                console.log('mathing now')
            }
            if(res.code === 1001){
                cc.director.loadScene("FightScene");
            }
        }
    },

    fightConnectServer:function(userinfo){
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
        let message = netinfo.loginData(userinfo)
        ws.send(JSON.stringify(message))
        ws.onmessage = function (evt) {
            console.log(evt)
            let res = JSON.parse(evt.data)
            if (res.code === 0) {
                console.log('connect the server')
            }
            if(res.code === 1000){
                console.log('mathing now')
            }
            if(res.code === 1001){
                cc.director.loadScene("FightScene");
            }

            if(res.code === 3001){
                console.log('bottom troop move')
                bottomPlayer.TroopAction(true,res.xdistance,res.ydistance)
            }
        }
    },

    leftTroopMove:function(){

    }



});
