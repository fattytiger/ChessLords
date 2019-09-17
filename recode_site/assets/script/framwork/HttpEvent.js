const ws = new WebSocket('ws://120.78.68.145:8000', 'echo-protocol')
const NetInfo = require('NetInfo')
const netinfo = new NetInfo()
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
        }
    },

    sendMatching:function(self){
        let message = netinfo.matchData()
        ws.send(JSON.stringify(message))
        ws.onmessage = function(evt){
            let res = JSON.parse(evt.data)
            if(res.code === 1000){
                console.log(res.code)
                let tipPanel = cc.instantiate(self.LoginTip)
                tipPanel.setPosition(0,0)
                let canvas = cc.find('Canvas')
                canvas.addChild(tipPanel)
            }
            if(res.code === 1001){
                console.log(res.code)
                cc.director.loadScene("FightScene");
            }
        }
    }

});
