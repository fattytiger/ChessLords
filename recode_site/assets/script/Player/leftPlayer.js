
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




    limitTroopMove: function (node, self) {
        console.log('player2 tropp')
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


            } else if (node.x == cc.gameSpace.leftCityLocation.x && node.y == cc.gameSpace.leftCityLocation.y) {

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

                this.troop2FightTroop(xdistance, ydistance)
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

                this.troop2FightKnight(xdistance, ydistance)
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

                this.troop2FightArcher(xdistance, ydistance)
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

                this.troop2FightTroop3(xdistance, ydistance)
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

                this.troop2FightKnight3(xdistance, ydistance)
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

                this.troop2FightArcher3(xdistance, ydistance)
            }
            else {
                this.TroopAction()
            }

        }
    },

    troop2FightTroop: function (xdistance,ydistance) {
        //find the troop node and get the position
        this.notChooseAll()

        this.avatarLoseLive('troop', 0.5)
        let ArcherAvatar = cc.find('Canvas/background/BottomCity/troop')
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
    troop2FightKnight: function (xdistance,ydistance) {
        //find the troop node and get the position
        this.notChooseAll()

        this.avatarLoseLive('knight', 0.5)
        let ArcherAvatar = cc.find('Canvas/background/BottomCity/knight')
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
    troop2FightArcher: function (xdistance,ydistance) {
        //find the troop node and get the position
        this.notChooseAll()

        this.avatarLoseLive('troop', 0.5)
        let ArcherAvatar = cc.find('Canvas/background/BottomCity/archer')
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

    troop2FightTroop3: function (xdistance,ydistance) {
        //find the troop node and get the position
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
    troop2FightKnight3: function (xdistance,ydistance) {
        //find the troop node and get the position
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
    troop2FightArcher3: function (xdistance,ydistance) {
        //find the troop node and get the position
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

            } else if (node.x == cc.gameSpace.leftCityLocation.x && node.y == cc.gameSpace.leftCityLocation.y) {

                //Knight fight bottomCity
                console.log('fight the bottom city')
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

                this.knight2FightTroop(xdistance, ydistance)
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

                this.knight2FightKnight(xdistance, ydistance)
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

                this.knight2FightArcher(xdistance, ydistance)
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

                this.knight2FightTroop3(xdistance, ydistance)
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

                this.knight2FightKnight3(xdistance, ydistance)
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

                this.knight2FightArcher3(xdistance, ydistance)
            }

            else {
                this.KnightAction()
            }
        }

    },
    knight2FightTroop: function (xdistance,ydistance) {
        //find the troop node and get the position
        this.notChooseAll()

        this.avatarLoseLive('troop', 0.5)
        let ArcherAvatar = cc.find('Canvas/background/BottomCity/troop')
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
    knight2FightKnight: function (xdistance,ydistance) {
        //find the troop node and get the position
        this.notChooseAll()

        this.avatarLoseLive('knight', 0.5)
        let ArcherAvatar = cc.find('Canvas/background/BottomCity/knight')
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
    knight2FightArcher: function (xdistance,ydistance) {
        //find the troop node and get the position
        this.notChooseAll()

        this.avatarLoseLive('archer', 0.5)
        let ArcherAvatar = cc.find('Canvas/background/BottomCity/archer')
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
    knight2FightTroop3: function (xdistance,ydistance) {
        //find the troop node and get the position
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
    knight2FightKnight3: function (xdistance,ydistance) {
        //find the troop node and get the position
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
    knight2FightArcher3: function (xdistance,ydistance) {
        //find the troop node and get the position
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

            } else if (node.x == cc.gameSpace.leftCityLocation.x && node.y == cc.gameSpace.leftCityLocation.y) {

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

                this.archer2FightTroop(xdistance, ydistance)
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

                this.archer2FightKnight(xdistance, ydistance)
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

                this.archer2FightArcher(xdistance, ydistance)
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

                this.archer2FightTroop3(xdistance, ydistance)
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

                this.archer2FightKnight3(xdistance, ydistance)
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

                this.archer2FightArcher3(xdistance, ydistance)
            }


            else {
                this.ArcherAction()
            }
        }
    },

    archer2FightTroop:function(xdistance,ydistance){
        //find the troop node and get the position
        this.notChooseAll()

        this.avatarLoseLive('troop', 0.5)
        let ArcherAvatar = cc.find('Canvas/background/BottomCity/troop')
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
    archer2FightKnight:function(xdistance,ydistance){

        //find the troop node and get the position
        this.notChooseAll()

        this.avatarLoseLive('knight', 0.5)
        let ArcherAvatar = cc.find('Canvas/background/BottomCity/knight')
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
    archer2FightArcher:function(xdistance,ydistance){

        //find the troop node and get the position
        this.notChooseAll()

        this.avatarLoseLive('archer', 0.5)
        let ArcherAvatar = cc.find('Canvas/background/BottomCity/archer')
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
    archer2FightTroop3:function(xdistance,ydistance){

        //find the troop node and get the position
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
    archer2FightKnight3:function(xdistance,ydistance){
        //find the troop node and get the position
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
    archer2FightArcher3:function(xdistance,ydistance){

        //find the troop node and get the position
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
            let moveTo = cc.moveBy(0.5, cc.v2(moveX - realX + 100, moveY - realY + 100)).easing(cc.easeIn(1.0))
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
            let moveTo = cc.moveBy(0.5, cc.v2(moveX - realX + 100, moveY - realY + 100)).easing(cc.easeIn(1.0))
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
            let moveTo = cc.moveBy(0.5, cc.v2(moveX - realX + 100, moveY - realY + 100)).easing(cc.easeIn(1.0))
            return TroopAvatar.runAction(moveTo)
        }

    },

    avatarLoseLive: function (nodeName, num) {
        if (nodeName == 'troop') {
            let troopAvatar = cc.find('Canvas/background/BottomCity/troop')
            let trooplive = troopAvatar.children[0].getComponent(cc.ProgressBar)
            trooplive.progress -= num
            if (trooplive.progress <= 0) {
                //if the troop live < 0 go back to the start position
            }
        } else if (nodeName == 'knight') {
            let knightAvatar = cc.find('Canvas/background/BottomCity/knight')
            let knightLive = knightAvatar.children[0].getComponent(cc.ProgressBar)
            knightLive.progress -= num
        } else if (nodeName == 'archer') {
            let archerAvatar = cc.find('Canvas/background/BottomCity/archer')
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


    start() {

    },

    update(dt) { },
});
