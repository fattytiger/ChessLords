const LoaderManager = require('loaderManager')
const loader = new LoaderManager()

cc.Class({
    extends: cc.Component,

    properties: {
        live: 100,
        stamin: 100,
        Region: cc.Node,
        moveSpeed: 0.2,
        moveDistance: 200,
    },

    judgeRegion() {
        this.maplocation.updateSoliderLocation()
        this.maplocation.rightCityJudgeOthercity('archer')
    },
    restoreRegion() {
        this.maplocation.updateSoliderLocation()
        for (let i = 1; i < 9; i++) {
            cc.find(`Canvas/background/RightCity/archer/fightRegion/region${i}`).active = true
        }
    },

    showRegion(event) {
        if (!this.RegionLock) {
            //clear other action
            this.broKnight.clearAction()
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
            loader.loadMapSpirte(this.node,'archer_red_highlighted')
        } else {
            this.RegionLock = false
            loader.loadMapSpirte(this.node, 'archer_red')
        }
    },
    readyToAttacked(attack){
        this.attackedLock = false
        this.attackedNum  = attack
    },

    onLoad() {
        this.RegionLock   = false
        this.attackedLock = true
        this.nodeAction    = this.node._components[2]
        this.node.on(cc.Node.EventType.MOUSE_ENTER, this.showRegion, this)
        this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.hideRegion, this)
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this)

        cc.find(`Canvas/background/RightCity/knight`).getComponent('rightKnight').broArcher = this
        cc.find('Canvas/background/RightCity/troop').getComponent('rightTroop').broArcher = this
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

    start() {

    },

    // update (dt) {},
});
