cc.Class({
    extends: cc.Component,

    properties: {
        live:cc.ProgressBar,
        stamin:cc.ProgressBar,

        //solider property
        staminNum:100,
        liveNum:100,

        attack:10,
        spendStaminNum:10,
    },

    onLoad () {
        this.staminLock     = true
        this.startStaminNum = this.staminNum
        this.finalStaminNum = 0
        
        this.attackedLock = true
        this.attackedNum  = 0
        this.startLiveNum    = this.liveNum
        this.finalLiiveNum   = 0

        this.staminDecreseSpeed = 0.1
        this.liveDecreseSpeed   = 0.1
    },


    readyToFight(target){
        this.status.startFight(this.node,this.attack,target)
    },

    //attacked
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






    //stamin move
    consumeStamin(){
        this.staminLock  = false
        this.finalStaminNum = this.startStaminNum - this.spendStaminNum
    },
    checkStamin(){
        if((this.stamin.progress * 100) <= this.finalStaminNum){
            this.startStaminNum = this.finalStaminNum
            this.staminLock     = true
        }
    },
    update (dt) {
        //consume the stamin
        if(!this.staminLock){
            this.stamin.progress -= dt * this.staminDecreseSpeed
            this.checkStamin()
        }
        if(!this.attackedLock){
            this.live.progress -= dt * this.liveDecreseSpeed
            this.checkLive()
        }
        //decrese the live
    },
});
