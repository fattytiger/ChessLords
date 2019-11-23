module.exports = cc.Class({
    extends: cc.Component,

    properties: {

    },
    notChooseAll: function () {
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

    TroopAtacked: function (xdistance, ydistance) {
        //find the troop node and get the position
        this.notChooseAll()
        this.avatarLoseLive('troop', 0.5)
        let ArcherAvatar = cc.find('Canvas/background/BottomCity/troop')
        if (xdistance > 0) {
            if (ydistance > 0) {
                console.log(cc.gameSpace.TroopLocation)

                cc.gameSpace.TroopLocation.x -= 200
                cc.gameSpace.TroopLocation.y -= 200

                let moveTo = cc.moveBy(0.5, -200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {

                cc.gameSpace.TroopLocation.x -= 200
                cc.gameSpace.TroopLocation.y -= 0
                let moveTo = cc.moveBy(0.5, -200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                cc.gameSpace.TroopLocation.x -= 200
                cc.gameSpace.TroopLocation.y += 200
                let moveTo = cc.moveBy(0.5, -200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else if (xdistance == 0) {
            if (ydistance > 0) {
                cc.gameSpace.TroopLocation.x -= 0
                cc.gameSpace.TroopLocation.y -= 200

                let moveTo = cc.moveBy(0.5, 0, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance < 0) {

                cc.gameSpace.TroopLocation.x -= 0
                cc.gameSpace.TroopLocation.y += 200
                let moveTo = cc.moveBy(0.5, 0, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else {
            if (ydistance > 0) {
                cc.gameSpace.TroopLocation.x += 200
                cc.gameSpace.TroopLocation.y -= 200
                let moveTo = cc.moveBy(0.5, 200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                cc.gameSpace.TroopLocation.x += 200
                cc.gameSpace.TroopLocation.y -= 0
                let moveTo = cc.moveBy(0.5, 200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                cc.gameSpace.TroopLocation.x += 200
                cc.gameSpace.TroopLocation.y += 200
                let moveTo = cc.moveBy(0.5, 200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        }

    },

    KnightAtacked: function (xdistance, ydistance) {
        //find the troop node and get the position
        this.notChooseAll()
        this.avatarLoseLive('knight', 0.5)
        let ArcherAvatar = cc.find('Canvas/background/BottomCity/knight')
        if (xdistance > 0) {
            if (ydistance > 0) {
                cc.gameSpace.KnightLocation.x -= 200
                cc.gameSpace.KnightLocation.y -= 200
                let moveTo = cc.moveBy(0.5, -200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                cc.gameSpace.KnightLocation.x -= 200
                cc.gameSpace.KnightLocation.y -= 0
                let moveTo = cc.moveBy(0.5, -200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                cc.gameSpace.KnightLocation.x -= 200
                cc.gameSpace.KnightLocation.y += 200
                let moveTo = cc.moveBy(0.5, -200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else if (xdistance == 0) {
            if (ydistance > 0) {
                cc.gameSpace.KnightLocation.x -= 0
                cc.gameSpace.KnightLocation.y -= 200
                let moveTo = cc.moveBy(0.5, 0, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance < 0) {
                cc.gameSpace.KnightLocation.x -= 0
                cc.gameSpace.KnightLocation.y += 200
                let moveTo = cc.moveBy(0.5, 0, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else {
            if (ydistance > 0) {
                cc.gameSpace.KnightLocation.x += 200
                cc.gameSpace.KnightLocation.y -= 200
                let moveTo = cc.moveBy(0.5, 200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                cc.gameSpace.KnightLocation.x += 200
                cc.gameSpace.KnightLocation.y -= 0
                let moveTo = cc.moveBy(0.5, 200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                cc.gameSpace.KnightLocation.x += 200
                cc.gameSpace.KnightLocation.y += 200
                let moveTo = cc.moveBy(0.5, 200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        }
    },
    ArcherAtacked: function (xdistance, ydistance) {
        //find the troop node and get the position
        this.notChooseAll()

        this.avatarLoseLive('archer', 0.5)
        let ArcherAvatar = cc.find('Canvas/background/BottomCity/archer')
        if (xdistance > 0) {
            if (ydistance > 0) {
                cc.gameSpace.ArcherLocation.x -= 200
                cc.gameSpace.ArcherLocation.y -= 200
                let moveTo = cc.moveBy(0.5, -200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                cc.gameSpace.ArcherLocation.x -= 200
                cc.gameSpace.ArcherLocation.y -= 0
                let moveTo = cc.moveBy(0.5, -200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                cc.gameSpace.ArcherLocation.x -= 200
                cc.gameSpace.ArcherLocation.y += 200
                let moveTo = cc.moveBy(0.5, -200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else if (xdistance == 0) {
            if (ydistance > 0) {
                cc.gameSpace.ArcherLocation.x -= 0
                cc.gameSpace.ArcherLocation.y -= 200
                let moveTo = cc.moveBy(0.5, 0, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance < 0) {
                cc.gameSpace.ArcherLocation.x -= 0
                cc.gameSpace.ArcherLocation.y += 200
                let moveTo = cc.moveBy(0.5, 0, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else {
            if (ydistance > 0) {
                cc.gameSpace.ArcherLocation.x += 200
                cc.gameSpace.ArcherLocation.y -= 200
                let moveTo = cc.moveBy(0.5, 200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                cc.gameSpace.ArcherLocation.x += 200
                cc.gameSpace.ArcherLocation.y -= 0
                let moveTo = cc.moveBy(0.5, 200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                cc.gameSpace.ArcherLocation.x += 200
                cc.gameSpace.ArcherLocation.y += 200
                let moveTo = cc.moveBy(0.5, 200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        }

    },


    Troop2Atacked: function (xdistance, ydistance) {
        //find the troop node and get the position
        this.notChooseAll()

        this.avatarLoseLive('troop2', 0.5)
        let ArcherAvatar = cc.find('Canvas/background/LeftCity/troop')
        if (xdistance > 0) {
            if (ydistance > 0) {
                cc.gameSpace.TroopLocation2.x -= 200
                cc.gameSpace.TroopLocation2.y -= 200
                let moveTo = cc.moveBy(0.5, -200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                cc.gameSpace.TroopLocation2.x -= 200
                cc.gameSpace.TroopLocation2.y -= 0
                let moveTo = cc.moveBy(0.5, -200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                cc.gameSpace.TroopLocation2.x -= 200
                cc.gameSpace.TroopLocation2.y += 200
                let moveTo = cc.moveBy(0.5, -200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else if (xdistance == 0) {
            if (ydistance > 0) {
                cc.gameSpace.TroopLocation2.x -= 0
                cc.gameSpace.TroopLocation2.y -= 200
                let moveTo = cc.moveBy(0.5, 0, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance < 0) {
                cc.gameSpace.TroopLocation2.x -= 0
                cc.gameSpace.TroopLocation2.y += 200
                let moveTo = cc.moveBy(0.5, 0, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else {
            if (ydistance > 0) {
                cc.gameSpace.TroopLocation2.x += 200
                cc.gameSpace.TroopLocation2.y -= 200
                let moveTo = cc.moveBy(0.5, 200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                cc.gameSpace.TroopLocation2.x += 200
                cc.gameSpace.TroopLocation2.y -= 0
                let moveTo = cc.moveBy(0.5, 200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                cc.gameSpace.TroopLocation2.x += 200
                cc.gameSpace.TroopLocation2.y += 200
                let moveTo = cc.moveBy(0.5, 200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        }
    },
    Knight2Atacked: function (xdistance, ydistance) {
        this.notChooseAll()
        console.log('knight2 atacked')
        this.avatarLoseLive('knight2', 0.5)
        let ArcherAvatar = cc.find('Canvas/background/LeftCity/knight')
        if (xdistance > 0) {
            if (ydistance > 0) {
                cc.gameSpace.KnightLocation2.x -= 200
                cc.gameSpace.KnightLocation2.y -= 200
                let moveTo = cc.moveBy(0.5, -200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                cc.gameSpace.KnightLocation2.x -= 200
                cc.gameSpace.KnightLocation2.y -= 0
                let moveTo = cc.moveBy(0.5, -200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                cc.gameSpace.KnightLocation2.x -= 200
                cc.gameSpace.KnightLocation2.y += 200
                let moveTo = cc.moveBy(0.5, -200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else if (xdistance == 0) {
            if (ydistance > 0) {
                cc.gameSpace.KnightLocation2.x -= 0
                cc.gameSpace.KnightLocation2.y -= 200
                let moveTo = cc.moveBy(0.5, 0, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance < 0) {
                cc.gameSpace.KnightLocation2.x -= 0
                cc.gameSpace.KnightLocation2.y += 200
                let moveTo = cc.moveBy(0.5, 0, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else {
            if (ydistance > 0) {
                cc.gameSpace.KnightLocation2.x += 200
                cc.gameSpace.KnightLocation2.y -= 200
                let moveTo = cc.moveBy(0.5, 200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                cc.gameSpace.KnightLocation2.x += 200
                cc.gameSpace.KnightLocation2.y -= 0
                let moveTo = cc.moveBy(0.5, 200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                cc.gameSpace.KnightLocation2.x += 200
                cc.gameSpace.KnightLocation2.y += 200
                let moveTo = cc.moveBy(0.5, 200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        }
    },

    Archer2Atacked: function (xdistance, ydistance) {
        //find the troop node and get the position
        this.notChooseAll()

        this.avatarLoseLive('archer2', 0.5)
        let ArcherAvatar = cc.find('Canvas/background/LeftCity/archer')
        if (xdistance > 0) {
            if (ydistance > 0) {
                cc.gameSpace.ArcherLocation2.x -= 200
                cc.gameSpace.ArcherLocation2.y -= 200
                let moveTo = cc.moveBy(0.5, -200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                cc.gameSpace.ArcherLocation2.x -= 200
                cc.gameSpace.ArcherLocation2.y -= 0
                let moveTo = cc.moveBy(0.5, -200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                cc.gameSpace.ArcherLocation2.x -= 200
                cc.gameSpace.ArcherLocation2.y += 200
                let moveTo = cc.moveBy(0.5, -200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else if (xdistance == 0) {
            if (ydistance > 0) {
                cc.gameSpace.ArcherLocation2.x -= 0
                cc.gameSpace.ArcherLocation2.y -= 200
                let moveTo = cc.moveBy(0.5, 0, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance < 0) {
                cc.gameSpace.ArcherLocation2.x -= 200
                cc.gameSpace.ArcherLocation2.y += 200
                let moveTo = cc.moveBy(0.5, 0, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else {
            if (ydistance > 0) {
                cc.gameSpace.ArcherLocation2.x += 200
                cc.gameSpace.ArcherLocation2.y -= 200
                let moveTo = cc.moveBy(0.5, 200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                cc.gameSpace.ArcherLocation2.x += 200
                cc.gameSpace.ArcherLocation2.y -= 0
                let moveTo = cc.moveBy(0.5, 200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                cc.gameSpace.ArcherLocation2.x += 200
                cc.gameSpace.ArcherLocation2.y += 200
                let moveTo = cc.moveBy(0.5, 200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        }
    },


    Troop3Atacked: function (xdistance, ydistance) {
        this.notChooseAll()

        this.avatarLoseLive('troop3', 0.5)
        let ArcherAvatar = cc.find('Canvas/background/RightCity/troop')
        if (xdistance > 0) {
            if (ydistance > 0) {
                cc.gameSpace.TroopLocation3.x -= 200
                cc.gameSpace.TroopLocation3.y -= 200
                let moveTo = cc.moveBy(0.5, -200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                cc.gameSpace.TroopLocation3.x -= 200
                cc.gameSpace.TroopLocation3.y -= 0
                let moveTo = cc.moveBy(0.5, -200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                cc.gameSpace.TroopLocation3.x -= 200
                cc.gameSpace.TroopLocation3.y += 200
                let moveTo = cc.moveBy(0.5, -200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else if (xdistance == 0) {
            if (ydistance > 0) {
                cc.gameSpace.TroopLocation3.x -= 0
                cc.gameSpace.TroopLocation3.y -= 200
                let moveTo = cc.moveBy(0.5, 0, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance < 0) {
                cc.gameSpace.TroopLocation3.x -= 0
                cc.gameSpace.TroopLocation3.y += 200
                let moveTo = cc.moveBy(0.5, 0, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else {
            if (ydistance > 0) {
                cc.gameSpace.TroopLocation3.x += 200
                cc.gameSpace.TroopLocation3.y -= 200
                let moveTo = cc.moveBy(0.5, 200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                cc.gameSpace.TroopLocation3.x += 200
                cc.gameSpace.TroopLocation3.y -= 0
                let moveTo = cc.moveBy(0.5, 200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                cc.gameSpace.TroopLocation3.x += 200
                cc.gameSpace.TroopLocation3.y += 200
                let moveTo = cc.moveBy(0.5, 200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        }

    },

    Knight3Atacked: function (xdistance, ydistance) {
        this.notChooseAll()

        this.avatarLoseLive('knight3', 0.5)
        let ArcherAvatar = cc.find('Canvas/background/RightCity/knight')
        if (xdistance > 0) {
            if (ydistance > 0) {
                cc.gameSpace.KnightLocation3.x -= 200
                cc.gameSpace.KnightLocation3.y -= 200
                let moveTo = cc.moveBy(0.5, -200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                cc.gameSpace.KnightLocation3.x -= 200
                cc.gameSpace.KnightLocation3.y -= 0
                let moveTo = cc.moveBy(0.5, -200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                cc.gameSpace.KnightLocation3.x -= 200
                cc.gameSpace.KnightLocation3.y += 200
                let moveTo = cc.moveBy(0.5, -200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else if (xdistance == 0) {
            if (ydistance > 0) {
                cc.gameSpace.KnightLocation3.x -= 0
                cc.gameSpace.KnightLocation3.y -= 200
                let moveTo = cc.moveBy(0.5, 0, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance < 0) {
                cc.gameSpace.KnightLocation3.x -= 0
                cc.gameSpace.KnightLocation3.y += 200
                let moveTo = cc.moveBy(0.5, 0, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else {
            if (ydistance > 0) {
                cc.gameSpace.KnightLocation3.x += 200
                cc.gameSpace.KnightLocation3.y -= 200
                let moveTo = cc.moveBy(0.5, 200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                cc.gameSpace.KnightLocation3.x += 200
                cc.gameSpace.KnightLocation3.y -= 0
                let moveTo = cc.moveBy(0.5, 200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                cc.gameSpace.KnightLocation3.x += 200
                cc.gameSpace.KnightLocation3.y += 200
                let moveTo = cc.moveBy(0.5, 200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        }
    },

    Archer3Atacked: function (xdistance, ydistance) {
        this.notChooseAll()

        this.avatarLoseLive('archer3', 0.5)
        let ArcherAvatar = cc.find('Canvas/background/RightCity/archer')
        if (xdistance > 0) {
            if (ydistance > 0) {
                cc.gameSpace.ArcherLocation3.x -= 200
                cc.gameSpace.ArcherLocation3.x -= 200
                let moveTo = cc.moveBy(0.5, -200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                cc.gameSpace.ArcherLocation3.x -= 200
                cc.gameSpace.ArcherLocation3.x -= 0
                let moveTo = cc.moveBy(0.5, -200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                cc.gameSpace.ArcherLocation3.x -= 200
                cc.gameSpace.ArcherLocation3.x += 200
                let moveTo = cc.moveBy(0.5, -200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else if (xdistance == 0) {
            if (ydistance > 0) {
                cc.gameSpace.ArcherLocation3.x -= 0
                cc.gameSpace.ArcherLocation3.x -= 200
                let moveTo = cc.moveBy(0.5, 0, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance < 0) {
                cc.gameSpace.ArcherLocation3.x -= 0
                cc.gameSpace.ArcherLocation3.x += 200
                let moveTo = cc.moveBy(0.5, 0, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        } else {
            if (ydistance > 0) {
                cc.gameSpace.ArcherLocation3.x += 200
                cc.gameSpace.ArcherLocation3.x -= 200
                let moveTo = cc.moveBy(0.5, 200, -200)
                return ArcherAvatar.runAction(moveTo)
            } else if (ydistance == 0) {
                cc.gameSpace.ArcherLocation3.x += 200
                cc.gameSpace.ArcherLocation3.x -= 0
                let moveTo = cc.moveBy(0.5, 200, 0)
                return ArcherAvatar.runAction(moveTo)
            } else {
                cc.gameSpace.ArcherLocation3.x += 200
                cc.gameSpace.ArcherLocation3.x += 200
                let moveTo = cc.moveBy(0.5, 200, 200)
                return ArcherAvatar.runAction(moveTo)
            }
        }
    },


    leftcityLoseLive: function () {
        let leftCity = cc.find('Canvas/background/LeftCity/leftCityLive')
        let live = leftCity.getComponent(cc.ProgressBar)
        live.progress -= 0.25
        if (live.progress <= 0) {
            cc.gameSpace.Player2Live = false
        }
    },

    rightcityLoseLive: function () {
        let rightCity = cc.find('Canvas/background/RightCity/rightCityLive')
        let live = rightCity.getComponent(cc.ProgressBar)
        live.progress -= 0.25
        if (live.progress <= 0) {
            cc.gameSpace.Player3Live = false
        }
    },

    bottomcityLoseLive: function () {
        let bottomCity = cc.find('Canvas/background/BottomCity/bottomCityLive')
        let live = bottomCity.getComponent(cc.ProgressBar)
        live.progress -= 0.25
        if (live.progress <= 0) {
            cc.gameSpace.Player1Live = false
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
        }else if (nodeName == 'troop2') {
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
        } else if (nodeName == 'troop3') {
            let troopAvatar = cc.find('Canvas/background/RightCity/troop')
            let trooplive = troopAvatar.children[0].getComponent(cc.ProgressBar)
            trooplive.progress -= num
            if (trooplive.progress <= 0) {
                //if the troop live < 0 go back to the start position
            }
        } else if (nodeName == 'knight3') {
            let knightAvatar = cc.find('Canvas/background/RightCity/knight')
            let knightLive = knightAvatar.children[0].getComponent(cc.ProgressBar)
            knightLive.progress -= num
        } else if (nodeName == 'archer3') {
            let archerAvatar = cc.find('Canvas/background/RightCity/archer')
            let archerlive = archerAvatar.children[0].getComponent(cc.ProgressBar)
            archerlive.progress -= num
        }
    },

    update(dt) { },
});
