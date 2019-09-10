
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

    onLoad () {
        this.initCityLocation()
        this.initArcherLocation()
        this.initTroopLocation()
        this.initKnightLocation()
    },

    initCityLocation:function(){
        let RightCity = cc.find('Canvas/background/RightCity')
        cc.gameSpace.rightCityLocation = { x: RightCity.x - 100, y: RightCity.y - 100 }
    },

    initArcherLocation: function () {
        let city = cc.find('Canvas/background/RightCity')
        let cityX = city.x
        let cityY = city.y

        //find the troop node and get the position
        let TroopAvatar = cc.find('Canvas/background/RightCity/archer')
        let troopX = TroopAvatar.x
        let troopY = TroopAvatar.y

        //find the real location of troop on the map
        let realX = cityX + troopX
        let realY = cityY + troopY

        cc.gameSpace.ArcherLocation3 = { x: realX - 100, y: realY - 100 }
    },

    initTroopLocation: function () {
        let city = cc.find('Canvas/background/RightCity')
        let cityX = city.x
        let cityY = city.y

        //find the troop node and get the position
        let TroopAvatar = cc.find('Canvas/background/RightCity/troop')
        let troopX = TroopAvatar.x
        let troopY = TroopAvatar.y

        //find the real location of troop on the map
        let realX = cityX + troopX
        let realY = cityY + troopY

        cc.gameSpace.TroopLocation3 = { x: realX - 100, y: realY - 100 }
    },

    initKnightLocation: function () {
        let city = cc.find('Canvas/background/RightCity')
        let cityX = city.x
        let cityY = city.y

        //find the troop node and get the position
        let TroopAvatar = cc.find('Canvas/background/RightCity/knight')
        let troopX = TroopAvatar.x
        let troopY = TroopAvatar.y

        //find the real location of troop on the map
        let realX = cityX + troopX
        let realY = cityY + troopY
        cc.gameSpace.KnightLocation3 = { x: realX - 100, y: realY - 100 }
    },


    isTroopChoose() {
        cc.gameSpace.chooseTroop = false
        cc.gameSpace.chooseArcher = false
        cc.gameSpace.chooseKnight = false

        cc.gameSpace.chooseTroop2 = false
        cc.gameSpace.chooseArcher2 = false
        cc.gameSpace.chooseKnight2 = false

        cc.gameSpace.chooseTroop3 = true
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
        cc.gameSpace.chooseKnight3 = true
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
        cc.gameSpace.chooseArcher3 = true
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
        let troopMoveDistanceX = Math.abs((cc.gameSpace.troopMovePoint3.x - cc.gameSpace.TroopLocation3.x))
        let troopMoveDistanceY = Math.abs((cc.gameSpace.troopMovePoint3.y - cc.gameSpace.TroopLocation3.y))
        if (troopMoveDistanceX > 200 || troopMoveDistanceY > 200) {
            console.log('out of limit')
            return
        } else {
            if (node.x == cc.gameSpace.ArcherLocation3.x && node.y == cc.gameSpace.ArcherLocation3.y) {

                self.spawnFightTip()

            } else if (node.x == cc.gameSpace.KnightLocation3.x && node.y == cc.gameSpace.KnightLocation3.y) {

                self.spawnFightTip()


            } else if (node.x == cc.gameSpace.rightCityLocation.x && node.y == cc.gameSpace.rightCityLocation.y) {

                self.spawnFightTip()

            }
            //fight player1
            else if (node.x == cc.gameSpace.TroopLocation.x && node.y == cc.gameSpace.TroopLocation.y) {
                //fight troop
                let troopLocationX = cc.gameSpace.TroopLocation3.x
                let troopLocationY = cc.gameSpace.TroopLocation3.y
                let troopLocation2X = cc.gameSpace.TroopLocation.x
                let troopLocation2Y = cc.gameSpace.TroopLocation.y

                let xdistance = troopLocationX - troopLocation2X
                let ydistance = troopLocationY - troopLocation2Y

                self.spawnFighticom(cc.gameSpace.TroopLocation3, xdistance, ydistance)

                self.FightFlag = true

                this.troop3FightTroop(xdistance, ydistance)
            } else if (node.x == cc.gameSpace.KnightLocation.x && node.y == cc.gameSpace.KnightLocation.y) {
                //fight troop
                let troopLocationX = cc.gameSpace.TroopLocation3.x
                let troopLocationY = cc.gameSpace.TroopLocation3.y
                let knightLocation2X = cc.gameSpace.KnightLocation.x
                let knightLocation2Y = cc.gameSpace.KnightLocation.y

                let xdistance = troopLocationX - knightLocation2X
                let ydistance = troopLocationY - knightLocation2Y

                self.spawnFighticom(cc.gameSpace.TroopLocation3, xdistance, ydistance)

                self.FightFlag = true

                this.troop3FightKnight(xdistance, ydistance)
            } else if (node.x == cc.gameSpace.ArcherLocation.x && node.y == cc.gameSpace.ArcherLocation.y) {
                //fight archer
                let troopLocationX = cc.gameSpace.TroopLocation3.x
                let troopLocationY = cc.gameSpace.TroopLocation3.y
                let ArcherLocation2X = cc.gameSpace.ArcherLocation.x
                let ArcherLocation2Y = cc.gameSpace.ArcherLocation.y

                let xdistance = troopLocationX - ArcherLocation2X
                let ydistance = troopLocationY - ArcherLocation2Y

                self.spawnFighticom(cc.gameSpace.TroopLocation3, xdistance, ydistance)

                self.FightFlag = true

                this.troop3FightArcher(xdistance, ydistance)
            }


            //fight player 2
            else if (node.x == cc.gameSpace.TroopLocation2.x && node.y == cc.gameSpace.TroopLocation2.y) {
                //fight troop
                let troopLocationX = cc.gameSpace.TroopLocation3.x
                let troopLocationY = cc.gameSpace.TroopLocation3.y
                let TroopLocation3X = cc.gameSpace.TroopLocation2.x
                let TroopLocation3Y = cc.gameSpace.TroopLocation2.y

                let xdistance = troopLocationX - TroopLocation3X
                let ydistance = troopLocationY - TroopLocation3Y

                self.spawnFighticom(cc.gameSpace.TroopLocation3, xdistance, ydistance)

                self.FightFlag = true

                this.troop3FightTroop2(xdistance, ydistance)
            } else if (node.x == cc.gameSpace.KnightLocation2.x && node.y == cc.gameSpace.KnightLocation2.y) {
                //fight knight
                let troopLocationX = cc.gameSpace.TroopLocation3.x
                let troopLocationY = cc.gameSpace.TroopLocation3.y
                let knightLocation3X = cc.gameSpace.KnightLocation2.x
                let knightLocation3Y = cc.gameSpace.KnightLocation2.y

                let xdistance = troopLocationX - knightLocation3X
                let ydistance = troopLocationY - knightLocation3Y

                self.spawnFighticom(cc.gameSpace.TroopLocation3, xdistance, ydistance)

                self.FightFlag = true

                this.troop3FightKnight2(xdistance, ydistance)
            } else if (node.x == cc.gameSpace.ArcherLocation2.x && node.y == cc.gameSpace.ArcherLocation2.y) {
                //fight archer
                let troopLocationX = cc.gameSpace.TroopLocation3.x
                let troopLocationY = cc.gameSpace.TroopLocation3.y
                let ArcherLocation3X = cc.gameSpace.ArcherLocation2.x
                let ArcherLocation3Y = cc.gameSpace.ArcherLocation2.y

                let xdistance = troopLocationX - ArcherLocation3X
                let ydistance = troopLocationY - ArcherLocation3Y

                self.spawnFighticom(cc.gameSpace.TroopLocation3, xdistance, ydistance)

                self.FightFlag = true

                this.troop3FightArcher2(xdistance, ydistance)
            }
            else {
                this.TroopAction()
            }

        }
    },

    troop3FightTroop: function (xdistance,ydistance) {
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
    troop3FightKnight: function (xdistance,ydistance) {
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
    troop3FightArcher: function (xdistance,ydistance) {
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

    troop3FightTroop2: function (xdistance,ydistance) {
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
    troop3FightKnight2: function (xdistance,ydistance) {
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
    troop2FightArcher3: function (xdistance,ydistance) {
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




    limitKnightMove: function (node, self) {
        let knightMoveDistanceX = Math.abs(cc.gameSpace.KnightMovePoint3.x - cc.gameSpace.KnightLocation3.x)
        let knightMoveDistanceY = Math.abs(cc.gameSpace.KnightMovePoint3.y - cc.gameSpace.KnightLocation3.y)

        if (knightMoveDistanceX > 200 || knightMoveDistanceY > 200) {
            console.log('knight out of limit')
            return
        } else {
            if (node.x == cc.gameSpace.TroopLocation3.x && node.y == cc.gameSpace.TroopLocation3.y) {

                self.spawnFightTip()

            } else if (node.x == cc.gameSpace.ArcherLocation3.x && node.y == cc.gameSpace.ArcherLocation3.y) {

                self.spawnFightTip()

            } else if (node.x == cc.gameSpace.rightCityLocation.x && node.y == cc.gameSpace.rightCityLocation.y) {

                //Knight fight bottomCity
                console.log('fight the bottom city')
                self.spawnFightTip()
            }

            //fight player1
            else if (node.x == cc.gameSpace.TroopLocation.x && node.y == cc.gameSpace.TroopLocation.y) {
                //fight troop
                let troopLocationX = cc.gameSpace.KnightLocation3.x
                let troopLocationY = cc.gameSpace.KnightLocation3.y
                let troopLocation2X = cc.gameSpace.TroopLocation.x
                let troopLocation2Y = cc.gameSpace.TroopLocation.y

                let xdistance = troopLocationX - troopLocation2X
                let ydistance = troopLocationY - troopLocation2Y

                self.spawnFighticom(cc.gameSpace.KnightLocation3, xdistance, ydistance)

                self.FightFlag = true

                this.knight3FightTroop(xdistance, ydistance)
            } else if (node.x == cc.gameSpace.KnightLocation.x && node.y == cc.gameSpace.KnightLocation.y) {
                //fight troop
                let troopLocationX = cc.gameSpace.KnightLocation3.x
                let troopLocationY = cc.gameSpace.KnightLocation3.y
                let knightLocation2X = cc.gameSpace.KnightLocation.x
                let knightLocation2Y = cc.gameSpace.KnightLocation.y

                let xdistance = troopLocationX - knightLocation2X
                let ydistance = troopLocationY - knightLocation2Y

                self.spawnFighticom(cc.gameSpace.KnightLocation3, xdistance, ydistance)

                self.FightFlag = true

                this.knight3FightKnight(xdistance, ydistance)
            } else if (node.x == cc.gameSpace.ArcherLocation.x && node.y == cc.gameSpace.ArcherLocation.y) {
                //fight archer
                let troopLocationX = cc.gameSpace.KnightLocation3.x
                let troopLocationY = cc.gameSpace.KnightLocation3.y
                let ArcherLocation2X = cc.gameSpace.ArcherLocation.x
                let ArcherLocation2Y = cc.gameSpace.ArcherLocation.y

                let xdistance = troopLocationX - ArcherLocation2X
                let ydistance = troopLocationY - ArcherLocation2Y

                self.spawnFighticom(cc.gameSpace.KnightLocation3, xdistance, ydistance)

                self.FightFlag = true

                this.knight3FightArcher(xdistance, ydistance)
            }


            //fight player 2
            else if (node.x == cc.gameSpace.TroopLocation2.x && node.y == cc.gameSpace.TroopLocation2.y) {
                //fight troop
                let troopLocationX = cc.gameSpace.KnightLocation3.x
                let troopLocationY = cc.gameSpace.KnightLocation3.y
                let TroopLocation3X = cc.gameSpace.TroopLocation2.x
                let TroopLocation3Y = cc.gameSpace.TroopLocation2.y

                let xdistance = troopLocationX - TroopLocation3X
                let ydistance = troopLocationY - TroopLocation3Y

                self.spawnFighticom(cc.gameSpace.KnightLocation3, xdistance, ydistance)

                self.FightFlag = true

                this.knight2FightTroop3(xdistance, ydistance)
            } else if (node.x == cc.gameSpace.KnightLocation2.x && node.y == cc.gameSpace.KnightLocation2.y) {
                //fight troop
                let troopLocationX = cc.gameSpace.KnightLocation3.x
                let troopLocationY = cc.gameSpace.KnightLocation3.y
                let knightLocation3X = cc.gameSpace.KnightLocation2.x
                let knightLocation3Y = cc.gameSpace.KnightLocation2.y

                let xdistance = troopLocationX - knightLocation3X
                let ydistance = troopLocationY - knightLocation3Y

                self.spawnFighticom(cc.gameSpace.KnightLocation3, xdistance, ydistance)

                self.FightFlag = true

                this.knight3FightKnight2(xdistance, ydistance)
            } else if (node.x == cc.gameSpace.ArcherLocation2.x && node.y == cc.gameSpace.ArcherLocation2.y) {
                //fight archer
                let troopLocationX = cc.gameSpace.KnightLocation3.x
                let troopLocationY = cc.gameSpace.KnightLocation3.y
                let ArcherLocation3X = cc.gameSpace.ArcherLocation2.x
                let ArcherLocation3Y = cc.gameSpace.ArcherLocation2.y

                let xdistance = troopLocationX - ArcherLocation3X
                let ydistance = troopLocationY - ArcherLocation3Y

                self.spawnFighticom(cc.gameSpace.KnightLocation3, xdistance, ydistance)

                self.FightFlag = true

                this.knight3FightArcher2(xdistance, ydistance)
            }

            else {
                this.KnightAction()
            }
        }

    },
    knight3FightTroop: function (xdistance,ydistance) {
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
    knight3FightKnight: function (xdistance,ydistance) {
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
    knight3FightArcher: function (xdistance,ydistance) {
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
    knight3FightTroop2: function (xdistance,ydistance) {
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
    knight3FightKnight2: function (xdistance,ydistance) {
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
    knight3FightArcher2: function (xdistance,ydistance) {
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



    limitArcherMove: function (node, self) {
        let archerMoveDistanceX = Math.abs(cc.gameSpace.ArcherMovePoint3.x - cc.gameSpace.ArcherLocation3.x)
        let archerMoveDistanceY = Math.abs(cc.gameSpace.ArcherMovePoint3.y - cc.gameSpace.ArcherLocation3.y)

        if (archerMoveDistanceX > 200 || archerMoveDistanceY > 200) {
            console.log('archer out limit')
            return
        } else {
            //judge obstacle or enemy or self
            if (node.x == cc.gameSpace.TroopLocation3.x && node.y == cc.gameSpace.TroopLocation3.y) {

                self.spawnFightTip()

            } else if (node.x == cc.gameSpace.KnightLocation3.x && node.y == cc.gameSpace.KnightLocation3.y) {

                self.spawnFightTip()

            } else if (node.x == cc.gameSpace.rightCityLocation.x && node.y == cc.gameSpace.rightCityLocation.y) {

                self.spawnFightTip()
            }

            //fight player1
            else if (node.x == cc.gameSpace.TroopLocation.x && node.y == cc.gameSpace.TroopLocation.y) {
                //fight troop
                let troopLocationX = cc.gameSpace.ArcherLocation3.x
                let troopLocationY = cc.gameSpace.ArcherLocation3.y
                let troopLocation2X = cc.gameSpace.TroopLocation.x
                let troopLocation2Y = cc.gameSpace.TroopLocation.y

                let xdistance = troopLocationX - troopLocation2X
                let ydistance = troopLocationY - troopLocation2Y

                self.spawnFighticom(cc.gameSpace.ArcherLocation3, xdistance, ydistance)

                self.FightFlag = true

                this.archer3FightTroop(xdistance, ydistance)
            } else if (node.x == cc.gameSpace.KnightLocation.x && node.y == cc.gameSpace.KnightLocation.y) {
                //fight troop
                let troopLocationX = cc.gameSpace.ArcherLocation3.x
                let troopLocationY = cc.gameSpace.ArcherLocation3.y
                let knightLocation2X = cc.gameSpace.KnightLocation.x
                let knightLocation2Y = cc.gameSpace.KnightLocation.y

                let xdistance = troopLocationX - knightLocation2X
                let ydistance = troopLocationY - knightLocation2Y

                self.spawnFighticom(cc.gameSpace.ArcherLocation3, xdistance, ydistance)

                self.FightFlag = true

                this.archer3FightKnight(xdistance, ydistance)
            } else if (node.x == cc.gameSpace.ArcherLocation.x && node.y == cc.gameSpace.ArcherLocation.y) {
                //fight archer
                let troopLocationX = cc.gameSpace.ArcherLocation3.x
                let troopLocationY = cc.gameSpace.ArcherLocation3.y
                let ArcherLocation2X = cc.gameSpace.ArcherLocation.x
                let ArcherLocation2Y = cc.gameSpace.ArcherLocation.y

                let xdistance = troopLocationX - ArcherLocation2X
                let ydistance = troopLocationY - ArcherLocation2Y

                self.spawnFighticom(cc.gameSpace.ArcherLocation3, xdistance, ydistance)

                self.FightFlag = true

                this.archer3FightArcher(xdistance, ydistance)
            }


            //fight player 2
            else if (node.x == cc.gameSpace.TroopLocation2.x && node.y == cc.gameSpace.TroopLocation2.y) {
                //fight troop
                let troopLocationX = cc.gameSpace.ArcherLocation3.x
                let troopLocationY = cc.gameSpace.ArcherLocation3.y
                let TroopLocation3X = cc.gameSpace.TroopLocation2.x
                let TroopLocation3Y = cc.gameSpace.TroopLocation2.y

                let xdistance = troopLocationX - TroopLocation3X
                let ydistance = troopLocationY - TroopLocation3Y

                self.spawnFighticom(cc.gameSpace.ArcherLocation3, xdistance, ydistance)

                self.FightFlag = true

                this.archer3FightTroop2(xdistance, ydistance)
            } else if (node.x == cc.gameSpace.KnightLocation2.x && node.y == cc.gameSpace.KnightLocation2.y) {
                //fight troop
                let troopLocationX = cc.gameSpace.ArcherLocation3.x
                let troopLocationY = cc.gameSpace.ArcherLocation3.y
                let knightLocation3X = cc.gameSpace.KnightLocation2.x
                let knightLocation3Y = cc.gameSpace.KnightLocation2.y

                let xdistance = troopLocationX - knightLocation3X
                let ydistance = troopLocationY - knightLocation3Y

                self.spawnFighticom(cc.gameSpace.ArcherLocation3, xdistance, ydistance)

                self.FightFlag = true

                this.archer3FightKnight2(xdistance, ydistance)
            } else if (node.x == cc.gameSpace.ArcherLocation2.x && node.y == cc.gameSpace.ArcherLocation2.y) {
                //fight archer
                let troopLocationX = cc.gameSpace.ArcherLocation3.x
                let troopLocationY = cc.gameSpace.ArcherLocation3.y
                let ArcherLocation3X = cc.gameSpace.ArcherLocation2.x
                let ArcherLocation3Y = cc.gameSpace.ArcherLocation2.y

                let xdistance = troopLocationX - ArcherLocation3X
                let ydistance = troopLocationY - ArcherLocation3Y

                self.spawnFighticom(cc.gameSpace.ArcherLocation3, xdistance, ydistance)

                self.FightFlag = true

                this.archer3FightArcher2(xdistance, ydistance)
            }


            else {
                this.ArcherAction()
            }
        }
    },

    archer3FightTroop:function(xdistance,ydistance){
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
    archer3FightKnight:function(xdistance,ydistance){

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
    archer3FightArcher:function(xdistance,ydistance){

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
    archer3FightTroop2:function(xdistance,ydistance){

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
    archer3FightKnight2:function(xdistance,ydistance){
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
    archer3FightArcher2:function(xdistance,ydistance){

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



    TroopAction: function () {
        if (cc.gameSpace.chooseTroop3 && cc.gameSpace.chooseTroopPoint3) {
            //find the troop parent => city  because the toop is binded on the city


            let city = cc.find('Canvas/background/RightCity')
            let cityX = city.x
            let cityY = city.y

            //find the troop node and get the position
            let TroopAvatar = cc.find('Canvas/background/RightCity/troop')
            let troopX = TroopAvatar.x
            let troopY = TroopAvatar.y

            //find the real location of troop on the map
            let realX = cityX + troopX
            let realY = cityY + troopY

            //get the move point
            let moveX = cc.gameSpace.troopMovePoint3.x
            let moveY = cc.gameSpace.troopMovePoint3.y

            //start move
            let moveTo = cc.moveBy(0.5, cc.v2(moveX - realX + 100, moveY - realY + 100)).easing(cc.easeIn(1.0))
            return TroopAvatar.runAction(moveTo)
        }
    },
    KnightAction: function () {

        if (cc.gameSpace.chooseKnight3 && cc.gameSpace.chooseKnightPoint3) {

            console.log('troopAction')
            //find the troop parent => city  because the toop is binded on the city
            let city = cc.find('Canvas/background/RightCity')
            let cityX = city.x
            let cityY = city.y

            //find the troop node and get the position
            let TroopAvatar = cc.find('Canvas/background/RightCity/knight')
            let troopX = TroopAvatar.x
            let troopY = TroopAvatar.y

            //find the real location of troop on the map
            let realX = cityX + troopX
            let realY = cityY + troopY

            //get the move point
            let moveX = cc.gameSpace.KnightMovePoint3.x
            let moveY = cc.gameSpace.KnightMovePoint3.y

            //start move
            let moveTo = cc.moveBy(0.5, cc.v2(moveX - realX + 100, moveY - realY + 100)).easing(cc.easeIn(1.0))
            return TroopAvatar.runAction(moveTo)
        }
    },

    ArcherAction: function () {

        if (cc.gameSpace.chooseArcher3 && cc.gameSpace.chooseArcherPoint3) {
            //find the troop parent => city  because the toop is binded on the city
            let city = cc.find('Canvas/background/RightCity')
            let cityX = city.x
            let cityY = city.y

            //find the troop node and get the position
            let TroopAvatar = cc.find('Canvas/background/RightCity/archer')
            let troopX = TroopAvatar.x
            let troopY = TroopAvatar.y

            //find the real location of troop on the map
            let realX = cityX + troopX
            let realY = cityY + troopY

            //get the move point
            let moveX = cc.gameSpace.ArcherMovePoint3.x
            let moveY = cc.gameSpace.ArcherMovePoint3.y

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
        }else if(nodeName == 'troop2'){
            let troopAvatar = cc.find('Canvas/background/LeftCity/troop')
            let trooplive = troopAvatar.children[0].getComponent(cc.ProgressBar)
            trooplive.progress -= num
            if (trooplive.progress <= 0) {
                //if the troop live < 0 go back to the start position
            }
        }else if (nodeName == 'knight2') {
            let knightAvatar = cc.find('Canvas/background/LeftCity/knight')
            let knightLive = knightAvatar.children[0].getComponent(cc.ProgressBar)
            knightLive.progress -= num
        } else if (nodeName == 'archer2') {
            let archerAvatar = cc.find('Canvas/background/LeftCity/archer')
            let archerlive = archerAvatar.children[0].getComponent(cc.ProgressBar)
            archerlive.progress -= num
        }
    },


    start () {

    },

    update (dt) {},
});
