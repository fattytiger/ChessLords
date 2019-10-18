cc.Class({
    extends: cc.Component,

    properties: {
        live:cc.ProgressBar,
        liveNum:500,
    },

    

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.attackedLock = true
        this.attackedNum  = 0
        this.startLiveNum    = this.liveNum
        this.finalLiiveNum  = 0
        this.liveDecreseSpeed   = 0.1
    },

    consumeLive(num){
        this.attackedNum = num
        this.attackedLock = false
        this.finalLiiveNum   = this.startLiveNum - this.attackedNum
    },
    
    checkLive(){
       
        if((this.live.progress *100) <= this.finalLiiveNum){
            this.startLiveNum = this.finalLiiveNum
            this.attackedLock = true
        }
    },

    update (dt) {
        if(!this.attackedLock){
            this.live.progress -= dt * this.liveDecreseSpeed
            this.checkLive()
        }
    },
});
