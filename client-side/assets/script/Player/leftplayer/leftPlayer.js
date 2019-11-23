const Fighting = require('Fighting')
const Fight = new Fighting()
const HttpEvent = require('HttpEvent')
const httpEvent = new HttpEvent()

cc.Class({
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
        leftCityLive:{
            type:cc.ProgressBar,
            default:null
        },
    },

    onLoad() {
        this.initCityLocation()
        this.initArcherLocation()
        this.initTroopLocation()
        this.initKnightLocation()
    },

    initCityLocation: function () {
        let leftCity = cc.find('Canvas/background/LeftCity')
        cc.gameSpace.leftCityLocation = { x: leftCity.x - 100, y: leftCity.y - 100 }
    },

    initArcherLocation: function () {
        let city = cc.find('Canvas/background/LeftCity')
        let cityX = city.x
        let cityY = city.y

        //find the troop node and get the position
        let TroopAvatar = cc.find('Canvas/background/LeftCity/archer')
        let troopX = TroopAvatar.x
        let troopY = TroopAvatar.y

        //find the real location of troop on the map
        let realX = cityX + troopX
        let realY = cityY + troopY

        cc.gameSpace.ArcherLocation2 = { x: realX - 100, y: realY - 100 }
    },

    initTroopLocation: function () {
        let city = cc.find('Canvas/background/LeftCity')
        let cityX = city.x
        let cityY = city.y

        //find the troop node and get the position
        let TroopAvatar = cc.find('Canvas/background/LeftCity/troop')
        let troopX = TroopAvatar.x
        let troopY = TroopAvatar.y

        //find the real location of troop on the map
        let realX = cityX + troopX
        let realY = cityY + troopY

        cc.gameSpace.TroopLocation2 = { x: realX - 100, y: realY - 100 }
        console.log(cc.gameSpace.TroopLocation2)
    },

    initKnightLocation: function () {
        let city = cc.find('Canvas/background/LeftCity')
        let cityX = city.x
        let cityY = city.y

        //find the troop node and get the position
        let TroopAvatar = cc.find('Canvas/background/LeftCity/knight')
        let troopX = TroopAvatar.x
        let troopY = TroopAvatar.y

        //find the real location of troop on the map
        let realX = cityX + troopX
        let realY = cityY + troopY
        cc.gameSpace.KnightLocation2 = { x: realX - 100, y: realY - 100 }
    },

    isTroopChoose() {
        cc.gameSpace.chooseTroop = false
        cc.gameSpace.chooseArcher = false
        cc.gameSpace.chooseKnight = false

        cc.gameSpace.chooseTroop2 = true
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
        cc.gameSpace.chooseKnight = false

        cc.gameSpace.chooseTroop2 = false
        cc.gameSpace.chooseArcher2 = false
        cc.gameSpace.chooseKnight2 = true

        cc.gameSpace.chooseTroop3 = false
        cc.gameSpace.chooseArcher3 = false
        cc.gameSpace.chooseKnight3 = false
    },

    //judge the archer is choosed
    isArcherChoose() {
        console.log('archer choosed')
        cc.gameSpace.chooseTroop = false
        cc.gameSpace.chooseArcher = false
        cc.gameSpace.chooseKnight = false

        cc.gameSpace.chooseTroop2 = false
        cc.gameSpace.chooseArcher2 = true
        cc.gameSpace.chooseKnight2 = false

        cc.gameSpace.chooseTroop3 = false
        cc.gameSpace.chooseArcher3 = false
        cc.gameSpace.chooseKnight3 = false
    },

    notChooseAll: function () {
        console.log('notchooseall')
        cc.gameSpace.chooseTroop = false
        cc.gameSpace.chooseArcher = false
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




    limitTroopMove: function (node, self) {
        let troopMoveDistanceX = Math.abs((cc.gameSpace.troopMovePoint2.x - cc.gameSpace.TroopLocation2.x))
        let troopMoveDistanceY = Math.abs((cc.gameSpace.troopMovePoint2.y - cc.gameSpace.TroopLocation2.y))
        if (troopMoveDistanceX > 200 || troopMoveDistanceY > 200) {
            console.log('out of limit')
            return
        } else {
            if (node.x == cc.gameSpace.ArcherLocation2.x && node.y == cc.gameSpace.ArcherLocation2.y) {

                self.spawnFightTip()

            } else if (node.x == cc.gameSpace.KnightLocation2.x && node.y == cc.gameSpace.KnightLocation2.y) {

                self.spawnFightTip()
            } 
            //fight player1
            else if (node.x == cc.gameSpace.TroopLocation.x && node.y == cc.gameSpace.TroopLocation.y) {
                //fight troop
                let troopLocationX = cc.gameSpace.TroopLocation2.x
                let troopLocationY = cc.gameSpace.TroopLocation2.y
                let troopLocation2X = cc.gameSpace.TroopLocation.x
                let troopLocation2Y = cc.gameSpace.TroopLocation.y

                let xdistance = troopLocationX - troopLocation2X
                let ydistance = troopLocationY - troopLocation2Y

                self.spawnFighticom(cc.gameSpace.TroopLocation2, xdistance, ydistance)

                self.FightFlag = true

                Fight.TroopAtacked(xdistance,ydistance)
            } else if (node.x == cc.gameSpace.KnightLocation.x && node.y == cc.gameSpace.KnightLocation.y) {
                //fight troop
                let troopLocationX = cc.gameSpace.TroopLocation2.x
                let troopLocationY = cc.gameSpace.TroopLocation2.y
                let knightLocation2X = cc.gameSpace.KnightLocation.x
                let knightLocation2Y = cc.gameSpace.KnightLocation.y

                let xdistance = troopLocationX - knightLocation2X
                let ydistance = troopLocationY - knightLocation2Y

                self.spawnFighticom(cc.gameSpace.TroopLocation2, xdistance, ydistance)

                self.FightFlag = true

                Fight.KnightAtacked(xdistance,ydistance)
            } else if (node.x == cc.gameSpace.ArcherLocation.x && node.y == cc.gameSpace.ArcherLocation.y) {
                //fight archer
                let troopLocationX = cc.gameSpace.TroopLocation2.x
                let troopLocationY = cc.gameSpace.TroopLocation2.y
                let ArcherLocation2X = cc.gameSpace.ArcherLocation.x
                let ArcherLocation2Y = cc.gameSpace.ArcherLocation.y

                let xdistance = troopLocationX - ArcherLocation2X
                let ydistance = troopLocationY - ArcherLocation2Y

                self.spawnFighticom(cc.gameSpace.TroopLocation2, xdistance, ydistance)

                self.FightFlag = true

                Fight.ArcherAtacked(xdistance,ydistance)
            }


            //fight player 3
            else if (node.x == cc.gameSpace.TroopLocation3.x && node.y == cc.gameSpace.TroopLocation3.y) {
                //fight troop
                let troopLocationX = cc.gameSpace.TroopLocation2.x
                let troopLocationY = cc.gameSpace.TroopLocation2.y
                let TroopLocation3X = cc.gameSpace.TroopLocation3.x
                let TroopLocation3Y = cc.gameSpace.TroopLocation3.y

                let xdistance = troopLocationX - TroopLocation3X
                let ydistance = troopLocationY - TroopLocation3Y

                self.spawnFighticom(cc.gameSpace.TroopLocation2, xdistance, ydistance)

                self.FightFlag = true
                console.log('troop 2 fight troop 3')

                Fight.Troop3Atacked(xdistance,ydistance)
            } else if (node.x == cc.gameSpace.KnightLocation3.x && node.y == cc.gameSpace.KnightLocation3.y) {
                //fight troop
                let troopLocationX = cc.gameSpace.TroopLocation2.x
                let troopLocationY = cc.gameSpace.TroopLocation2.y
                let knightLocation3X = cc.gameSpace.KnightLocation3.x
                let knightLocation3Y = cc.gameSpace.KnightLocation3.y

                let xdistance = troopLocationX - knightLocation3X
                let ydistance = troopLocationY - knightLocation3Y

                self.spawnFighticom(cc.gameSpace.TroopLocation2, xdistance, ydistance)

                self.FightFlag = true

                Fight.Knight3Atacked(xdistance,ydistance)
            } else if (node.x == cc.gameSpace.ArcherLocation3.x && node.y == cc.gameSpace.ArcherLocation3.y) {
                //fight archer
                let troopLocationX = cc.gameSpace.TroopLocation2.x
                let troopLocationY = cc.gameSpace.TroopLocation2.y
                let ArcherLocation3X = cc.gameSpace.ArcherLocation3.x
                let ArcherLocation3Y = cc.gameSpace.ArcherLocation3.y

                let xdistance = troopLocationX - ArcherLocation3X
                let ydistance = troopLocationY - ArcherLocation3Y

                self.spawnFighticom(cc.gameSpace.TroopLocation2, xdistance, ydistance)

                self.FightFlag = true

                Fight.Archer3Atacked(xdistance,ydistance)
            }
            else {
                if(this.fightLeftCity(node)){
                    self.spawnFightTip()
                }else if(this.fightRightCity(node)){
                    Fight.rightcityLoseLive()
                }else if(this.fightBottomCity(node)){
                    Fight.bottomcityLoseLive()
                }else {
                    this.TroopAction()
                }
            }

        }
    },


    limitKnightMove: function (node, self) {
        let knightMoveDistanceX = Math.abs(cc.gameSpace.KnightMovePoint2.x - cc.gameSpace.KnightLocation2.x)
        let knightMoveDistanceY = Math.abs(cc.gameSpace.KnightMovePoint2.y - cc.gameSpace.KnightLocation2.y)

        if (knightMoveDistanceX > 200 || knightMoveDistanceY > 200) {
            console.log('knight out of limit')
            return
        } else {
            if (node.x == cc.gameSpace.TroopLocation2.x && node.y == cc.gameSpace.TroopLocation2.y) {

                self.spawnFightTip()

            } else if (node.x == cc.gameSpace.ArcherLocation2.x && node.y == cc.gameSpace.ArcherLocation2.y) {

                self.spawnFightTip()

            } 

            //fight player1
            else if (node.x == cc.gameSpace.TroopLocation.x && node.y == cc.gameSpace.TroopLocation.y) {
                //fight troop
                let troopLocationX = cc.gameSpace.KnightLocation2.x
                let troopLocationY = cc.gameSpace.KnightLocation2.y
                let troopLocation2X = cc.gameSpace.TroopLocation.x
                let troopLocation2Y = cc.gameSpace.TroopLocation.y

                let xdistance = troopLocationX - troopLocation2X
                let ydistance = troopLocationY - troopLocation2Y

                self.spawnFighticom(cc.gameSpace.KnightLocation2, xdistance, ydistance)

                self.FightFlag = true

                Fight.TroopAtacked(xdistance,ydistance)
            } else if (node.x == cc.gameSpace.KnightLocation.x && node.y == cc.gameSpace.KnightLocation.y) {
                //fight troop
                let troopLocationX = cc.gameSpace.KnightLocation2.x
                let troopLocationY = cc.gameSpace.KnightLocation2.y
                let knightLocation2X = cc.gameSpace.KnightLocation.x
                let knightLocation2Y = cc.gameSpace.KnightLocation.y

                let xdistance = troopLocationX - knightLocation2X
                let ydistance = troopLocationY - knightLocation2Y

                self.spawnFighticom(cc.gameSpace.KnightLocation2, xdistance, ydistance)

                self.FightFlag = true

                Fight.KnightAtacked(xdistance,ydistance)
            } else if (node.x == cc.gameSpace.ArcherLocation.x && node.y == cc.gameSpace.ArcherLocation.y) {
                //fight archer
                let troopLocationX = cc.gameSpace.KnightLocation2.x
                let troopLocationY = cc.gameSpace.KnightLocation2.y
                let ArcherLocation2X = cc.gameSpace.ArcherLocation.x
                let ArcherLocation2Y = cc.gameSpace.ArcherLocation.y

                let xdistance = troopLocationX - ArcherLocation2X
                let ydistance = troopLocationY - ArcherLocation2Y

                self.spawnFighticom(cc.gameSpace.KnightLocation2, xdistance, ydistance)

                self.FightFlag = true

                Fight.ArcherAtacked(xdistance,ydistance)
            }


            //fight player 3
            else if (node.x == cc.gameSpace.TroopLocation3.x && node.y == cc.gameSpace.TroopLocation3.y) {
                //fight troop
                let troopLocationX = cc.gameSpace.KnightLocation2.x
                let troopLocationY = cc.gameSpace.KnightLocation2.y
                let TroopLocation3X = cc.gameSpace.TroopLocation3.x
                let TroopLocation3Y = cc.gameSpace.TroopLocation3.y

                let xdistance = troopLocationX - TroopLocation3X
                let ydistance = troopLocationY - TroopLocation3Y

                self.spawnFighticom(cc.gameSpace.KnightLocation2, xdistance, ydistance)

                self.FightFlag = true

                Fight.Troop3Atacked(xdistance,ydistance)
            } else if (node.x == cc.gameSpace.KnightLocation3.x && node.y == cc.gameSpace.KnightLocation3.y) {
                //fight troop
                let troopLocationX = cc.gameSpace.KnightLocation2.x
                let troopLocationY = cc.gameSpace.KnightLocation2.y
                let knightLocation3X = cc.gameSpace.KnightLocation3.x
                let knightLocation3Y = cc.gameSpace.KnightLocation3.y

                let xdistance = troopLocationX - knightLocation3X
                let ydistance = troopLocationY - knightLocation3Y

                self.spawnFighticom(cc.gameSpace.KnightLocation2, xdistance, ydistance)

                self.FightFlag = true

                Fight.Knight3Atacked(xdistance,ydistance)
            } else if (node.x == cc.gameSpace.ArcherLocation3.x && node.y == cc.gameSpace.ArcherLocation3.y) {
                //fight archer
                let troopLocationX = cc.gameSpace.KnightLocation2.x
                let troopLocationY = cc.gameSpace.KnightLocation2.y
                let ArcherLocation3X = cc.gameSpace.ArcherLocation3.x
                let ArcherLocation3Y = cc.gameSpace.ArcherLocation3.y

                let xdistance = troopLocationX - ArcherLocation3X
                let ydistance = troopLocationY - ArcherLocation3Y

                self.spawnFighticom(cc.gameSpace.KnightLocation2, xdistance, ydistance)

                self.FightFlag = true

                Fight.Archer3Atacked(xdistance,ydistance)
            }

            else {
                if(this.fightLeftCity(node)){
                    self.spawnFightTip()
                }else if(this.fightBottomCity(node)){
                    Fight.bottomcityLoseLive()
                }else if(this.fightRightCity(node)){
                    Fight.rightcityLoseLive()
                }else {
                    this.KnightAction()
                }
            }
        }
    },



    limitArcherMove: function (node, self) {
        let archerMoveDistanceX = Math.abs(cc.gameSpace.ArcherMovePoint2.x - cc.gameSpace.ArcherLocation2.x)
        let archerMoveDistanceY = Math.abs(cc.gameSpace.ArcherMovePoint2.y - cc.gameSpace.ArcherLocation2.y)

        if (archerMoveDistanceX > 200 || archerMoveDistanceY > 200) {
            console.log('archer out limit')
            return
        } else {
            //judge obstacle or enemy or self
            if (node.x == cc.gameSpace.TroopLocation2.x && node.y == cc.gameSpace.TroopLocation2.y) {

                self.spawnFightTip()

            } else if (node.x == cc.gameSpace.KnightLocation2.x && node.y == cc.gameSpace.KnightLocation2.y) {

                self.spawnFightTip()

            } 

            //fight player1
            else if (node.x == cc.gameSpace.TroopLocation.x && node.y == cc.gameSpace.TroopLocation.y) {
                //fight troop
                let troopLocationX = cc.gameSpace.ArcherLocation2.x
                let troopLocationY = cc.gameSpace.ArcherLocation2.y
                let troopLocation2X = cc.gameSpace.TroopLocation.x
                let troopLocation2Y = cc.gameSpace.TroopLocation.y

                let xdistance = troopLocationX - troopLocation2X
                let ydistance = troopLocationY - troopLocation2Y

                self.spawnFighticom(cc.gameSpace.ArcherLocation2, xdistance, ydistance)

                self.FightFlag = true

                Fight.TroopAtacked(xdistance,ydistance)
            } else if (node.x == cc.gameSpace.KnightLocation.x && node.y == cc.gameSpace.KnightLocation.y) {
                //fight troop
                let troopLocationX = cc.gameSpace.ArcherLocation2.x
                let troopLocationY = cc.gameSpace.ArcherLocation2.y
                let knightLocation2X = cc.gameSpace.KnightLocation.x
                let knightLocation2Y = cc.gameSpace.KnightLocation.y

                let xdistance = troopLocationX - knightLocation2X
                let ydistance = troopLocationY - knightLocation2Y

                self.spawnFighticom(cc.gameSpace.ArcherLocation2, xdistance, ydistance)

                self.FightFlag = true

                Fight.KnightAtacked(xdistance,ydistance)
            } else if (node.x == cc.gameSpace.ArcherLocation.x && node.y == cc.gameSpace.ArcherLocation.y) {
                //fight archer
                let troopLocationX = cc.gameSpace.ArcherLocation2.x
                let troopLocationY = cc.gameSpace.ArcherLocation2.y
                let ArcherLocation2X = cc.gameSpace.ArcherLocation.x
                let ArcherLocation2Y = cc.gameSpace.ArcherLocation.y

                let xdistance = troopLocationX - ArcherLocation2X
                let ydistance = troopLocationY - ArcherLocation2Y

                self.spawnFighticom(cc.gameSpace.ArcherLocation2, xdistance, ydistance)

                self.FightFlag = true

                Fight.ArcherAtacked(xdistance,ydistance)
            }


            //fight player 3
            else if (node.x == cc.gameSpace.TroopLocation3.x && node.y == cc.gameSpace.TroopLocation3.y) {
                //fight troop
                let troopLocationX = cc.gameSpace.ArcherLocation2.x
                let troopLocationY = cc.gameSpace.ArcherLocation2.y
                let TroopLocation3X = cc.gameSpace.TroopLocation3.x
                let TroopLocation3Y = cc.gameSpace.TroopLocation3.y

                let xdistance = troopLocationX - TroopLocation3X
                let ydistance = troopLocationY - TroopLocation3Y

                self.spawnFighticom(cc.gameSpace.ArcherLocation2, xdistance, ydistance)

                self.FightFlag = true

                Fight.Troop3Atacked(xdistance,ydistance)
            } else if (node.x == cc.gameSpace.KnightLocation3.x && node.y == cc.gameSpace.KnightLocation3.y) {
                //fight troop
                let troopLocationX = cc.gameSpace.ArcherLocation2.x
                let troopLocationY = cc.gameSpace.ArcherLocation2.y
                let knightLocation3X = cc.gameSpace.KnightLocation3.x
                let knightLocation3Y = cc.gameSpace.KnightLocation3.y

                let xdistance = troopLocationX - knightLocation3X
                let ydistance = troopLocationY - knightLocation3Y

                self.spawnFighticom(cc.gameSpace.ArcherLocation2, xdistance, ydistance)

                self.FightFlag = true

                Fight.Knight3Atacked(xdistance,ydistance)
            } else if (node.x == cc.gameSpace.ArcherLocation3.x && node.y == cc.gameSpace.ArcherLocation3.y) {
                //fight archer
                let troopLocationX = cc.gameSpace.ArcherLocation2.x
                let troopLocationY = cc.gameSpace.ArcherLocation2.y
                let ArcherLocation3X = cc.gameSpace.ArcherLocation3.x
                let ArcherLocation3Y = cc.gameSpace.ArcherLocation3.y

                let xdistance = troopLocationX - ArcherLocation3X
                let ydistance = troopLocationY - ArcherLocation3Y

                self.spawnFighticom(cc.gameSpace.ArcherLocation2, xdistance, ydistance)

                self.FightFlag = true

                Fight.Archer3Atacked(xdistance,ydistance)
            }


            else {
                if(this.fightLeftCity(node)){
                    self.spawnFightTip()
                }else if(this.fightBottomCity(node)){
                    Fight.bottomcityLoseLive()
                }else if (this.fightRightCity(node)){
                    Fight.rightcityLoseLive()
                }else {
                    this.ArcherAction()
                }
            }
        }
    },




    TroopAction: function () {


        if (cc.gameSpace.chooseTroop2 && cc.gameSpace.chooseTroopPoint2) {
            //find the troop parent => city  because the toop is binded on the city


            let city = cc.find('Canvas/background/LeftCity')
            let cityX = city.x
            let cityY = city.y

            //find the troop node and get the position
            let TroopAvatar = cc.find('Canvas/background/LeftCity/troop')
            let troopX = TroopAvatar.x
            let troopY = TroopAvatar.y

            //find the real location of troop on the map
            let realX = cityX + troopX
            let realY = cityY + troopY

            //get the move point
            let moveX = cc.gameSpace.troopMovePoint2.x
            let moveY = cc.gameSpace.troopMovePoint2.y

            //start move
            let moveTo = cc.moveBy(0.5, cc.v2(moveX - realX + 100, moveY - realY + 100))
            cc.gameSpace.TroopLocation2.x = moveX
            cc.gameSpace.TroopLocation2.y = moveY

            return TroopAvatar.runAction(moveTo)
        }
    },

    KnightAction: function () {

        if (cc.gameSpace.chooseKnight2 && cc.gameSpace.chooseKnightPoint2) {

            console.log('troopAction')
            //find the troop parent => city  because the toop is binded on the city
            let city = cc.find('Canvas/background/LeftCity')
            let cityX = city.x
            let cityY = city.y

            //find the troop node and get the position
            let TroopAvatar = cc.find('Canvas/background/LeftCity/knight')
            let troopX = TroopAvatar.x
            let troopY = TroopAvatar.y

            //find the real location of troop on the map
            let realX = cityX + troopX
            let realY = cityY + troopY

            //get the move point
            let moveX = cc.gameSpace.KnightMovePoint2.x
            let moveY = cc.gameSpace.KnightMovePoint2.y

            //start move
            let moveTo = cc.moveBy(0.5, cc.v2(moveX - realX + 100, moveY - realY + 100))
            cc.gameSpace.KnightLocation2.x = moveX
            cc.gameSpace.KnightLocation2.y = moveY
            return TroopAvatar.runAction(moveTo)
        }
    },

    ArcherAction: function () {

        if (cc.gameSpace.chooseArcher2 && cc.gameSpace.chooseArcherPoint2) {
            //find the troop parent => city  because the toop is binded on the city
            let city = cc.find('Canvas/background/LeftCity')
            let cityX = city.x
            let cityY = city.y

            //find the troop node and get the position
            let TroopAvatar = cc.find('Canvas/background/LeftCity/archer')
            let troopX = TroopAvatar.x
            let troopY = TroopAvatar.y

            //find the real location of troop on the map
            let realX = cityX + troopX
            let realY = cityY + troopY

            //get the move point
            let moveX = cc.gameSpace.ArcherMovePoint2.x
            let moveY = cc.gameSpace.ArcherMovePoint2.y

            //start move
            let moveTo = cc.moveBy(0.5, cc.v2(moveX - realX + 100, moveY - realY + 100))
            cc.gameSpace.ArcherLocation2.x = moveX
            cc.gameSpace.ArcherLocation2.y = moveY
            return TroopAvatar.runAction(moveTo)
        }

    },


    start() {

    },

    update(dt) { },
});
