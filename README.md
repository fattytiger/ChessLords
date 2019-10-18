#Project Description
### 基于Cocos-Bcx 的多人匹配即时战旗游戏
####技术选型
>##### 前端使用原生JavasScript语言 涉及到ES6,7部分语法
>##### 后端以Express框架为基础，主要运用websocket长链接技术
>##### 本游戏以Cocos-Bcx为主链进行相关游戏内容的开发 

### 项目进度
+ 目前游戏前端逻辑已经基本完成
+ 服务器已经搭建完成，并且能和前端进行一些简单的交互
+ 可以成功连接到Cocos-bcx主链，用户可以使用钱包进行注册，登录，锁定等功能
+ 已经在链上部署了一些简单的智能合约

### 前端项目架构
│  app.js
│  app.js.meta
│  cocosBcxSDK.meta
│  common.meta
│  fight.js
│  fight.js.meta
│  framwork.meta
│  Login.js
│  Login.js.meta
│  Player.meta
│  tool.meta
│
├─cocosBcxSDK
│      bcx.min.js
│      bcx.min.js.meta
│      bcxAdapter.js
│      bcxAdapter.js.meta
│      core.min.js
│      core.min.js.meta
│      plugins.min.js
│      plugins.min.js.meta
│
├─common
│      loaderManager.js
│      loaderManager.js.meta
│      mapNodeLocation.js
│      mapNodeLocation.js.meta
│      mapNodeStatus.js
│      mapNodeStatus.js.meta
│      Table.js
│      Table.js.meta
│
├─framwork
│      clientEvent.js
│      clientEvent.js.meta
│      eventListener.js
│      eventListener.js.meta
│      HttpEvent.js
│      HttpEvent.js.meta
│      mouseOption.js
│      mouseOption.js.meta
│      NetInfo.js
│      NetInfo.js.meta
│      poolManager.js
│      poolManager.js.meta
│      SoundManage.js
│      SoundManage.js.meta
│      uiManager.js
│      uiManager.js.meta
│
├─Player
│  │  Animations.js
│  │  Animations.js.meta
│  │  bottomplayer.js
│  │  bottomplayer.js.meta
│  │  bottomplayer.meta
│  │  City.js
│  │  City.js.meta
│  │  Fighting.js
│  │  Fighting.js.meta
│  │  leftPlayer.js
│  │  leftPlayer.js.meta
│  │  leftplayer.meta
│  │  MapBlocks.js
│  │  MapBlocks.js.meta
│  │  playerAction.js
│  │  playerAction.js.meta
│  │  playerFightCity.js
│  │  playerFightCity.js.meta
│  │  rightPlayer.js
│  │  rightPlayer.js.meta
│  │  rightplayer.meta
│  │
│  ├─bottomplayer
│  │  │  BottomPlayer.js
│  │  │  BottomPlayer.js.meta
│  │  │  solider.meta
│  │  │
│  │  └─solider
│  │          bottomArcher.js
│  │          bottomArcher.js.meta
│  │          bottomKnight.js
│  │          bottomKnight.js.meta
│  │          bottomTroop.js
│  │          bottomTroop.js.meta
│  │
│  ├─leftplayer
│  │  │  leftPlayer.js
│  │  │  leftPlayer.js.meta
│  │  │  solider.meta
│  │  │
│  │  └─solider
│  │          leftArcher.js
│  │          leftArcher.js.meta
│  │          leftKnight.js
│  │          leftKnight.js.meta
│  │          leftTroop.js
│  │          leftTroop.js.meta
│  │
│  └─rightplayer
│      │  rightPlayer.js
│      │  rightPlayer.js.meta
│      │  solider.meta
│      │
│      └─solider
│              rightArcher.js
│              rightArcher.js.meta
│              rightKnight.js
│              rightKnight.js.meta
│              rightTroop.js
│              rightTroop.js.meta
│
└─tool
	

### 后端项目架构
│  index.js
│  package-lock.json
│  package.json
│
├─.idea
│      cocosServer.iml
│      misc.xml
│      modules.xml
│      vcs.xml
│      workspace.xml
│
├─gameSpace
│  │  mathing.js
│  │
│  └─bottomPlayer
│      └─bottomTroopMove
│              troopMove
│
├─JudgeData
│      common.js
│
├─lib
│      index.js
│
├─node_modules

###基本展示

+ 进入项目显示
![into](https://706f-point-28b6b8-1256633983.tcb.qcloud.la/projectscreenshot/01.jpg?sign=99e95fba28412f64255b59c470f077ec&t=1571399118)

+ 镜头放大
![into](https://706f-point-28b6b8-1256633983.tcb.qcloud.la/projectscreenshot/holemap.jpg?sign=a20b993a10b3762c671dcaa185da6d59&t=1571399793)

+ 镜头缩小
![into](https://706f-point-28b6b8-1256633983.tcb.qcloud.la/projectscreenshot/smallmap.jpg?sign=524261286551eef31a5e1d19d57db94e&t=1571399844)

+ 鼠标移入
![into](https://706f-point-28b6b8-1256633983.tcb.qcloud.la/projectscreenshot/clected.jpg?sign=ef6caf77c926b2b3902cb0d3b9f7e6ff&t=1571399481)

+ 选中你的士兵
![into](https://706f-point-28b6b8-1256633983.tcb.qcloud.la/projectscreenshot/slected.jpg?sign=2ccb9ef450dff2a1112eae19c2d8fa3a&t=1571399723)


+ 移动消耗体力
![movelisestamin](https://706f-point-28b6b8-1256633983.tcb.qcloud.la/projectscreenshot/movelosestamin.jpg?sign=bfd24f90a6b8c1abab78d85582420c6d&t=1571399171)

+ 靠近敌人显示攻击提示
![nearhavebandit](https://706f-point-28b6b8-1256633983.tcb.qcloud.la/projectscreenshot/nearhavebandit.jpg?sign=82bdbaa44d5f355fe4aa64b14d2c5d31&t=1571399378)


+ 靠近城市显示攻击提示
![into](https://706f-point-28b6b8-1256633983.tcb.qcloud.la/projectscreenshot/nearhaveothercity.jpg?sign=23d79cdb2c828c6b8eed94433dea12b5&t=1571399455)

+ 攻击敌人敌人掉血
![attackbandit](https://706f-point-28b6b8-1256633983.tcb.qcloud.la/projectscreenshot/attackbandit.jpg?sign=497c9d319dbf697ca8d8d1886a19c674&t=1571399416)

+ 攻击城市掉血
![into](https://706f-point-28b6b8-1256633983.tcb.qcloud.la/projectscreenshot/attckthecity.jpg?sign=65fb22d3fc9aaa5cc19ef3d7529b338d&t=1571399760)


