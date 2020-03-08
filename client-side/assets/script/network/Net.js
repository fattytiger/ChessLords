const EventType = require('EventType');

cc.Class({
    extends: cc.Component,

    ctor: function () {
        this.ip = '';
        this.socket = null;
        this.heartTime = 10;
        this.connectTimes = 0;
        this.maxConnectTimes = 5;
        this.handlers = {};
        this.constants = {
            HERO_LOGIN:8005,
            HERO_READY:8006,
            INTO_GAME:8007,
            MAP_DATA: 6001,
            
            SEND_TROOP_MOVE:10000,
            RECEIVE_TROOP_MOVE:10001,
            REQUEST_TROOP_FIGHT:20000,
            RECEIVE_TROOP_FIGHT:20001
        };
    },

    addHandler: function (evtName, fn, canRegMore) {
        evtName = evtName.toString();
        if (this.handlers[evtName] && !canRegMore) {
            cc.error('evt: [' + evtName + '] handler has been registered already.');
            return;
        }
        this.handlers[evtName] = fn;
        if (this.socket) {
            cc.zz.fire.on(evtName, fn);
        }
    },

    removeHandler: function (evtName) {
        evtName = evtName.toString();
        cc.zz.fire.un(evtName);
        this.handlers[evtName] = null;
    },

    removeAllHandler: function () {
        for (var evtName in this.handlers) {
            cc.zz.fire.un(evtName);
        }
        this.handlers = {};
    },

    addHandlers: function (fns) {
        for (var evtName in fns) {
            this.addHandler(evtName, fns[evtName]);
        }
    },

    removeHandlers: function (fns) {
        for (var evtName in fns) {
            cc.zz.fire.un(evtName);
            this.handlers[evtName] = null;
        }
    },

    connect: function (ip, fnConnect, fnError) {
        this.ip = ip;
        this.fnConnect = fnConnect;
        this.fnError = fnError;
        if (!this.socket || this.socket.readyState !== 1) {
            // console.log('连接服务器'+this.ip);
            this.socket = new WebSocket(this.ip);
            this.socket.onopen = this._onopen.bind(this);
            this.socket.onclose = this._onclose.bind(this);
            this.socket.onmessage = this._onmessage.bind(this);
        }
    },

    _onopen: function () {
        if (this.connectTimes) {
            cc.zz.fire.fire(EventType.POP_UP, cc.zz.Popup.TYPE.RECONNECTED_TO_SERVER.id, {});
        }
        this.connectTimes = 0;
        this.sendHeart();
        // cc.log("连接服务器成功: " + this.ip);
        if (this.fnConnect) {
            this.fnConnect();
        }
    },

    _onclose: function (err) {
        if (this.connectTimes < this.maxConnectTimes) {
            this.scheduleOnce(function () {
                this.socket = new WebSocket(this.ip);
                this.socket.onopen = this._onopen.bind(this);
                this.socket.onclose = this._onclose.bind(this);
                this.socket.onmessage = this._onmessage.bind(this);
                this.connectTimes++;

                if (this.fnError) {
                    this.fnError(this.connectTimes);
                }
                else {
                    if (this.connectTimes == 1) {
                        cc.zz.fire.fire(EventType.POP_UP, cc.zz.Popup.TYPE.FACING_SERVER_CONNECTION_ISSUE.id, {});
                    }
                }
            }, 3)
            cc.zz.fire.fire(EventType.POP_UP, cc.zz.Popup.TYPE.FACING_SERVER_CONNECTION_ISSUE.id, {});
        } else {
            if (this.fnError) {
                this.fnError(-1);
                this.fnError = undefined;
            }
            else {
                cc.zz.fire.fire(EventType.POP_UP, cc.zz.Popup.TYPE.NO_SERVER_CONNECTION.id, {});
            }
            cc.zz.fire.fire(EventType.POP_UP, cc.zz.Popup.TYPE.NO_SERVER_CONNECTION.id, {});
            cc.error("Server attempted to reconnect to server, but failed: " + this.connectTimes + "");
        }
    },

    _onmessage: function (msg) {

        
        var data = JSON.parse(msg.data);
        if (data != null && data != undefined) {
            var msgID = parseInt(data[0]);
            var timeStamp = data[1];
            var msgData = data[2];
            cc.zz.utils.realTime = timeStamp;
            if (msgID === 9001) {
                cc.error('Error: ', data);
                cc.zz.fire.fire(msgID.toString(), msgData);
            } else if (msgID === 8003) {
                // cc.log('hearbeat');
            } else {
                cc.zz.fire.fire(msgID.toString(), msgData);
            }
            this.resetCheckHeart();
        }
    },
    send: function (...args) {
        cc.log(args);
        this.socket.send(JSON.stringify(args));
    },

    startCheckHeart: function () {
        this.scheduleOnce(this.sendHeart, this.heartTime)
    },

    resetCheckHeart: function () {
        this.unschedule(this.sendHeart);
        this.startCheckHeart();
    },

    sendHeart: function () {
        this.socket.send(JSON.stringify([8003, []]));
    },

    // TODO: Move to Internet Utility 
    getIpAddress: function (blockchain, network) {
        if (blockchain === 'cocosbcx') {
            if (network === 'privatenet') {
                return "ws://127.0.0.1:8000"
            }
        }

        if (blockchain == 'neo') {
            if (network == 'mainnet') {
                return "wss://neo.blocklords.io:443/backend/";
            }
            else if (network == 'testnet') {
                return "ws://153.92.5.151:8085/";
            }
            else {
                return "ws://localhost:8000/";
            }
        }
        else if (blockchain == 'tron') {
            if (network == 'privatenet') {
                return "ws://127.0.0.1:8000/";//"ws://153.92.5.151:8086/";
            }
            else if (cc.zz.LoginData.getNetType() == 'testnet') {
                return "ws://153.92.5.151:8083/";
            }
            else {
                return "wss://tron.blocklords.io:443/backend/"; // "ws://127.0.0.1:8000/"
            }
        }
        else if (blockchain == 'ethereum') {
            if (network == 'privatenet') {
                return "ws://127.0.0.1:8000/";//"ws://153.92.5.151:8086/";
            }
            else if (network == 'testnet') {
                return "ws://153.92.5.151:8088/";
            }
            else {
                return "ws://153.92.5.151:8087/"; // "ws://127.0.0.1:8000/"
            }
        }

        cc.error('Failed to find Server host of ' + blockchain + ' ' + network + ' server!');
        return 'ws://localhost:8888';
    },
});
