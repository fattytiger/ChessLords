let oneToOneListener = cc.Class({
    ctor:function(){
        this.supportEvent = null
    },
    on:function(eventName,handler,target){
        this[eventName] = { handler:handler,target:target}
    },
    off:function(){
        let oldObj = this[eventName]
        if(oldObj && oldObj.handler && oldObj.handler === handler){
            this[eventName] = null
        }
    },

    dispatchEvent:function(eventName/**/){
        if(this.supportEvent !== null && !this.supportEvent.hasOwnProperty(eventName)){
            cc.error('please add the event into clientEvent.js')
        }
        let objHandler = this[eventName]
        let args = []
        for(let i=1;i<arguments.length;i++){
            args.push(arguments[i])
        }

        if(objHandler.handler){
            objHandler.handler.apply(objHandler.target,args)
        }else{
            cc.log(`not register ${eventName} callback func`)
        }
    },

    setSupportEventList:function(arrSupportEvent){
        if(!(arrSupportEvent instanceof Array)){
            cc.error('supportEvent was not array')
            return false
        }

        this.supportEvent = {}
        for(let i in arrSupportEvent){
            let eventName = arrSupportEvent[i];
            this.supportEvent[eventName] = i
        }
        return true
    }
})

let oneToMultiListener = cc.Class({
    ctor:function(){
        this.handlers = {}
        this.supportEvent = null
    },

    on:function(eventName,handler,target){
        let objHandler = {handler,target}
        let handlerList = this.handlers[eventName]
        if(!handlerList){
            handlerList = []
            this.handlers[eventName] = handlerList
        }

        for(let i =0;i<handlerList.length;i++){
            if(!handlerList[i]){
                handlerList[i] = objHandler
                return i
            }
        }

        handlerList.push(objHandler)
        return handlerList.length
    },

    off:function(eventName,handler,target){
        let handlerList = this.handlers[eventName];

        if (!handlerList) {
            return;
        }

        for (let  i = 0; i < handlerList.length; i++) {
            let oldObj = handlerList[i];
            if (oldObj.handler === handler && (!target || target === oldObj.target)) {
                handlerList.splice(i, 1);
                break;
            }
        }
    },

    dispatchEvent :function(eventName/**/){
        if (this.supportEvent !== null && !this.supportEvent.hasOwnProperty(eventName)) {
            cc.error("please add the event into clientEvent.js");
            return;
        }

        var handlerList = this.handlers[eventName];

        var args = [];
        var i;
        for (i = 1; i < arguments.length; i++) {
            args.push(arguments[i]);
        }

        if (!handlerList) {
            return;
        }

        for (i = 0; i < handlerList.length; i++) {
            var objHandler = handlerList[i];
            if (objHandler.handler) {
                objHandler.handler.apply(objHandler.target, args);
            }
        }
    },
    setSupportEventList: function (arrSupportEvent) {
        if (!(arrSupportEvent instanceof Array)) {
            cc.error("supportEvent was not array");
            return false;
        }

        this.supportEvent = {};
        for (var i in arrSupportEvent) {
            var eventName = arrSupportEvent[i];
            this.supportEvent[eventName] = i;
        }

        return true;
    },
})

let eventListener = {
    getBaseClass:function(type){
        let newEventListener = {}
        if(type === 'multi'){
            newEventListener = oneToMultiListener
        }else{
            newEventListener = oneToOneListener
        }
        return newEventListener
    }
}
module.exports = eventListener