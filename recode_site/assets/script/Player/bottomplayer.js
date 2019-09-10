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
        }
    },

    onLoad() {
        //init the ArcherLocation
        this.initCityLocation()
        this.initArcherLocation()
        this.initTroopLocation()
        this.initKnightLocation()
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


    //limit troop move
    limitTroopMove: function (node, self) {
        let troopMoveDistanceX = Math.abs((cc.gameSpace.troopMovePoint.x - cc.gameSpace.TroopLocation.x))
        let troopMoveDistanceY = Math.abs((cc.gameSpace.troopMovePoint.y - cc.gameSpace.TroopLocation.y))
        if (troopMoveDistanceX > 200 || troopMoveDistanceY > 200) {
            console.log('out of limit')
            return
        } else {
            if (node.x == cc.gameSpace.ArcherLocation.x && node.y == cc.gameSpace.ArcherLocation.y) {
                self.spawnFightTip()

            } else if (node.x == cc.gameSpace.KnightLocation.x && node.y == cc.gameSpace.KnightLocation.y) {
                self.spawnFightTip()


            } else if (node.x == cc.gameSpace.bottomCityLocation.x && node.y == cc.gameSpace.bottomCityLocation.y) {

                console.log('fight the bottom city')
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

                this.troopFightTroop2(xdistance, ydistance)
            } else if (node.x == cc.gameSpace.KnightLocation2.x && node.y == cc.gameSpace.KnightLocation2.y) {
                //fight troop
                let troopLocationX = cc.gameSpace.TroopLocation.x
                let troopLocationY = cc.gameSpace.TroopLocation.y
                let knightLocation2X = cc.gameSpace.KnightLocation2.x
                let knightLocation2Y = cc.gameSpace.KnightLocation2.y

                let xdistance = troopLocationX - knightLocation2X
                let ydistance = troopLocationY - knightLocation2Y

                self.spawnFighticom(cc.gameSpace.TroopLocation, xdistance, ydistance)

                self.FightFlag = true

                this.troopFightKnight2(xdistance, ydistance)
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

                this.troopFightArcher2(xdistance, ydistance)
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

                this.troopFightTroop3(xdistance, ydistance)
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

                this.troopFightKnight3(xdistance, ydistance)
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

                this.troopFightArcher3(xdistance, ydistance)
            }
            else {
                this.TroopAction()
            }
        }
    },

    troopFightTroop2: function (xdistance,ydistance) {
        //find the troop node and get the position
        this.notChooseAll()

        this.avatarLoseLive('troop2', 0.5)
        let ArcherAvatar = cc.find('Canvas/background/LeftCity/troop')
        if (xdistance > 0) {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, -200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                let moveTo = cc.moveBy(0.5, -200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                let moveTo = cc.moveBy(0.5, -200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else if (xdistance == 0) {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, 0, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance < 0) {
                let moveTo = cc.moveBy(0.5, 0, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, 200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                let moveTo = cc.moveBy(0.5, 200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                let moveTo = cc.moveBy(0.5, 200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        }
    },

    troopFightKnight2: function (xdistance,ydistance) {
        //find the troop node and get the position
        this.notChooseAll()

        this.avatarLoseLive('knight2', 0.5)
        let ArcherAvatar = cc.find('Canvas/background/LeftCity/knight')
        if (xdistance > 0) {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, -200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                let moveTo = cc.moveBy(0.5, -200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                let moveTo = cc.moveBy(0.5, -200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else if (xdistance == 0) {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, 0, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance < 0) {
                let moveTo = cc.moveBy(0.5, 0, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, 200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                let moveTo = cc.moveBy(0.5, 200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                let moveTo = cc.moveBy(0.5, 200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        }

    },
    troopFightArcher2: function (xdistance,ydistance) {
        //find the troop node and get the position
        this.notChooseAll()

        this.avatarLoseLive('archer2', 0.5)
        let ArcherAvatar = cc.find('Canvas/background/LeftCity/archer')
        if (xdistance > 0) {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, -200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                let moveTo = cc.moveBy(0.5, -200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                let moveTo = cc.moveBy(0.5, -200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else if (xdistance == 0) {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, 0, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance < 0) {
                let moveTo = cc.moveBy(0.5, 0, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, 200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                let moveTo = cc.moveBy(0.5, 200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                let moveTo = cc.moveBy(0.5, 200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        }
    },

    troopFightTroop3: function (xdistance,ydistance) {
        this.notChooseAll()

        this.avatarLoseLive('troop3', 0.5)
        let ArcherAvatar = cc.find('Canvas/background/RightCity/troop')
        if (xdistance > 0) {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, -200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                let moveTo = cc.moveBy(0.5, -200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                let moveTo = cc.moveBy(0.5, -200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else if (xdistance == 0) {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, 0, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance < 0) {
                let moveTo = cc.moveBy(0.5, 0, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, 200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                let moveTo = cc.moveBy(0.5, 200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                let moveTo = cc.moveBy(0.5, 200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        }

    },
    troopFightKnight3: function (xdistance,ydistance) {
        this.notChooseAll()

        this.avatarLoseLive('knight3', 0.5)
        let ArcherAvatar = cc.find('Canvas/background/RightCity/knight')
        if (xdistance > 0) {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, -200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                let moveTo = cc.moveBy(0.5, -200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                let moveTo = cc.moveBy(0.5, -200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else if (xdistance == 0) {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, 0, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance < 0) {
                let moveTo = cc.moveBy(0.5, 0, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, 200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                let moveTo = cc.moveBy(0.5, 200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                let moveTo = cc.moveBy(0.5, 200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        }
    },
    troopFightArcher3: function (xdistance,ydistance) {
        this.notChooseAll()

        this.avatarLoseLive('archer3', 0.5)
        let ArcherAvatar = cc.find('Canvas/background/RightCity/archer')
        if (xdistance > 0) {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, -200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                let moveTo = cc.moveBy(0.5, -200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                let moveTo = cc.moveBy(0.5, -200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else if (xdistance == 0) {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, 0, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance < 0) {
                let moveTo = cc.moveBy(0.5, 0, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, 200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                let moveTo = cc.moveBy(0.5, 200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                let moveTo = cc.moveBy(0.5, 200, 200)
                return ArcherAvatar.runAction(moveTo)
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
            if (node.x == cc.gameSpace.TroopLocation.x && node.y == cc.gameSpace.TroopLocation.y) {
                self.spawnFightTip()
            } else if (node.x == cc.gameSpace.ArcherLocation.x && node.y == cc.gameSpace.ArcherLocation.y) {

                self.spawnFightTip()

            } else if (node.x == cc.gameSpace.bottomCityLocation.x && node.y == cc.gameSpace.bottomCityLocation.y) {
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

                this.knightFightTroop2(xdistance, ydistance)
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

                this.knightFightKnight2(xdistance, ydistance)
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

                this.knightFightArcher2(xdistance, ydistance)
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

                this.knightFightTroop3(xdistance, ydistance)
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

                this.knightFightKnight3(xdistance, ydistance)
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

                this.knightFightArcher3(xdistance, ydistance)
            }



            else {
                this.KnightAction()
            }
        }

    },
    knightFightTroop2:function(xdistance,ydistance){
        this.notChooseAll()

        this.avatarLoseLive('troop2', 0.5)
        let ArcherAvatar = cc.find('Canvas/background/LeftCity/troop')
        if (xdistance > 0) {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, -200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                let moveTo = cc.moveBy(0.5, -200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                let moveTo = cc.moveBy(0.5, -200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else if (xdistance == 0) {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, 0, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance < 0) {
                let moveTo = cc.moveBy(0.5, 0, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, 200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                let moveTo = cc.moveBy(0.5, 200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                let moveTo = cc.moveBy(0.5, 200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        }
    },
    knightFightKnight2:function(xdistance,ydistance){
        this.notChooseAll()

        this.avatarLoseLive('knight2', 0.5)
        let ArcherAvatar = cc.find('Canvas/background/LeftCity/knight')
        if (xdistance > 0) {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, -200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                let moveTo = cc.moveBy(0.5, -200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                let moveTo = cc.moveBy(0.5, -200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else if (xdistance == 0) {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, 0, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance < 0) {
                let moveTo = cc.moveBy(0.5, 0, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, 200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                let moveTo = cc.moveBy(0.5, 200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                let moveTo = cc.moveBy(0.5, 200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        }

    },
    knightFightArcher2:function(xdistance,ydistance){
        this.notChooseAll()

        this.avatarLoseLive('archer2', 0.5)
        let ArcherAvatar = cc.find('Canvas/background/LeftCity/archer')
        if (xdistance > 0) {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, -200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                let moveTo = cc.moveBy(0.5, -200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                let moveTo = cc.moveBy(0.5, -200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else if (xdistance == 0) {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, 0, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance < 0) {
                let moveTo = cc.moveBy(0.5, 0, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, 200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                let moveTo = cc.moveBy(0.5, 200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                let moveTo = cc.moveBy(0.5, 200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        }
    },
    knightFightTroop3:function(xdistance,ydistance){
        this.notChooseAll()

        this.avatarLoseLive('troop3', 0.5)
        let ArcherAvatar = cc.find('Canvas/background/RightCity/troop')
        if (xdistance > 0) {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, -200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                let moveTo = cc.moveBy(0.5, -200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                let moveTo = cc.moveBy(0.5, -200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else if (xdistance == 0) {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, 0, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance < 0) {
                let moveTo = cc.moveBy(0.5, 0, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, 200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                let moveTo = cc.moveBy(0.5, 200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                let moveTo = cc.moveBy(0.5, 200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        }
    },
    knightFightKnight3:function(xdistance,ydistance){
        this.notChooseAll()

        this.avatarLoseLive('knight3', 0.5)
        let ArcherAvatar = cc.find('Canvas/background/RightCity/knight')
        if (xdistance > 0) {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, -200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                let moveTo = cc.moveBy(0.5, -200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                let moveTo = cc.moveBy(0.5, -200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else if (xdistance == 0) {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, 0, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance < 0) {
                let moveTo = cc.moveBy(0.5, 0, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, 200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                let moveTo = cc.moveBy(0.5, 200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                let moveTo = cc.moveBy(0.5, 200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        }
    },
    knightFightArcher3:function(xdistance,ydistance){
        this.notChooseAll()
        this.avatarLoseLive('archer3', 0.5)
        let ArcherAvatar = cc.find('Canvas/background/RightCity/archer')
        if (xdistance > 0) {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, -200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                let moveTo = cc.moveBy(0.5, -200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                let moveTo = cc.moveBy(0.5, -200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else if (xdistance == 0) {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, 0, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance < 0) {
                let moveTo = cc.moveBy(0.5, 0, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, 200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                let moveTo = cc.moveBy(0.5, 200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                let moveTo = cc.moveBy(0.5, 200, 200)
                return ArcherAvatar.runAction(moveTo)
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
            //judge obstacle or enemy or self
            if (node.x == cc.gameSpace.TroopLocation.x && node.y == cc.gameSpace.TroopLocation.y) {

                self.spawnFightTip()

            } else if (node.x == cc.gameSpace.KnightLocation.x && node.y == cc.gameSpace.KnightLocation.y) {
            
                self.spawnFightTip()

            } else if (node.x == cc.gameSpace.bottomCityLocation.x && node.y == cc.gameSpace.bottomCityLocation.y) {

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

                this.archerFightTroop2(xdistance, ydistance)
            } else if (node.x == cc.gameSpace.KnightLocation2.x && node.y == cc.gameSpace.KnightLocation2.y) {
                //fight troop
                let troopLocationX = cc.gameSpace.ArcherLocation.x
                let troopLocationY = cc.gameSpace.ArcherLocation.y
                let knightLocation2X = cc.gameSpace.KnightLocation2.x
                let knightLocation2Y = cc.gameSpace.KnightLocation2.y

                let xdistance = troopLocationX - knightLocation2X
                let ydistance = troopLocationY - knightLocation2Y

                self.spawnFighticom(cc.gameSpace.ArcherLocation, xdistance, ydistance)

                self.FightFlag = true

                this.archerFightKnight2(xdistance, ydistance)
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

                this.archerFightArcher2(xdistance, ydistance)
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

                this.archerFightTroop3(xdistance, ydistance)
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

                this.archerFightKnight3(xdistance, ydistance)
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

                this.archerFightArcher3(xdistance, ydistance)
            }

            else {
                this.ArcherAction()
            }
        }
    },

    archerFightTroop2:function(xdistance,ydistance){
        this.notChooseAll()

        this.avatarLoseLive('troop2', 0.5)
        let ArcherAvatar = cc.find('Canvas/background/LeftCity/troop')
        if (xdistance > 0) {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, -200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                let moveTo = cc.moveBy(0.5, -200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                let moveTo = cc.moveBy(0.5, -200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else if (xdistance == 0) {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, 0, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance < 0) {
                let moveTo = cc.moveBy(0.5, 0, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, 200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                let moveTo = cc.moveBy(0.5, 200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                let moveTo = cc.moveBy(0.5, 200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        }
    },
    archerFightKnight2:function(xdistance,ydistance){
        this.notChooseAll()

        this.avatarLoseLive('knight2', 0.5)
        let ArcherAvatar = cc.find('Canvas/background/LeftCity/knight')
        if (xdistance > 0) {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, -200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                let moveTo = cc.moveBy(0.5, -200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                let moveTo = cc.moveBy(0.5, -200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else if (xdistance == 0) {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, 0, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance < 0) {
                let moveTo = cc.moveBy(0.5, 0, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, 200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                let moveTo = cc.moveBy(0.5, 200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                let moveTo = cc.moveBy(0.5, 200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        }
    },
    archerFightArcher2:function(xdistance,ydistance){
        this.notChooseAll()

        this.avatarLoseLive('archer2', 0.5)
        let ArcherAvatar = cc.find('Canvas/background/LeftCity/archer')
        if (xdistance > 0) {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, -200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                let moveTo = cc.moveBy(0.5, -200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                let moveTo = cc.moveBy(0.5, -200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else if (xdistance == 0) {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, 0, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance < 0) {
                let moveTo = cc.moveBy(0.5, 0, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, 200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                let moveTo = cc.moveBy(0.5, 200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                let moveTo = cc.moveBy(0.5, 200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        }
    },
    archerFightTroop3:function(xdistance,ydistance){
        this.notChooseAll()

        this.avatarLoseLive('troop3', 0.5)
        let ArcherAvatar = cc.find('Canvas/background/RightCity/troop')
        if (xdistance > 0) {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, -200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                let moveTo = cc.moveBy(0.5, -200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                let moveTo = cc.moveBy(0.5, -200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else if (xdistance == 0) {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, 0, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance < 0) {
                let moveTo = cc.moveBy(0.5, 0, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, 200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                let moveTo = cc.moveBy(0.5, 200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                let moveTo = cc.moveBy(0.5, 200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        }
    },
    archerFightKnight3:function(xdistance,ydistance){
        this.notChooseAll()

        this.avatarLoseLive('knight3', 0.5)
        let ArcherAvatar = cc.find('Canvas/background/RightCity/knight')
        if (xdistance > 0) {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, -200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                let moveTo = cc.moveBy(0.5, -200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                let moveTo = cc.moveBy(0.5, -200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else if (xdistance == 0) {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, 0, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance < 0) {
                let moveTo = cc.moveBy(0.5, 0, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, 200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                let moveTo = cc.moveBy(0.5, 200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                let moveTo = cc.moveBy(0.5, 200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        }
    },
    archerFightArcher3:function(xdistance,ydistance){
        this.notChooseAll()
        this.avatarLoseLive('archer3', 0.5)
        let ArcherAvatar = cc.find('Canvas/background/RightCity/archer')
        if (xdistance > 0) {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, -200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                let moveTo = cc.moveBy(0.5, -200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                let moveTo = cc.moveBy(0.5, -200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else if (xdistance == 0) {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, 0, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance < 0) {
                let moveTo = cc.moveBy(0.5, 0, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else {
            if (ydistance > 0) {
                let moveTo = cc.moveBy(0.5, 200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                let moveTo = cc.moveBy(0.5, 200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                let moveTo = cc.moveBy(0.5, 200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        }
    },


    avatarLoseLive: function (nodeName, num) {
        if (nodeName == 'troop2') {
            let troopAvatar = cc.find('Canvas/background/LeftCity/troop')
            let trooplive = troopAvatar.children[0].getComponent(cc.ProgressBar)
            trooplive.progress -= num
            if (trooplive.progress <= 0) {
                //if the troop live < 0 go back to the start position
            }
        } else if (nodeName == 'knight2') {
            let knightAvatar = cc.find('Canvas/background/LeftCity/knight')
            let knightLive = knightAvatar.children[0].getComponent(cc.ProgressBar)
            knightLive.progress -= num
        } else if (nodeName == 'archer2') {
            let archerAvatar = cc.find('Canvas/background/LeftCity/archer')
            let archerlive = archerAvatar.children[0].getComponent(cc.ProgressBar)
            archerlive.progress -= num
            if (archerlive.progress <= 0) {
                //if the troop live < 0 go back to the start position
            }
        }else if(nodeName == 'troop3'){
            let troopAvatar = cc.find('Canvas/background/RightCity/troop')
            let trooplive = troopAvatar.children[0].getComponent(cc.ProgressBar)
            trooplive.progress -= num
            if (trooplive.progress <= 0) {
                //if the troop live < 0 go back to the start position
            }
        }else if (nodeName == 'knight3') {
            let knightAvatar = cc.find('Canvas/background/RightCity/knight')
            let knightLive = knightAvatar.children[0].getComponent(cc.ProgressBar)
            knightLive.progress -= num
        } else if (nodeName == 'archer3') {
            let archerAvatar = cc.find('Canvas/background/RightCity/archer')
            let archerlive = archerAvatar.children[0].getComponent(cc.ProgressBar)
            archerlive.progress -= num
        }
    },


    TroopAction: function () {



        if (cc.gameSpace.chooseTroop && cc.gameSpace.chooseTroopPoint) {
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
            let moveTo = cc.moveBy(0.5, cc.v2(moveX - realX + 100, moveY - realY + 100)).easing(cc.easeIn(1.0))
            return TroopAvatar.runAction(moveTo)
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
            return TroopAvatar.runAction(moveTo)
        }
    },
    start() {

    },
    update (dt) {},
});
