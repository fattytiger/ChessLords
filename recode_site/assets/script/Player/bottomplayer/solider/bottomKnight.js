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

    judgeRegion(){
        this.maplocation.updateSoliderLocation()
        this.maplocation.bottomCityJudgeOthercity('knight')
    },
    restoreRegion(){
        this.maplocation.updateSoliderLocation()
        for(let i =1;i< 9 ;i++){
            cc.find(`Canvas/background/BottomCity/knight/fightRegion/region${i}`).active = true
            cc.find(`Canvas/background/BottomCity/knight/anamyRegion/anamy${i}`).active = false
        }
    },

    //
    clearAction(){
        this.chooseSolider(false)
        this.hideRegion()
    },

    showRegion(event){
        if(!this.RegionLock){
            //clear other action 
            this.broArcher.clearAction()
            this.broTroop.clearAction()
            this.Region.active = true
            this.judgeRegion()
        }
    },
    hideRegion(event){
        if(!this.RegionLock){
            this.restoreRegion()
            this.Region.active = false
        }
    },
    onMouseDown(event){
        let mouseType = event.getButton()
        if(mouseType == cc.Event.EventMouse.BUTTON_LEFT){
            this.chooseSolider(true)
            console.log(this.nearHaveBndit)
            if(this.nearHaveBndit == true){
                this.nodeAction.readyToFight(this.targetBandit)
            }
        }
    },

    chooseSolider(isChoose) {
        if (isChoose) {
            this.RegionLock = true
            loader.loadMapSpirte(this.node,'knight_blue_highlighted')
            for (let i = 1; i < 9; i++) {
                cc.find(`Canvas/background/BottomCity/knight/anamyRegion/anamy${i}`).active = false
            }
        } else {
            this.RegionLock = false
            loader.loadMapSpirte(this.node, 'knight_blue')
        }
    },

    // updateLocation(){
    //     this.mapLocation = { x:this.node.parent.x + this.node.x, y:this.node.parent.y + this.node.y }
    // },

    readyToAttacked(attacked){
        this.attackedLock = false
        this.attackedNum  = attacked
    },

    onLoad () {
        this.RegionLock    = false
        this.nearHaveBndit = false
        this.targetBandit  = []
        this.nodeAction    = this.node._components[2]

        this.node.on(cc.Node.EventType.MOUSE_ENTER,this.showRegion,this)
        this.node.on(cc.Node.EventType.MOUSE_LEAVE,this.hideRegion,this)
        this.node.on(cc.Node.EventType.MOUSE_DOWN,this.onMouseDown,this)

        cc.find(`Canvas`).getComponent('mapNodeLocation').KnightBottom = this

        cc.find(`Canvas/background/BottomCity/archer`).getComponent('bottomArcher').broKnight = this
        cc.find('Canvas/background/BottomCity/troop').getComponent('bottomTroop').broKnight = this
    },

    

    moveToRigion(flag){
        this.nodeAction.consumeStamin()
        switch(flag){
            case 1:
                this.node.runAction(cc.moveBy(this.moveSpeed,cc.v2(-this.moveDistance,this.moveDistance)))
                this.maplocation.updateSoliderLocation()
                break
            case 2:
                
                this.node.runAction(cc.moveBy(this.moveSpeed,cc.v2( 0 , this.moveDistance)))  
                this.maplocation.updateSoliderLocation()
                break
            case 3:
                
                this.node.runAction(cc.moveBy(this.moveSpeed,cc.v2( this.moveDistance, this.moveDistance))) 
                this.maplocation.updateSoliderLocation()
                break
            case 4:
                
                this.node.runAction(cc.moveBy(this.moveSpeed,cc.v2( -this.moveDistance, 0 )))
                this.maplocation.updateSoliderLocation()
                break
            case 5:
                
                this.node.runAction(cc.moveBy(this.moveSpeed,cc.v2( this.moveDistance, 0 ))) 
                this.maplocation.updateSoliderLocation()
                break
            case 6:
                    
                this.node.runAction(cc.moveBy(this.moveSpeed,cc.v2( -this.moveDistance, -this.moveDistance)))
                this.maplocation.updateSoliderLocation()
                break
            case 7:
                    
                this.node.runAction(cc.moveBy(this.moveSpeed,cc.v2( 0 , -this.moveDistance )))
                this.maplocation.updateSoliderLocation()
                break
            case 8:
                    
                this.node.runAction(cc.moveBy(this.moveSpeed,cc.v2( this.moveDistance, -this.moveDistance)))
                this.maplocation.updateSoliderLocation()
                break
        }
    },
    

    clickRigion(event,num){
        let moveflag = parseInt(num)
        this.chooseSolider(false)
        this.hideRegion()
        this.moveToRigion(moveflag)
    },

    start () {

    },

    // update (dt) {},
});
