const LoaderManager = require('loaderManager')
const loader = new LoaderManager()

cc.Class({
    extends: cc.Component,

    properties: {
        liveNum:100,
        staminNum:100,
        Region: cc.Node,
        moveSpeed: 0.2,
        moveDistance: 200,
        live:cc.ProgressBar,
        stamin:cc.ProgressBar
    },


    readyToAttacked(attack){
        this.attackedLock = false
        this.attackedNum  = attack
    },



    judgeRegion() {
        this.maplocation.updateSoliderLocation()
        this.maplocation.leftCityJudgeOthercity('knight')
    },
    restoreRegion() {
        this.maplocation.updateSoliderLocation()
        for (let i = 1; i < 9; i++) {
            cc.find(`Canvas/background/LeftCity/knight/fightRegion/region${i}`).active = true
        }
    },

    showRegion(event) {
        if (!this.RegionLock) {
            //clear other action
            this.broArcher.clearAction()
            this.broTroop.clearAction()
            this.Region.active = true
            this.judgeRegion()
        }
    },
    hideRegion(event) {
        if (!this.RegionLock) {
            this.restoreRegion()
            this.Region.active = false
        }
    },
    onMouseDown(event) {
        let mouseType = event.getButton()
        if (mouseType == cc.Event.EventMouse.BUTTON_LEFT) {
            //selected the attack
            if(this.attackedLock){
                this.chooseSolider(true)
            }else{
                this.nodeAction.consumeLive(this.attackedNum)
            }
        }
    },


    chooseSolider(isChoose) {
        if (isChoose) {
            this.RegionLock = true
            loader.loadMapSpirte(this.node,'knight_blue_highlighted')
        } else {
            this.RegionLock = false
            loader.loadMapSpirte(this.node,'knight_blue')
        }
    },

    onLoad() {
        this.RegionLock   = false
        this.attackedLock = true
        this.nodeAction    = this.node._components[2]

        
        this.node.on(cc.Node.EventType.MOUSE_ENTER, this.showRegion, this)
        this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.hideRegion, this)
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this)

        cc.find(`Canvas/background/LeftCity/archer`).getComponent('leftArcher').broKnight = this
        cc.find('Canvas/background/LeftCity/troop').getComponent('leftTroop').broKnight = this

    },


    clearAction(){
        this.chooseSolider(false)
        this.hideRegion()
    },



    moveToRigion(flag) {
        switch (flag) {
            case 1:   
                this.node.runAction(cc.moveBy(this.moveSpeed, cc.v2(-this.moveDistance, this.moveDistance)))
                this.maplocation.updateSoliderLocation()
                break
            case 2:
                
                this.node.runAction(cc.moveBy(this.moveSpeed, cc.v2(0, this.moveDistance)))
                this.maplocation.updateSoliderLocation()
                break
            case 3:
                
                this.node.runAction(cc.moveBy(this.moveSpeed, cc.v2(this.moveDistance, this.moveDistance)))
                this.maplocation.updateSoliderLocation()
                break
            case 4:
                
                this.node.runAction(cc.moveBy(this.moveSpeed, cc.v2(-this.moveDistance, 0)))
                this.maplocation.updateSoliderLocation()
                break
            case 5:

                this.node.runAction(cc.moveBy(this.moveSpeed, cc.v2(this.moveDistance, 0)))
                this.maplocation.updateSoliderLocation()
                break
            case 6:

                this.node.runAction(cc.moveBy(this.moveSpeed, cc.v2(-this.moveDistance, -this.moveDistance)))
                this.maplocation.updateSoliderLocation()
                break
            case 7:

                this.node.runAction(cc.moveBy(this.moveSpeed, cc.v2(0, -this.moveDistance)))
                this.maplocation.updateSoliderLocation()
                break

            case 8:

                this.node.runAction(cc.moveBy(this.moveSpeed, cc.v2(this.moveDistance, -this.moveDistance)))
                this.maplocation.updateSoliderLocation()
                break

        }
    },


    clickRigion(event, num) {
        let moveflag = parseInt(num)
        this.chooseSolider(false)
        this.hideRegion()
        this.moveToRigion(moveflag)
    },
});
