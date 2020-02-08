
cc.Class({
    extends: cc.Component,

    properties: {
        mainCamera: {
            default: null,
            type: cc.Camera
        },
        targetMap:{
            default:null,
            type:cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this)
        this.node.on(cc.Node.EventType.MOUSE_WHEEL, this.mouseWheel, this)
    },

    lockCenter: function () {
        this.mainCamera.node.x = 0
        this.mainCamera.node.y = 0
    },

    getMinRatio:function(){
        return 0.7
    },

    getMaxRatio:function(){
        return 1.00
    },

    getCameraX:function(){
        return this.mainCamera.node.x
    },

    getCameraY:function(){
        return this.mainCamera.node.y
    },

    mouseWheel(event) {
        let scroll = event.getScrollY()

        let currentRatio = this.mainCamera.zoomRatio

        let floatNumber = scroll * 0.0001

        let maxRatio = this.getMaxRatio()
        let minRatio = this.getMinRatio()

        currentRatio += floatNumber

        if(currentRatio < minRatio){
            currentRatio = minRatio
        }

        if(currentRatio > maxRatio){
            currentRatio = maxRatio
        }

        this.applyRatio(currentRatio)
    },

    applyRatio(ratio){

        if(this.getOldLeftCenter(this.getRatio()) === this.mainCamera.node.x){
            this.reachLeft = true
        }

        if(this.getOldRightCenter(this.getRatio()) === this.mainCamera.node.x){
            this.reachRight = true
        }

        if(this.getOldTopCenter(this.getRatio()) === this.mainCamera.node.y){
            this.reachTop = true
        }

        if(this.getOldBottomCenter(this.getRatio()) === this.mainCamera.node.y){
            this.reachBottom = true
        }

        if(this.reachLeft === true){
            let oldLeftCenter = this.getOldLeftCenter(this.getRatio())
            let newLeftCenter = this.getNewLeftCenter(parseFloat(ratio.toFixed(2)))

            let diff = Math.abs((newLeftCenter - oldLeftCenter))

            this.mainCamera.node.x += diff
        }

        if(this.reachRight === true){
            let oldRightCenter = this.getOldRightCenter(this.getRatio())
            let NewRightCenter = this.getNewRightCenter(parseFloat(ratio.toFixed(2)))

            let diff = Math.abs((NewRightCenter - oldRightCenter))

            this.mainCamera.node.x -= diff
        }

        if(this.reachTop === true){
            let oldTopCenter = this.getOldTopCenter(this.getRatio())
            let newTopCneter = this.getNewTopCenter(parseFloat(ratio.toFixed(2)))

            let diff = Math.abs((newTopCneter - oldTopCenter))
            this.mainCamera.node.y -= diff
        }

        if(this.reachBottom === true){
            let oldBottomCenter = this.getOldBottomCenter(this.getRatio())
            let newBottomCenter = this.getNewBottomCenter(parseFloat(ratio.toFixed(2)))

            let diff = Math.abs(newBottomCenter - oldBottomCenter)
            this.mainCamera.node.y += diff
        }

        this.mainCamera.zoomRatio = parseFloat(ratio.toFixed(2))
    },

    getOldLeftCenter:function(oldRatio){
        let curRatio = oldRatio
        let leftWidth = this.getHalfMapWidth()

        let leftCanvas = this.getHalfCanvasWidth()

        return  leftCanvas / curRatio - leftWidth 
    },

    getNewLeftCenter:function(newRatio){
        let curRatio = newRatio
        let leftWidth = this.getHalfMapWidth()

        let leftCanvas = this.getHalfCanvasWidth()

        return  leftCanvas / curRatio - leftWidth 
    },

    getOldRightCenter:function(oldRatio){

        let curRatio = oldRatio
        let rightWidth = this.getHalfMapWidth()

        let rightCanvas = this.getHalfCanvasWidth()

        return  rightWidth  - rightCanvas / curRatio
    },

    getNewRightCenter:function(newRatio){

        let curRatio = newRatio
        let rightWidth = this.getHalfMapWidth()

        let rightCanvas = this.getHalfCanvasWidth()

        return  rightWidth  - rightCanvas / curRatio

    },

    getOldTopCenter:function(oldRatio){

        let curRatio = oldRatio
        let topHeight = this.getHalfMapHeight()

        let topCanavas = this.getHalfCanvasHeight()

        return  topHeight - topCanavas / curRatio
    },

    getNewTopCenter:function(newRatio){

        let curRatio = newRatio
        let topHeight = this.getHalfMapHeight()

        let topCanavas = this.getHalfCanvasHeight()

        return  topHeight - topCanavas / curRatio
    },

    getOldBottomCenter:function(oldRatio){
        let curRatio = oldRatio
        let bottomHeight = this.getHalfMapHeight()

        let bottomCanavas = this.getHalfCanvasHeight()

        return bottomCanavas / curRatio -  bottomHeight
    },

    getNewBottomCenter:function(newRatio){
        let curRatio = newRatio
        let bottomHeight = this.getHalfMapHeight()

        let bottomCanavas = this.getHalfCanvasHeight()

        return bottomCanavas / curRatio -  bottomHeight
    },

    getRatio(){
        return parseFloat(this.mainCamera.zoomRatio.toFixed(2))
    },

    getMapWidth: function () {
        return this.targetMap.width
    },

    getMapHeight: function () {
        return this.targetMap.height
    },

    getHalfMapWidth:function(){
        return Math.round(this.targetMap.width / 2)
    },

    getHalfMapHeight:function(){
        return Math.round(this.targetMap.height / 2)
    },

    getCanvasWidth: function () {
        return cc.Canvas.instance.node.width
    },

    getHalfCanvasWidth:function(){
        return cc.Canvas.instance.node.width/2
    },

    getCanvasHeight: function () {
        return cc.Canvas.instance.node.height
    },

    getHalfCanvasHeight:function(){
        return cc.Canvas.instance.node.height/2
    },

    getLeftMax :function(){
        let curRatio = this.getRatio()
        let leftWidth = this.getHalfMapWidth()

        let leftCanvas = this.getHalfCanvasWidth()

        return   leftCanvas / curRatio - leftWidth 
    },

    getRightMax :function(){
        let curRatio = this.getRatio()
        let rightWidth = this.getHalfMapWidth()

        let rightCanvas = this.getHalfCanvasWidth()

        return  rightWidth  - rightCanvas / curRatio
    },

    getTopMax:function(){
        let curRatio = this.getRatio()
        let topHeight = this.getHalfMapHeight()

        let topCanavas = this.getHalfCanvasHeight()

        return  topHeight - topCanavas / curRatio
    },

    getBottomMax:function(){
        let curRatio = this.getRatio()
        let bottomHeight = this.getHalfMapHeight()

        let bottomCanavas = this.getHalfCanvasHeight()

        return bottomCanavas / curRatio -  bottomHeight
    },

    touchMove: function (event) {

        let delta = event.getDelta()

        //get the camera position at begining
        let currentCameraX = this.mainCamera.node.x 
        let currentCameraY = this.mainCamera.node.y 

        //when hero touch ,get current camera position
        currentCameraX -= delta.x 
        currentCameraY -= delta.y 

        let maxLeft = this.getLeftMax()
        let maxRight = this.getRightMax()
        let maxTop   = this.getTopMax()
        let maxBottom = this.getBottomMax()

        this.reachRight = false
        this.reachLeft = false
        this.reachTop = false
        this.reachBottom = false

        if(currentCameraX < maxLeft){
            currentCameraX = maxLeft
            this.reachLeft = true
        }

        if(currentCameraX > maxRight){
            currentCameraX = maxRight
            this.reachRight = true
        }

        if(currentCameraY > maxTop){
            currentCameraY = maxTop
            this.reachTop = true
        }

        if(currentCameraY < maxBottom){
            currentCameraY = maxBottom
            this.reachBottom = true
        }


        this.applyCameraPosition(currentCameraX,currentCameraY)
    },

    applyCameraPosition: function (posX, posY) {

        this.mainCamera.node.x = posX
        this.mainCamera.node.y = posY
    },
});
