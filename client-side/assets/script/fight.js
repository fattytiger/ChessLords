const bcxAdapter = require('bcxAdapter')
// const HttpEvent = require('HttpEvent')
// const http = new HttpEvent()
cc.Class({
    extends: cc.Component,

    properties: {
        FightMap: {
            type: cc.Node,
            default: null
        },
        leftCity: {
            type: cc.Node,
            default: null
        },
        rightCity: {
            type: cc.Node,
            default: null
        },
        bottomCity: {
            type: cc.Node,
            default: null
        },


        // FightTimer: 0,
        // FightFlag: false,

        // TipTimer: 50,
        // TipFlag: false
    },

    //init the region
    // spawnFighticom: function (node, xdistance, ydistance) {
    //     this.FightTimer = 50
    //     let fight = cc.instantiate(this.FightIcon)
    //     this.FightMap.addChild(fight)

    //     if (xdistance > 0) {
    //         if (ydistance > 0) {
    //             fight.setPosition(node.x + (xdistance > 200 ? 100 - (xdistance / 2) : 0), node.y + (ydistance > 200 ? 100 - (ydistance / 2) : 0))
    //         } else if (ydistance == 0) {
    //             fight.setPosition(node.x + (xdistance > 200 ? 100 - (xdistance / 2) : 0), node.y + 100)
    //         } else {
    //             fight.setPosition(node.x + (xdistance > 200 ? 100 - (xdistance / 2) : 0), node.y - (ydistance < -200 ? (ydistance / 2) : -100) + 100)
    //         }
    //     } else if (xdistance == 0) {
    //         if (ydistance > 0) {
    //             fight.setPosition(node.x + 100, node.y + (ydistance > 200 ? 100 - (ydistance / 2) : 0))
    //         } else {
    //             fight.setPosition(node.x + 100, node.y - (ydistance < -200 ? (ydistance / 2) : -100) + 100)
    //         }
    //     } else {
    //         if (ydistance < 0) {
    //             fight.setPosition(node.x - (xdistance < -200 ? (xdistance / 2) - 100 : -200), node.y - (ydistance < -200 ? (ydistance / 2) : -100) + 100)
    //         } else if (ydistance == 0) {
    //             fight.setPosition(node.x - (xdistance < -200 ? (xdistance / 2) - 100 : -200), node.y + 100)
    //         } else {
    //             fight.setPosition(node.x - (xdistance < -200 ? (xdistance / 2) - 100 : -200), node.y + (ydistance > 200 ? 100 - (ydistance / 2) : 0))
    //         }
    //     }
    // },

    // spawnFightTip: function () {
    //     console.log('no')
    //     this.TipTimer = 50
    //     let fightTip = cc.instantiate(this.FightTip)
    //     this.FightMap.addChild(fightTip)
    //     fightTip.setPosition(2000, 1200)
    //     this.TipFlag = true
    // },


    // InitRegin: function () {


    //     for (let i = 0; i < 12; i++) {
    //         for (let j = 0; j < 20; j++) {
    //             let newNode = cc.instantiate(this.BlockRegion)
    //             newNode.setPosition(200 * j, i * 200)
    //             newNode.name = `node${i > 9 ? i : '0' + i}${j > 9 ? j : '0' + j}`
    //             newNode.opacity = 0

    //             this.FightMap.addChild(newNode)
    //             this.touchRegionNodeEvent(newNode, this)
    //         }
    //     }

    // },

    // InitNet: function () {
    //     this.account_name = ''
    //     let self = this
    //     if (bcxAdapter) {
    //         bcxAdapter.initSDK(function (res) {
    //             console.log('initSDK', res)
    //             if (res) {
    //                 bcxAdapter.login(function (res) {
    //                     console.log('login', res)
    //                     console.log(res.account_name)
    //                     self.account_name = res.account_name
    //                     // http.fightConnectServer(res.account_name)
    //                 })
    //             }
    //         })
    //     }
    // },

    //bind the listen event to created node 
    // touchRegionNodeEvent(node, self) {
    //     //bind the Listen Event
    //     self.mouseEnterAction(node, self)

    //     self.mouseLeaveAction(node, self)

    //     self.clickReginEvent(node, self)
    // },


    // //click Regin listening event
    // clickReginEvent: function (node, self) {
    //     node.on('mousedown', function () {
    //         self.moveAction(node, self)
    //     })
    // },


    //listening the mouseleave
    // mouseLeaveAction: function (node, self) {
    //     let mouseOption = require('mouseOption')
    //     let mouse = new mouseOption()
    //     node.on('mouseleave', function () {

    //         //player1
    //         if (node.x == cc.gameSpace.ArcherLocation.x && node.y == cc.gameSpace.ArcherLocation.y) {
    //             mouse.mouseLeaveArcher(node)
    //         } else if (node.x == cc.gameSpace.TroopLocation.x && node.y == cc.gameSpace.TroopLocation.y) {
    //             mouse.mouseLeaveTroop(node)
    //         } else if (node.x == cc.gameSpace.KnightLocation.x && node.y == cc.gameSpace.KnightLocation.y) {
    //             mouse.mouseLeaveKnight(node)
    //         }

    //         //player2
    //         else if (node.x == cc.gameSpace.ArcherLocation2.x && node.y == cc.gameSpace.ArcherLocation2.y) {
    //             mouse.mouseLeaveArcher2(node)
    //         } else if (node.x == cc.gameSpace.TroopLocation2.x && node.y == cc.gameSpace.TroopLocation2.y) {
    //             mouse.mouseLeaveTroop2(node)
    //         } else if (node.x == cc.gameSpace.KnightLocation2.x && node.y == cc.gameSpace.KnightLocation2.y) {
    //             mouse.mouseLeaveKnight2(node)
    //         }

    //         //player3
    //         else if (node.x == cc.gameSpace.ArcherLocation3.x && node.y == cc.gameSpace.ArcherLocation3.y) {
    //             mouse.mouseLeaveArcher3(node)
    //         } else if (node.x == cc.gameSpace.TroopLocation3.x && node.y == cc.gameSpace.TroopLocation3.y) {
    //             mouse.mouseLeaveTroop3(node)
    //         } else if (node.x == cc.gameSpace.KnightLocation3.x && node.y == cc.gameSpace.KnightLocation3.y) {
    //             mouse.mouseLeaveKnight3(node)
    //         }


    //         else {
    //             mouse.mouseLeaveBlock()
    //         }
    //     })
    // },


    //listening the mouseenter
    // mouseEnterAction: function (node, self) {
    //     let mouseOption = require('mouseOption')
    //     let mouse = new mouseOption()
    //     node.on('mouseenter', function () {
    //         // node.opacity = 100

    //         mouse.mouseEnterBottomCity(node)
    //         mouse.mouseEnterLeftCity(node)
    //         mouse.mouseEnterRightCity(node)
    //         //player 1
    //         if (node.x == cc.gameSpace.ArcherLocation.x && node.y == cc.gameSpace.ArcherLocation.y) {
    //             //mouse enter the palyer1 archer
    //             mouse.mouseEnterArcher(node)
    //         } else if (node.x == cc.gameSpace.TroopLocation.x && node.y == cc.gameSpace.TroopLocation.y) {
    //             //mouse enter the palyer1 troop
    //             mouse.mouseEnterTroop(node)
    //         } else if (node.x == cc.gameSpace.KnightLocation.x && node.y == cc.gameSpace.KnightLocation.y) {
    //             //mouse enter the palyer1 knight
    //             mouse.mouseEnterKnight(node)
    //         }


    //         //player2
    //         else if (node.x == cc.gameSpace.ArcherLocation2.x && node.y == cc.gameSpace.ArcherLocation2.y) {
    //             //mouse enter the player2 archer
    //             mouse.mouseEnterArcher2(node)
    //         } else if (node.x == cc.gameSpace.TroopLocation2.x && node.y == cc.gameSpace.TroopLocation2.y) {
    //             //mouse enter the player2 troop
    //             mouse.mouseEnterTroop2(node)
    //         } else if (node.x == cc.gameSpace.KnightLocation2.x && node.y == cc.gameSpace.KnightLocation2.y) {
    //             //mouse enter the palyer1 knight
    //             mouse.mouseEnterKnight2(node)
    //         }

    //         //player3
    //         else if (node.x == cc.gameSpace.ArcherLocation3.x && node.y == cc.gameSpace.ArcherLocation3.y) {
    //             //mouse enter the player2 archer
    //             mouse.mouseEnterArcher3(node)
    //         } else if (node.x == cc.gameSpace.TroopLocation3.x && node.y == cc.gameSpace.TroopLocation3.y) {
    //             //mouse enter the player2 troop
    //             mouse.mouseEnterTroop3(node)
    //         } else if (node.x == cc.gameSpace.KnightLocation3.x && node.y == cc.gameSpace.KnightLocation3.y) {
    //             //mouse enter the palyer1 knight
    //             mouse.mouseEnterKnight3(node)
    //         }



    //         else {
    //             mouse.mouseEnterBlock(node)
    //         }
    //     }, self)
    // },


    //judge which troop was choosed
    // judgeTroopChoosed: function (Troop, Archer, Knight, Troop2, Archer2, Knight2, Troop3, Archer3, Knight3) {

    //     if (Troop) {
    //         cc.gameSpace.chooseArcherPoint = false
    //         cc.gameSpace.chooseKnightPoint = false
    //         cc.gameSpace.chooseTroopPoint = true
    //         cc.gameSpace.chooseArcherPoint2 = false
    //         cc.gameSpace.chooseKnightPoint2 = false
    //         cc.gameSpace.chooseTroopPoint2 = false
    //         cc.gameSpace.chooseArcherPoint3 = false
    //         cc.gameSpace.chooseKnightPoint3 = false
    //         cc.gameSpace.chooseTroopPoint3 = false

    //     } else if (Archer) {
    //         cc.gameSpace.chooseArcherPoint = true
    //         cc.gameSpace.chooseKnightPoint = false
    //         cc.gameSpace.chooseTroopPoint = false
    //         cc.gameSpace.chooseArcherPoint2 = false
    //         cc.gameSpace.chooseKnightPoint2 = false
    //         cc.gameSpace.chooseTroopPoint2 = false
    //         cc.gameSpace.chooseArcherPoint3 = false
    //         cc.gameSpace.chooseKnightPoint3 = false
    //         cc.gameSpace.chooseTroopPoint3 = false
    //     } else if (Knight) {
    //         cc.gameSpace.chooseArcherPoint = false
    //         cc.gameSpace.chooseKnightPoint = true
    //         cc.gameSpace.chooseTroopPoint = false
    //         cc.gameSpace.chooseArcherPoint2 = false
    //         cc.gameSpace.chooseKnightPoint2 = false
    //         cc.gameSpace.chooseTroopPoint2 = false
    //         cc.gameSpace.chooseArcherPoint3 = false
    //         cc.gameSpace.chooseKnightPoint3 = false
    //         cc.gameSpace.chooseTroopPoint3 = false
    //     } else if (Troop2) {
    //         cc.gameSpace.chooseArcherPoint = false
    //         cc.gameSpace.chooseKnightPoint = false
    //         cc.gameSpace.chooseTroopPoint = false
    //         cc.gameSpace.chooseArcherPoint2 = false
    //         cc.gameSpace.chooseKnightPoint2 = false
    //         cc.gameSpace.chooseTroopPoint2 = true
    //         cc.gameSpace.chooseArcherPoint3 = false
    //         cc.gameSpace.chooseKnightPoint3 = false
    //         cc.gameSpace.chooseTroopPoint3 = false
    //     } else if (Archer2) {
    //         cc.gameSpace.chooseArcherPoint = false
    //         cc.gameSpace.chooseKnightPoint = false
    //         cc.gameSpace.chooseTroopPoint = false
    //         cc.gameSpace.chooseArcherPoint2 = true
    //         cc.gameSpace.chooseKnightPoint2 = false
    //         cc.gameSpace.chooseTroopPoint2 = false
    //         cc.gameSpace.chooseArcherPoint3 = false
    //         cc.gameSpace.chooseKnightPoint3 = false
    //         cc.gameSpace.chooseTroopPoint3 = false
    //     } else if (Knight2) {
    //         cc.gameSpace.chooseArcherPoint = false
    //         cc.gameSpace.chooseKnightPoint = false
    //         cc.gameSpace.chooseTroopPoint = false
    //         cc.gameSpace.chooseArcherPoint2 = false
    //         cc.gameSpace.chooseKnightPoint2 = true
    //         cc.gameSpace.chooseTroopPoint2 = false
    //         cc.gameSpace.chooseArcherPoint3 = false
    //         cc.gameSpace.chooseKnightPoint3 = false
    //         cc.gameSpace.chooseTroopPoint3 = false
    //     } else if (Troop3) {
    //         cc.gameSpace.chooseArcherPoint = false
    //         cc.gameSpace.chooseKnightPoint = false
    //         cc.gameSpace.chooseTroopPoint = false
    //         cc.gameSpace.chooseArcherPoint2 = false
    //         cc.gameSpace.chooseKnightPoint2 = false
    //         cc.gameSpace.chooseTroopPoint2 = false
    //         cc.gameSpace.chooseArcherPoint3 = false
    //         cc.gameSpace.chooseKnightPoint3 = false
    //         cc.gameSpace.chooseTroopPoint3 = true
    //     } else if (Archer3) {
    //         cc.gameSpace.chooseArcherPoint = false
    //         cc.gameSpace.chooseKnightPoint = false
    //         cc.gameSpace.chooseTroopPoint = false
    //         cc.gameSpace.chooseArcherPoint2 = false
    //         cc.gameSpace.chooseKnightPoint2 = false
    //         cc.gameSpace.chooseTroopPoint2 = false
    //         cc.gameSpace.chooseArcherPoint3 = true
    //         cc.gameSpace.chooseKnightPoint3 = false
    //         cc.gameSpace.chooseTroopPoint3 = false
    //     } else if (Knight3) {
    //         cc.gameSpace.chooseArcherPoint = false
    //         cc.gameSpace.chooseKnightPoint = false
    //         cc.gameSpace.chooseTroopPoint = false
    //         cc.gameSpace.chooseArcherPoint2 = false
    //         cc.gameSpace.chooseKnightPoint2 = false
    //         cc.gameSpace.chooseTroopPoint2 = false
    //         cc.gameSpace.chooseArcherPoint3 = false
    //         cc.gameSpace.chooseKnightPoint3 = true
    //         cc.gameSpace.chooseTroopPoint3 = false
    //     }

    // },

    // notChooseAll: function () {
    //     console.log('notchose')
    //     cc.gameSpace.chooseTroop = false
    //     cc.gameSpace.chooseArcher = false
    //     cc.gameSpace.chooseKnight = false
    //     cc.gameSpace.chooseTroop2 = false
    //     cc.gameSpace.chooseArcher2 = false
    //     cc.gameSpace.chooseKnight2 = false
    //     cc.gameSpace.chooseTroop3 = false
    //     cc.gameSpace.chooseArcher3 = false
    //     cc.gameSpace.chooseKnight3 = false
    // },




    //perform the troop move
    // moveAction: function (node, self) {
    //     const BottomPlayer = require('bottomPlayer')
    //     const LeftPlayer = require('LeftPlayer')
    //     const RightPlayer = require('RightPlayer')

    //     const player = new BottomPlayer()
    //     const player2 = new LeftPlayer()
    //     const player3 = new RightPlayer()
    //     //judge the troop is choosed
    //     if (cc.gameSpace.chooseTroop) {

    //         self.judgeTroopChoosed(true, false, false, false, false, false, false, false, false)

    //         cc.gameSpace.troopMovePoint = { x: node.x, y: node.y }

    //         if (cc.gameSpace.chooseTroopPoint) {
    //             player.limitTroopMove(node, self)
    //         }
    //     }
    //     //judge the troop2 is choosed
    //     if (cc.gameSpace.chooseTroop2) {
    //         self.judgeTroopChoosed(false, false, false, true, false, false, false, false, false)

    //         cc.gameSpace.troopMovePoint2 = { x: node.x, y: node.y }

    //         if (cc.gameSpace.chooseTroopPoint2) {
    //             player2.limitTroopMove(node, self)
    //         }
    //     }
    //     //judge the troop3 is choosed
    //     if (cc.gameSpace.chooseTroop3) {

    //         self.judgeTroopChoosed(false, false, false, false, false, false, true, false, false)

    //         cc.gameSpace.troopMovePoint3 = { x: node.x, y: node.y }

    //         if (cc.gameSpace.chooseTroopPoint3) {
    //             player3.limitTroopMove(node, self)
    //         }
    //     }





    //     //judge the archer is choosed
    //     if (cc.gameSpace.chooseArcher) {
    //         self.judgeTroopChoosed(false, true, false, false, false, false, false, false, false)

    //         cc.gameSpace.ArcherMovePoint = { x: node.x, y: node.y }

    //         if (cc.gameSpace.chooseArcherPoint) {
    //             player.limitArcherMove(node, self)
    //         }
    //     }

    //     if (cc.gameSpace.chooseArcher2) {
    //         self.judgeTroopChoosed(false, false, false, false, true, false, false, false, false)

    //         cc.gameSpace.ArcherMovePoint2 = { x: node.x, y: node.y }
    //         if (cc.gameSpace.chooseArcherPoint2) {
    //             player2.limitArcherMove(node, self)
    //         }
    //     }
    //     if (cc.gameSpace.chooseArcher3) {
    //         self.judgeTroopChoosed(false, false, false, false, false, false, false, true, false)

    //         cc.gameSpace.ArcherMovePoint3 = { x: node.x, y: node.y }

    //         if (cc.gameSpace.chooseArcherPoint3) {
    //             player3.limitArcherMove(node, self)
    //         }
    //     }



    //     //judge the knight is choosed
    //     if (cc.gameSpace.chooseKnight) {
    //         self.judgeTroopChoosed(false, false, true)

    //         cc.gameSpace.KnightMovePoint = { x: node.x, y: node.y }

    //         if (cc.gameSpace.chooseKnightPoint) {
    //             player.limitKnightMove(node, self)
    //         }
    //     }
    //     if (cc.gameSpace.chooseKnight2) {
    //         self.judgeTroopChoosed(false, false, false, false, false, true, false, false, false)

    //         cc.gameSpace.KnightMovePoint2 = { x: node.x, y: node.y }

    //         if (cc.gameSpace.chooseKnightPoint2) {
    //             player2.limitKnightMove(node, self)
    //         }
    //     }
    //     if (cc.gameSpace.chooseKnight3) {
    //         self.judgeTroopChoosed(false, false, false, false, false, false, false, false, true)

    //         cc.gameSpace.KnightMovePoint3 = { x: node.x, y: node.y }

    //         if (cc.gameSpace.chooseKnightPoint3) {
    //             player3.limitKnightMove(node, self)
    //         }
    //     }


    // },




    // LIFE-CYCLE CALLBACKS:


    onLoad() {




        // cc.gameSpace = {}

        // //player one

        // //flag Troop is choosed
        // cc.gameSpace.chooseTroop = false

        // cc.gameSpace.chooseArcher = false

        // cc.gameSpace.chooseKnight = false

        // //flag Troop have point point place
        // cc.gameSpace.chooseTroopPoint = false

        // cc.gameSpace.chooseArcherPoint = false

        // cc.gameSpace.chooseKnightPoint = false

        // //flag 

        // //flag the troop move point
        // cc.gameSpace.troopMovePoint = { x: 0, y: 0 }

        // cc.gameSpace.ArcherMovePoint = { x: 0, y: 0 }

        // cc.gameSpace.KnightMovePoint = { x: 0, y: 0 }

        // //Troop locations
        // cc.gameSpace.ArcherLocation = { x: 0, y: 0 }

        // cc.gameSpace.TroopLocation = { x: 0, y: 0 }

        // cc.gameSpace.KnightLocation = { x: 0, y: 0 }

        // //City location
        // cc.gameSpace.bottomCityLocation = { x: 0, y: 0 }


        // //player2

        // //flag choosed
        // cc.gameSpace.chooseTroop2 = false

        // cc.gameSpace.chooseArcher2 = false

        // cc.gameSpace.chooseKnight2 = false

        // //choose point
        // cc.gameSpace.chooseTroopPoint2 = false

        // cc.gameSpace.chooseArcherPoint2 = false

        // cc.gameSpace.chooseKnightPoint2 = false

        // //flag the troop move point
        // cc.gameSpace.troopMovePoint2 = { x: 0, y: 0 }

        // cc.gameSpace.ArcherMovePoint2 = { x: 0, y: 0 }

        // cc.gameSpace.KnightMovePoint2 = { x: 0, y: 0 }

        // //player2's troop location
        // cc.gameSpace.ArcherLocation2 = { x: 0, y: 0 }

        // cc.gameSpace.TroopLocation2 = { x: 0, y: 0 }

        // cc.gameSpace.KnightLocation2 = { x: 0, y: 0 }

        // //player2's city location
        // cc.gameSpace.leftCityLocation = { x: 0, y: 0 }



        // //player3

        // //flag choosed
        // cc.gameSpace.chooseTroop3 = false

        // cc.gameSpace.chooseArcher3 = false

        // cc.gameSpace.chooseKnight3 = false

        // //choose point
        // cc.gameSpace.chooseTroopPoint3 = false

        // cc.gameSpace.chooseArcherPoint3 = false

        // cc.gameSpace.chooseKnightPoint3 = false

        // //flag the troop move point
        // cc.gameSpace.troopMovePoint3 = { x: 0, y: 0 }

        // cc.gameSpace.ArcherMovePoint3 = { x: 0, y: 0 }

        // cc.gameSpace.KnightMovePoint3 = { x: 0, y: 0 }

        // //player2's troop location
        // cc.gameSpace.ArcherLocation3 = { x: 0, y: 0 }

        // cc.gameSpace.TroopLocation3 = { x: 0, y: 0 }

        // cc.gameSpace.KnightLocation3 = { x: 0, y: 0 }

        // //player2's city location
        // cc.gameSpace.rightCityLocation = { x: 0, y: 0 }


        // cc.gameSpace.Player1Live = true

        // cc.gameSpace.Player2Live = true

        // cc.gameSpace.Player3Live = true

        this.finalRatio = 1
        this.MaxRatio = 0.5
        this.MinRatio = 1.5
        this.ratioSpeed = 0.05


        this.cameraLeft = -1000
        this.cameraRight = 1000

        this.cameraTop = 600
        this.cameraBottom = -600

        this.cameraInitPosition = {
            x: 0,
            y: 0
        }

        this.cameraFinalPosition = {
            x: 0,
            y: 0
        }


        // this.InitRegin()
        // this.InitNet()
        this.CameraControl()
        // this.node.on('foobar',function(){
        //     console.log('fight receive')
        // })
    },

    judgeCameraRatio(parRatio) {
        let returnRatio = 1
        if (parRatio > this.MinRatio) {
            returnRatio = this.MinRatio
            return returnRatio
        } else if (parRatio < this.MaxRatio) {
            returnRatio = this.MaxRatio
            return returnRatio
        } else {
            return parRatio
        }
    },

    // updateCameraLength() {
    //     this.cameraLeft = -(this.finalRatio * 2000 - 1000)
    //     this.cameraRight = this.finalRatio * 2000 - 1000
    //     this.cameraTop = this.finalRatio * 1200 - 600
    //     this.cameraBottom = -(this.finalRatio * 1200 - 600)

    // },
    updateCameraRatio() {

    },


    CameraControl() {
        let camera = cc.find(`Canvas/Main Camera`).getComponent(cc.Camera)
        this.node.on(cc.Node.EventType.MOUSE_WHEEL, function (event) {
            let scrollY = event._scrollY
            if (scrollY > 0) {
                let cameraNode = cc.find(`Canvas/Main Camera`)
                let changeRatio = camera.zoomRatio += this.ratioSpeed
                this.finalRatio = this.judgeCameraRatio(changeRatio)
                camera.zoomRatio = this.finalRatio
            } else {
                let changeRatio = camera.zoomRatio -= this.ratioSpeed
                this.finalRatio = this.judgeCameraRatio(changeRatio)
                camera.zoomRatio = this.finalRatio
            }
        }, this)

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            let delta = event.touch.getDelta()
            let cameraNode = cc.find(`Canvas/Main Camera`)
            let changex = cameraNode.x -= delta.x
            let changey = cameraNode.y -= delta.y
            this.cameraInitPosition = {
                x: changex,
                y: changey
            }
            this.cameraFinalPosition = {
                x: this.cameraOutRange(this.cameraInitPosition.x, this.cameraInitPosition.y).x,
                y: this.cameraOutRange(this.cameraInitPosition.x, this.cameraInitPosition.y).y
            }
            cameraNode.x = this.cameraFinalPosition.x
            cameraNode.y = this.cameraFinalPosition.y
        }, this)
    },

    cameraOutRange(parX, parY) {
        let finalPosition = { x: 0, y: 0 }
        if (parX > this.cameraRight) {
            if (parY < this.cameraBottom) {
                console.log(this.cameraRight, this.cameraBottom)
                finalPosition = { x: this.cameraRight, y: this.cameraBottom }
                return finalPosition
            } else if (parY > this.cameraTop) {
                finalPosition = { x: this.cameraRight, y: this.cameraTop }
                return finalPosition
            } else {
                finalPosition = { x: this.cameraRight, y: parY }
                
                return finalPosition
            }
        } else if (parX < this.cameraLeft) {
            if (parY < this.cameraBottom) {
                finalPosition = { x: this.cameraLeft, y: this.cameraBottom }
                
                return finalPosition
            } else if (parY > this.cameraTop) {
                finalPosition = { x: this.cameraLeft, y: this.cameraTop }
                
                return finalPosition
            } else {
                finalPosition = { x: this.cameraLeft, y: parY }
                
                return finalPosition
            }
        } else {
            if (parY < this.cameraBottom) {
                finalPosition = { x: parX, y: this.cameraBottom }
                
                return finalPosition
            } else if (parY > this.cameraTop) {
                finalPosition = { x: parX, y: this.cameraTop }
                
                return finalPosition
            } else {
                finalPosition = { x: parX, y: parY }
                
                return finalPosition
            }
        }
    },

    // moveCamera(){
    //     this.node.on(cc.Node.EventType.MOUSE_MOVE,function(){
    //         console.log('move')
    //         this.node.on(cc.Node.EventType.MOUSE_UP,function(){
    //             this.node.off(cc.Node.EventType.MOUSE_MOVE,function(){
    //                 console.log('aa')
    //             },this)
    //         },this)
    //     },this)
    // },

    start() {

    },

    update(dt) {

        //icon animation
        // if (this.FightFlag) {
        //     let fighticon = cc.find('Canvas/background/fightIcon')
        //     fighticon.opacity = fighticon.opacity - (dt * 60) * 2
        //     fighticon.y = fighticon.y - dt * 20
        //     this.FightTimer--
        //     if (this.FightTimer == 0) {

        //         if (fighticon.isValid) {
        //             fighticon.destroy()
        //             this.FightFlag = false
        //         }
        //     }
        // }

        // if (this.TipFlag) {
        //     let tip = cc.find('Canvas/background/FightTip')
        //     this.TipTimer--
        //     if (this.TipTimer == 0) {
        //         if (tip.isValid) {
        //             tip.destroy()
        //             this.TipFlag = false
        //         }
        //     }
        // }

        // if (!cc.gameSpace.Player1Live) {
        //     let player = cc.find('Canvas/background/BottomCity')
        //     if (player.isValid) {
        //         player.active = false
        //     }
        // }

        // if (!cc.gameSpace.Player2Live) {
        //     let player = cc.find('Canvas/background/LeftCity')
        //     if (player.isValid) {
        //         player.active = false
        //     }
        // }

        // if (!cc.gameSpace.Player3Live) {
        //     let player = cc.find('Canvas/background/RightCity')
        //     if (player.isValid) {
        //         player.active = false
        //     }
        // }
    },
});
