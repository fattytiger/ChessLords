const LoaderManager = require('loaderManager')
const loader = new LoaderManager()

cc.Class({
    extends: cc.Component,

    properties: {
        Region: cc.Node,
        moveSpeed: 0.2,
        moveDistance: 200,
        
        //solider property
        attack:10,
        spendStamin:10,
        
    },





    judgeRegion() {
        this.maplocation.updateSoliderLocation()
        this.maplocation.bottomCityJudgeOthercity('archer')
    },
    restoreRegion() {
        this.maplocation.updateSoliderLocation()
        this.nearHaveBndit = false
        for (let i = 1; i < 9; i++) {
            cc.find(`Canvas/background/BottomCity/archer/fightRegion/region${i}`).active = true
            cc.find(`Canvas/background/BottomCity/archer/anamyRegion/anamy${i}`).active = false
        }
    },

    showRegion(event) {
        if (!this.RegionLock) {
            //clear other action
            this.broKnight.clearAction()
            this.broTroop.clearAction()
            this.Region.active = true
            this.judgeRegion()
            console.log(this.nearHaveBndit)
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
            this.chooseSolider(true)
            if(this.nearHaveBndit == true){
                this.nodeAction.readyToFight(this.targetBandit)
            }
        }
    },

    readyToAttacked(attacked){
        this.attackedLock = false
        this.attackedNum  = attacked
    },


    chooseSolider(isChoose) {
        if (isChoose) {
            this.RegionLock = true
            loader.loadMapSpirte(this.node,'archer_red_highlighted')
            for (let i = 1; i < 9; i++) {
                cc.find(`Canvas/background/BottomCity/archer/anamyRegion/anamy${i}`).active = false
            }
        } else {
            this.RegionLock = false
            loader.loadMapSpirte(this.node,'archer_red')
        }
    },

    onLoad() {
        this.RegionLock    = false
        this.nearHaveBndit = false
        this.targetBandit  = []
        this.nodeAction    = this.node._components[2]

        this.node.on(cc.Node.EventType.MOUSE_ENTER, this.showRegion,  this)
        this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.hideRegion,  this)
        this.node.on(cc.Node.EventType.MOUSE_DOWN,  this.onMouseDown, this)

        cc.find(`Canvas`).getComponent('mapNodeLocation').ArcherBottom = this

        cc.find(`Canvas/background/BottomCity/knight`).getComponent('bottomKnight').broArcher = this
        cc.find('Canvas/background/BottomCity/troop').getComponent('bottomTroop').broArcher = this
    },


    clearAction(){
        this.chooseSolider(false)
        this.hideRegion()
    },



    moveToRigion(flag) {
        this.nodeAction.consumeStamin()
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


    // clickAnamy(event ,num){
    //     let anamyflag = parseInt(num)
    //     console.log(anamyflag)
    //     this.node.dispatchEvent(new cc.Event.EventCustom('foobar',true))
    // },




    start() {

    },

    // update (dt) {},
});
