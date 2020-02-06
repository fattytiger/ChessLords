cc.Class({
    extends: cc.Component,

    properties: {
        realTime: {
            set: function(time) {
                this._svrTime = parseFloat(time);
                var clientStamp = Math.floor((new Date()).valueOf() / 1000);
                this._deltaTime = clientStamp - this._svrTime;
            },
            get: function() {
                return (Math.floor((new Date()).valueOf() / 1000) - this._deltaTime);
            }
        },
    },

    ctor: function() {
        this._svrTime = 0;
        this._deltaTime = 0;
    },
    showTime:function(stamp){
        let h = Math.floor(stamp / 3600);
        let m = Math.floor((stamp % 3600) / 60);
        let s = Math.floor(stamp % 60);
        let str = ""
        if(h>0){
            str = str+h+'h'
        }
        if(m>0){
            str = str+m+'m'
        }
        str = str+s+'s'
        return str;

    }, 
    //保留小数点
    ReservedDecimal:function(num,n){
        return parseInt(num*Math.pow(10,n)+0.5,10)/Math.pow(10,n);
    },
    /**
     * 转换为可用语言代码
     */
    transformLan: function(originLan) {
        if (originLan === 'zh_CN') {
            return 'cn';
        }
        return 'en';
    },

    transDataType:function(data){
        let cur_data = data
        if(typeof cur_data == 'string'){
            cur_data = parseInt(cur_data)
        }else{
            cur_data = cur_data
        }
        return cur_data
    },

    /**
     * 添加点击事件
     */
    addClickEvent: function(node, target, component, handler) {
        var evtHandler = new cc.Component.EventHandler();
        evtHandler.target = target;
        evtHandler.component = component;
        evtHandler.handler = handler;
        var clickEvents = node.getComponent(cc.Button).clickEvents;
        clickEvents.push(evtHandler);
    },
});
