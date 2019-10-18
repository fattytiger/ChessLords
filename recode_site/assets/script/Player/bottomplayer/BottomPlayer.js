const Fighting = require('Fighting')
const NetInfo = require('NetInfo')
const Fight  = new Fighting()
const net = new NetInfo()
// const ws = new WebSocket('ws://127.0.0.1:8000', 'echo-protocol')
module.exports =  cc.Class({
    extends: cc.Component,

    properties: {
        ArcherAvatar: {
            type: cc.Node,
            default: null
        },
        KnightAvatar: {
            type: cc.Node,
            default: null
        },
        TroopAvatar: {
            type: cc.Node,
            default: null
        },
        bottomCityLive: {
            type: cc.ProgressBar,
            default: null
        },
    },
    

    onLoad() {
        //init the ArcherLocation
        this.test()
        this.initCityLocation()
        this.initArcherLocation()
        this.initTroopLocation()
        this.initKnightLocation()
    },

    test(){
        let windowOrigin = cc.view.getVisibleOrigin()
        let windowSize = cc.view.getVisibleSize()
        console.log(windowOrigin,windowSize,'windowOrigin')
        let camera = cc.find('Canvas/Main Camera').getComponent(cc.Camera)
        console.log(camera)
    },


    initCityLocation: function () {
        let bottomcity = cc.find('Canvas/background/BottomCity')
        cc.gameSpace.bottomCityLocation = { x: bottomcity.x - 100, y: bottomcity.y - 100 }
    },

    initArcherLocation: function () {
        let city = cc.find('Canvas/background/BottomCity')
        let cityX = city.x
        let cityY = city.y

        //find the troop node and get the position
        let TroopAvatar = cc.find('Canvas/background/BottomCity/archer')
        let troopX = TroopAvatar.x
        let troopY = TroopAvatar.y

        //find the real location of troop on the map
        let realX = cityX + troopX
        let realY = cityY + troopY

        cc.gameSpace.ArcherLocation = { x: realX - 100, y: realY - 100 }
    },




    initTroopLocation: function () {
        let city = cc.find('Canvas/background/BottomCity')
        let cityX = city.x
        let cityY = city.y

        //find the troop node and get the position
        let TroopAvatar = cc.find('Canvas/background/BottomCity/troop')
        let troopX = TroopAvatar.x
        let troopY = TroopAvatar.y

        //find the real location of troop on the map
        let realX = cityX + troopX
        let realY = cityY + troopY

        cc.gameSpace.TroopLocation = { x: realX - 100, y: realY - 100 }
    },

    initKnightLocation: function () {
        let city = cc.find('Canvas/background/BottomCity')
        let cityX = city.x
        let cityY = city.y

        //find the troop node and get the position
        let TroopAvatar = cc.find('Canvas/background/BottomCity/knight')
        let troopX = TroopAvatar.x
        let troopY = TroopAvatar.y

        //find the real location of troop on the map
        let realX = cityX + troopX
        let realY = cityY + troopY
        cc.gameSpace.KnightLocation = { x: realX - 100, y: realY - 100 }
    },


    //judge the troop is choosed
    isTroopChoose() {
        cc.gameSpace.chooseTroop = true
        cc.gameSpace.chooseArcher = false
        cc.gameSpace.chooseKnight = false

        cc.gameSpace.chooseTroop2 = false
        cc.gameSpace.chooseArcher2 = false
        cc.gameSpace.chooseKnight2 = false

        cc.gameSpace.chooseTroop3 = false
        cc.gameSpace.chooseArcher3 = false
        cc.gameSpace.chooseKnight3 = false
    },

    //judge the knight is choosed
    isKnightChoose() {
        cc.gameSpace.chooseTroop = false
        cc.gameSpace.chooseArcher = false
        cc.gameSpace.chooseKnight = true

        cc.gameSpace.chooseTroop2 = false
        cc.gameSpace.chooseArcher2 = false
        cc.gameSpace.chooseKnight2 = false

        cc.gameSpace.chooseTroop3 = false
        cc.gameSpace.chooseArcher3 = false
        cc.gameSpace.chooseKnight3 = false
    },

    //judge the archer is choosed
    isArcherChoose() {
        cc.gameSpace.chooseTroop = false
        cc.gameSpace.chooseArcher = true
        cc.gameSpace.chooseKnight = false

        cc.gameSpace.chooseTroop2 = false
        cc.gameSpace.chooseArcher2 = false
        cc.gameSpace.chooseKnight2 = false

        cc.gameSpace.chooseTroop3 = false
        cc.gameSpace.chooseArcher3 = false
        cc.gameSpace.chooseKnight3 = false
    },

    


    //fight Bottom city
    fightBottomCity: function (node) {
        let returnFlag = false
        let node0007 = cc.find('Canvas/background/node0007')
        let node0008 = cc.find('Canvas/background/node0008')
        let node0009 = cc.find('Canvas/background/node0009')
        let node0107 = cc.find('Canvas/background/node0107')
        let node0108 = cc.find('Canvas/background/node0108')
        let node0109 = cc.find('Canvas/background/node0109')
        let node0207 = cc.find('Canvas/background/node0207')
        let node0208 = cc.find('Canvas/background/node0208')
        let node0209 = cc.find('Canvas/background/node0209')
        let bottomNode = [node0007, node0008, node0009, node0107, node0108, node0109, node0207, node0208, node0209]
        for (let i = 0; i < bottomNode.length; i++) {
            if (node.x == bottomNode[i].x && node.y == bottomNode[i].y) {
                returnFlag = true
                break
            }
        }
        return returnFlag
    },
    //fight Left city
    fightLeftCity:function(node){
        let returnFlag = false
        let node0801 = cc.find('Canvas/background/node0801')
        let node0802 = cc.find('Canvas/background/node0802')
        let node0803 = cc.find('Canvas/background/node0803')
        let node0901 = cc.find('Canvas/background/node0901')
        let node0902 = cc.find('Canvas/background/node0902')
        let node0903 = cc.find('Canvas/background/node0903')
        let node1001 = cc.find('Canvas/background/node1001')
        let node1002 = cc.find('Canvas/background/node1002')
        let node1003 = cc.find('Canvas/background/node1003')
        let bottomNode = [node0801, node0802, node0803, node0901, node0902, node0903, node1001, node1002, node1003]
        for (let i = 0; i < bottomNode.length; i++) {
            if (node.x == bottomNode[i].x && node.y == bottomNode[i].y) {
                returnFlag = true
                break
            }
        }
        return returnFlag
    },

    fightRightCity:function(node){
        let returnFlag = false
        let node0816 = cc.find('Canvas/background/node0816')
        let node0817 = cc.find('Canvas/background/node0817')
        let node0818 = cc.find('Canvas/background/node0818')
        let node0916 = cc.find('Canvas/background/node0916')
        let node0917 = cc.find('Canvas/background/node0917')
        let node0918 = cc.find('Canvas/background/node0918')
        let node1016 = cc.find('Canvas/background/node1016')
        let node1017 = cc.find('Canvas/background/node1017')
        let node1018 = cc.find('Canvas/background/node1018')
        let bottomNode = [node0816, node0817, node0818, node0916, node0917, node0918, node1016, node1017, node1018]
        for (let i = 0; i < bottomNode.length; i++) {
            if (node.x == bottomNode[i].x && node.y == bottomNode[i].y) {
                returnFlag = true
                break
            }
        }
        return returnFlag
    },


    
    //limit troop move
    limitTroopMove: function (node, self) {
        let troopMoveDistanceX = Math.abs((cc.gameSpace.troopMovePoint.x - cc.gameSpace.TroopLocation.x))
        let troopMoveDistanceY = Math.abs((cc.gameSpace.troopMovePoint.y - cc.gameSpace.TroopLocation.y))
        if (troopMoveDistanceX > 200 || troopMoveDistanceY > 200) {
            console.log('out of limit')
            return
        } else {
            console.log(node.x, node.y)
            this.fightBottomCity(node)
            

            if (node.x == cc.gameSpace.ArcherLocation.x && node.y == cc.gameSpace.ArcherLocation.y) {
                self.spawnFightTip()

            } else if (node.x == cc.gameSpace.KnightLocation.x && node.y == cc.gameSpace.KnightLocation.y) {
                self.spawnFightTip()
            }


            //fight player2
            else if (node.x == cc.gameSpace.TroopLocation2.x && node.y == cc.gameSpace.TroopLocation2.y) {
                //fight troop
                let troopLocationX = cc.gameSpace.TroopLocation.x
                let troopLocationY = cc.gameSpace.TroopLocation.y
                let troopLocation2X = cc.gameSpace.TroopLocation2.x
                let troopLocation2Y = cc.gameSpace.TroopLocation2.y

                let xdistance = troopLocationX - troopLocation2X
                let ydistance = troopLocationY - troopLocation2Y

                self.spawnFighticom(cc.gameSpace.TroopLocation, xdistance, ydistance)
                self.FightFlag = true
                Fight.Troop2Atacked(xdistance,ydistance)

            } else if (node.x == cc.gameSpace.KnightLocation2.x && node.y == cc.gameSpace.KnightLocation2.y) {
                //fight knight2
                let troopLocationX = cc.gameSpace.TroopLocation.x
                let troopLocationY = cc.gameSpace.TroopLocation.y
                let knightLocation2X = cc.gameSpace.KnightLocation2.x
                let knightLocation2Y = cc.gameSpace.KnightLocation2.y

                let xdistance = troopLocationX - knightLocation2X
                let ydistance = troopLocationY - knightLocation2Y

                self.spawnFighticom(cc.gameSpace.TroopLocation, xdistance, ydistance)

                self.FightFlag = true

                Fight.Knight2Atacked(xdistance, ydistance)
            } else if (node.x == cc.gameSpace.ArcherLocation2.x && node.y == cc.gameSpace.ArcherLocation2.y) {
                //fight archer
                let troopLocationX = cc.gameSpace.TroopLocation.x
                let troopLocationY = cc.gameSpace.TroopLocation.y
                let ArcherLocation2X = cc.gameSpace.ArcherLocation2.x
                let ArcherLocation2Y = cc.gameSpace.ArcherLocation2.y

                let xdistance = troopLocationX - ArcherLocation2X
                let ydistance = troopLocationY - ArcherLocation2Y

                self.spawnFighticom(cc.gameSpace.TroopLocation, xdistance, ydistance)

                self.FightFlag = true

                Fight.Archer2Atacked(xdistance, ydistance)
            }


            //fight player 3
            else if (node.x == cc.gameSpace.TroopLocation3.x && node.y == cc.gameSpace.TroopLocation3.y) {
                //fight troop
                let troopLocationX = cc.gameSpace.TroopLocation.x
                let troopLocationY = cc.gameSpace.TroopLocation.y
                let TroopLocation3X = cc.gameSpace.TroopLocation3.x
                let TroopLocation3Y = cc.gameSpace.TroopLocation3.y

                let xdistance = troopLocationX - TroopLocation3X
                let ydistance = troopLocationY - TroopLocation3Y

                self.spawnFighticom(cc.gameSpace.TroopLocation, xdistance, ydistance)

                self.FightFlag = true

                Fight.Troop3Atacked(xdistance, ydistance)
            } else if (node.x == cc.gameSpace.KnightLocation3.x && node.y == cc.gameSpace.KnightLocation3.y) {
                //fight troop
                let troopLocationX = cc.gameSpace.TroopLocation.x
                let troopLocationY = cc.gameSpace.TroopLocation.y
                let knightLocation3X = cc.gameSpace.KnightLocation3.x
                let knightLocation3Y = cc.gameSpace.KnightLocation3.y

                let xdistance = troopLocationX - knightLocation3X
                let ydistance = troopLocationY - knightLocation3Y

                self.spawnFighticom(cc.gameSpace.TroopLocation, xdistance, ydistance)

                self.FightFlag = true

                Fight.Knight3Atacked(xdistance, ydistance)
            } else if (node.x == cc.gameSpace.ArcherLocation3.x && node.y == cc.gameSpace.ArcherLocation3.y) {
                //fight archer
                let troopLocationX = cc.gameSpace.TroopLocation.x
                let troopLocationY = cc.gameSpace.TroopLocation.y
                let ArcherLocation3X = cc.gameSpace.ArcherLocation3.x
                let ArcherLocation3Y = cc.gameSpace.ArcherLocation3.y

                let xdistance = troopLocationX - ArcherLocation3X
                let ydistance = troopLocationY - ArcherLocation3Y

                self.spawnFighticom(cc.gameSpace.TroopLocation, xdistance, ydistance)

                self.FightFlag = true

                Fight.Archer3Atacked(xdistance, ydistance)
            } else{
                if(this.fightBottomCity(node)){
                    self.spawnFightTip()
                }else if(this.fightLeftCity(node)){
                    Fight.leftcityLoseLive()
                }else if(this.fightRightCity(node)){
                    Fight.rightcityLoseLive()
                }
                else{
                    this.TroopAction(false,troopMoveDistanceX,troopMoveDistanceY)
                }
            }


        }
    },

    //limit the knight move
    limitKnightMove: function (node, self) {
        let knightMoveDistanceX = Math.abs(cc.gameSpace.KnightMovePoint.x - cc.gameSpace.KnightLocation.x)
        let knightMoveDistanceY = Math.abs(cc.gameSpace.KnightMovePoint.y - cc.gameSpace.KnightLocation.y)

        if (knightMoveDistanceX > 200 || knightMoveDistanceY > 200) {
            console.log('knight out of limit')
            return
        } else {
            this.fightBottomCity(node, self)

            if (node.x == cc.gameSpace.TroopLocation.x && node.y == cc.gameSpace.TroopLocation.y) {
                self.spawnFightTip()
            } else if (node.x == cc.gameSpace.ArcherLocation.x && node.y == cc.gameSpace.ArcherLocation.y) {

                self.spawnFightTip()

            }



            //fight player2
            else if (node.x == cc.gameSpace.TroopLocation2.x && node.y == cc.gameSpace.TroopLocation2.y) {
                //fight troop
                let troopLocationX = cc.gameSpace.KnightLocation.x
                let troopLocationY = cc.gameSpace.KnightLocation.y
                let troopLocation2X = cc.gameSpace.TroopLocation2.x
                let troopLocation2Y = cc.gameSpace.TroopLocation2.y

                let xdistance = troopLocationX - troopLocation2X
                let ydistance = troopLocationY - troopLocation2Y

                self.spawnFighticom(cc.gameSpace.KnightLocation, xdistance, ydistance)

                self.FightFlag = true

                Fight.Troop2Atacked(xdistance,ydistance)
            } else if (node.x == cc.gameSpace.KnightLocation2.x && node.y == cc.gameSpace.KnightLocation2.y) {
                //fight troop
                let troopLocationX = cc.gameSpace.KnightLocation.x
                let troopLocationY = cc.gameSpace.KnightLocation.y
                let knightLocation2X = cc.gameSpace.KnightLocation2.x
                let knightLocation2Y = cc.gameSpace.KnightLocation2.y

                let xdistance = troopLocationX - knightLocation2X
                let ydistance = troopLocationY - knightLocation2Y

                self.spawnFighticom(cc.gameSpace.KnightLocation, xdistance, ydistance)

                self.FightFlag = true

                Fight.Knight2Atacked(xdistance,ydistance)
            } else if (node.x == cc.gameSpace.ArcherLocation2.x && node.y == cc.gameSpace.ArcherLocation2.y) {
                //fight archer
                let troopLocationX = cc.gameSpace.KnightLocation.x
                let troopLocationY = cc.gameSpace.KnightLocation.y
                let ArcherLocation2X = cc.gameSpace.ArcherLocation2.x
                let ArcherLocation2Y = cc.gameSpace.ArcherLocation2.y

                let xdistance = troopLocationX - ArcherLocation2X
                let ydistance = troopLocationY - ArcherLocation2Y

                self.spawnFighticom(cc.gameSpace.KnightLocation, xdistance, ydistance)

                self.FightFlag = true

                Fight.Archer2Atacked(xdistance,ydistance)
            }


            //fight player 3
            else if (node.x == cc.gameSpace.TroopLocation3.x && node.y == cc.gameSpace.TroopLocation3.y) {
                //fight troop
                let troopLocationX = cc.gameSpace.KnightLocation.x
                let troopLocationY = cc.gameSpace.KnightLocation.y
                let TroopLocation3X = cc.gameSpace.TroopLocation3.x
                let TroopLocation3Y = cc.gameSpace.TroopLocation3.y

                let xdistance = troopLocationX - TroopLocation3X
                let ydistance = troopLocationY - TroopLocation3Y

                self.spawnFighticom(cc.gameSpace.KnightLocation, xdistance, ydistance)

                self.FightFlag = true

                Fight.Troop3Atacked(xdistance,ydistance)
            } else if (node.x == cc.gameSpace.KnightLocation3.x && node.y == cc.gameSpace.KnightLocation3.y) {
                //fight troop
                let troopLocationX = cc.gameSpace.KnightLocation.x
                let troopLocationY = cc.gameSpace.KnightLocation.y
                let knightLocation3X = cc.gameSpace.KnightLocation3.x
                let knightLocation3Y = cc.gameSpace.KnightLocation3.y

                let xdistance = troopLocationX - knightLocation3X
                let ydistance = troopLocationY - knightLocation3Y

                self.spawnFighticom(cc.gameSpace.KnightLocation, xdistance, ydistance)

                self.FightFlag = true

                Fight.Knight3Atacked(xdistance,ydistance)
            } else if (node.x == cc.gameSpace.ArcherLocation3.x && node.y == cc.gameSpace.ArcherLocation3.y) {
                //fight archer
                let troopLocationX = cc.gameSpace.KnightLocation.x
                let troopLocationY = cc.gameSpace.KnightLocation.y
                let ArcherLocation3X = cc.gameSpace.ArcherLocation3.x
                let ArcherLocation3Y = cc.gameSpace.ArcherLocation3.y

                let xdistance = troopLocationX - ArcherLocation3X
                let ydistance = troopLocationY - ArcherLocation3Y

                self.spawnFighticom(cc.gameSpace.KnightLocation, xdistance, ydistance)

                self.FightFlag = true

                Fight.Archer3Atacked(xdistance,ydistance)
            }



            else {
                if(this.fightBottomCity(node)){
                    //fight yourself city
                    self.spawnFightTip()
                    
                }else if(this.fightLeftCity(node)){
                    Fight.leftcityLoseLive()
                }else if(this.fightRightCity(node)){
                    Fight.rightcityLoseLive()
                }
                else{
                    this.KnightAction()
                }
            }
        }

    },

    //limit the archer move
    limitArcherMove: function (node, self) {
        let archerMoveDistanceX = Math.abs(cc.gameSpace.ArcherMovePoint.x - cc.gameSpace.ArcherLocation.x)
        let archerMoveDistanceY = Math.abs(cc.gameSpace.ArcherMovePoint.y - cc.gameSpace.ArcherLocation.y)

        if (archerMoveDistanceX > 200 || archerMoveDistanceY > 200) {
            console.log('archer out limit')
            return
        } else {

            this.fightBottomCity(node, self)
            //judge obstacle or enemy or self
            if (node.x == cc.gameSpace.TroopLocation.x && node.y == cc.gameSpace.TroopLocation.y) {

                self.spawnFightTip()

            } else if (node.x == cc.gameSpace.KnightLocation.x && node.y == cc.gameSpace.KnightLocation.y) {

                self.spawnFightTip()

            }

            //fight player2
            else if (node.x == cc.gameSpace.TroopLocation2.x && node.y == cc.gameSpace.TroopLocation2.y) {
                //fight troop
                let troopLocationX = cc.gameSpace.ArcherLocation.x
                let troopLocationY = cc.gameSpace.ArcherLocation.y
                let troopLocation2X = cc.gameSpace.TroopLocation2.x
                let troopLocation2Y = cc.gameSpace.TroopLocation2.y

                let xdistance = troopLocationX - troopLocation2X
                let ydistance = troopLocationY - troopLocation2Y

                self.spawnFighticom(cc.gameSpace.ArcherLocation, xdistance, ydistance)

                self.FightFlag = true

                Fight.Troop2Atacked(xdistance,ydistance)
            } else if (node.x == cc.gameSpace.KnightLocation2.x && node.y == cc.gameSpace.KnightLocation2.y) {
                //fight knight
                let troopLocationX = cc.gameSpace.ArcherLocation.x
                let troopLocationY = cc.gameSpace.ArcherLocation.y
                let knightLocation2X = cc.gameSpace.KnightLocation2.x
                let knightLocation2Y = cc.gameSpace.KnightLocation2.y

                let xdistance = troopLocationX - knightLocation2X
                let ydistance = troopLocationY - knightLocation2Y

                self.spawnFighticom(cc.gameSpace.ArcherLocation, xdistance, ydistance)

                self.FightFlag = true

                Fight.Knight2Atacked(xdistance,ydistance)
            } else if (node.x == cc.gameSpace.ArcherLocation2.x && node.y == cc.gameSpace.ArcherLocation2.y) {
                //fight archer
                let troopLocationX = cc.gameSpace.ArcherLocation.x
                let troopLocationY = cc.gameSpace.ArcherLocation.y
                let ArcherLocation2X = cc.gameSpace.ArcherLocation2.x
                let ArcherLocation2Y = cc.gameSpace.ArcherLocation2.y

                let xdistance = troopLocationX - ArcherLocation2X
                let ydistance = troopLocationY - ArcherLocation2Y

                self.spawnFighticom(cc.gameSpace.ArcherLocation, xdistance, ydistance)

                self.FightFlag = true

                Fight.Archer2Atacked(xdistance,ydistance)
            }

            //fight player 3
            else if (node.x == cc.gameSpace.TroopLocation3.x && node.y == cc.gameSpace.TroopLocation3.y) {
                //fight troop
                let troopLocationX = cc.gameSpace.ArcherLocation.x
                let troopLocationY = cc.gameSpace.ArcherLocation.y
                let TroopLocation3X = cc.gameSpace.TroopLocation3.x
                let TroopLocation3Y = cc.gameSpace.TroopLocation3.y

                let xdistance = troopLocationX - TroopLocation3X
                let ydistance = troopLocationY - TroopLocation3Y

                self.spawnFighticom(cc.gameSpace.ArcherLocation, xdistance, ydistance)

                self.FightFlag = true

                Fight.Troop3Atacked(xdistance,ydistance)
            } else if (node.x == cc.gameSpace.KnightLocation3.x && node.y == cc.gameSpace.KnightLocation3.y) {
                //fight troop
                let troopLocationX = cc.gameSpace.ArcherLocation.x
                let troopLocationY = cc.gameSpace.ArcherLocation.y
                let knightLocation3X = cc.gameSpace.KnightLocation3.x
                let knightLocation3Y = cc.gameSpace.KnightLocation3.y

                let xdistance = troopLocationX - knightLocation3X
                let ydistance = troopLocationY - knightLocation3Y

                self.spawnFighticom(cc.gameSpace.ArcherLocation, xdistance, ydistance)

                self.FightFlag = true

                Fight.Knight3Atacked(xdistance,ydistance)
            } else if (node.x == cc.gameSpace.ArcherLocation3.x && node.y == cc.gameSpace.ArcherLocation3.y) {
                //fight archer
                let troopLocationX = cc.gameSpace.ArcherLocation.x
                let troopLocationY = cc.gameSpace.ArcherLocation.y
                let ArcherLocation3X = cc.gameSpace.ArcherLocation3.x
                let ArcherLocation3Y = cc.gameSpace.ArcherLocation3.y

                let xdistance = troopLocationX - ArcherLocation3X
                let ydistance = troopLocationY - ArcherLocation3Y

                self.spawnFighticom(cc.gameSpace.ArcherLocation, xdistance, ydistance)

                self.FightFlag = true

                Fight.Archer3Atacked(xdistance,ydistance)
            }

            else {
                if(this.fightBottomCity(node)){
                    self.spawnFightTip()
                }else if(this.fightRightCity(node)){
                    Fight.rightcityLoseLive()
                }else if(this.fightLeftCity(node)){
                    Fight.leftcityLoseLive()
                }        
                else{
                    this.ArcherAction()
                }
            }
        }
    },


    netTroopAction:function(xdistance,ydistance){
        console.log('send server')
        ws.send(JSON.stringify(net.bottomTroopMove(xdistance,ydistance)))
    },

    TroopAction: function (net = false,x = 0,y = 0) {
        if (cc.gameSpace.chooseTroop && cc.gameSpace.chooseTroopPoint && net == false) {
            //find the troop parent => city  because the toop is binded on the city
            let city = cc.find('Canvas/background/BottomCity')
            let cityX = city.x
            let cityY = city.y

            //find the troop node and get the position
            let TroopAvatar = cc.find('Canvas/background/BottomCity/troop')
            let troopX = TroopAvatar.x
            let troopY = TroopAvatar.y

            //find the real location of troop on the map
            let realX = cityX + troopX
            let realY = cityY + troopY

            //get the move point
            let moveX = cc.gameSpace.troopMovePoint.x
            let moveY = cc.gameSpace.troopMovePoint.y

            //start move
            let distanceX = moveX - realX + 100
            let distanceY = moveY - realY + 100

            let moveTo = cc.moveBy(0.5, cc.v2(distanceX, distanceY))
            cc.gameSpace.TroopLocation.x = moveX
            cc.gameSpace.TroopLocation.y = moveY

            // this.netTroopAction(distanceX,distanceY)
            
            return TroopAvatar.runAction(moveTo)
        }
        if(net == true){
            let TroopAvatar = cc.find('Canvas/background/BottomCity/troop')

            let move = cc.moveBy(0.5,x,y)
            return TroopAvatar.runAction(move)
        }
    },

    ArcherAction: function () {
        if (cc.gameSpace.chooseArcher && cc.gameSpace.chooseArcherPoint) {
            //find the troop parent => city  because the toop is binded on the city
            

            let city = cc.find('Canvas/background/BottomCity')
            let cityX = city.x
            let cityY = city.y

            //find the troop node and get the position
            let TroopAvatar = cc.find('Canvas/background/BottomCity/archer')
            let troopX = TroopAvatar.x
            let troopY = TroopAvatar.y

            //find the real location of troop on the map
            let realX = cityX + troopX
            let realY = cityY + troopY

            //get the move point
            let moveX = cc.gameSpace.ArcherMovePoint.x
            let moveY = cc.gameSpace.ArcherMovePoint.y

            //start move
            let moveTo = cc.moveBy(0.5, cc.v2(moveX - realX + 100, moveY - realY + 100)).easing(cc.easeIn(1.0))
            cc.gameSpace.ArcherLocation.x = moveX
            cc.gameSpace.ArcherLocation.y = moveY
            return TroopAvatar.runAction(moveTo)
        }

    },

    KnightAction: function () {
        if (cc.gameSpace.chooseKnight && cc.gameSpace.chooseKnightPoint) {

            console.log('troopAction')
            //find the troop parent => city  because the toop is binded on the city
            let city = cc.find('Canvas/background/BottomCity')
            let cityX = city.x
            let cityY = city.y

            //find the troop node and get the position
            let TroopAvatar = cc.find('Canvas/background/BottomCity/knight')
            let troopX = TroopAvatar.x
            let troopY = TroopAvatar.y

            //find the real location of troop on the map
            let realX = cityX + troopX
            let realY = cityY + troopY

            //get the move point
            let moveX = cc.gameSpace.KnightMovePoint.x
            let moveY = cc.gameSpace.KnightMovePoint.y

            //start move
            let moveTo = cc.moveBy(0.5, cc.v2(moveX - realX + 100, moveY - realY + 100)).easing(cc.easeIn(1.0))
            cc.gameSpace.KnightLocation.x = moveX
            cc.gameSpace.KnightLocation.y = moveY
            return TroopAvatar.runAction(moveTo)
        }
    },
    start() {

    },
    update(dt) { },
});
