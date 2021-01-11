System.register("chunks:///Player.js",["./_virtual/_rollupPluginBabelHelpers.js","cc"],(function(e,t){var i,o,n,r,c,s,a,p,u,l,h,d,f,y,m,b,v,g,S,_,w,j,x,K,D,P;return e({_dec:void 0,_dec2:void 0,_class:void 0,_class2:void 0,_descriptor:void 0,_descriptor2:void 0,_descriptor3:void 0,_descriptor4:void 0,_descriptor5:void 0,_temp:void 0}),{setters:[function(e){i=e.applyDecoratedDescriptor,o=e.inheritsLoose,n=e.defineProperty,r=e.assertThisInitialized,c=e.initializerDefineProperty},function(e){s=e.cclegacy,a=e._decorator,p=e.AudioClip,u=e.AudioSource,l=e.systemEvent,h=e.SystemEventType,d=e.macro,f=e.tween,y=e.Vec3,m=e.Component}],execute:function(){s._RF.push({},"0965e8xHzdPbboYyt63FRma","Player",void 0),D=a.ccclass,P=a.property,e("Player",(b=D("Player"),v=P({type:p}),b((_=i((S=function(e){function t(){for(var t,i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return t=e.call.apply(e,[this].concat(o))||this,n(r(t),"accelLeft",!1),n(r(t),"accelRight",!1),n(r(t),"xSpeed",0),c(r(t),"jumpHeight",_,r(t)),c(r(t),"jumpDuration",w,r(t)),c(r(t),"maxMoveSpeed",j,r(t)),c(r(t),"accel",x,r(t)),n(r(t),"audioSrc",new u("jump")),c(r(t),"jumpClip",K,r(t)),n(r(t),"tween",void 0),t}o(t,e);var i=t.prototype;return i.onLoad=function(){console.log("when started: "+this.accelLeft),l.on(h.KEY_DOWN,this.onKeyDown,this),l.on(h.KEY_UP,this.onKeyUp,this),this.setJumpAction()},i.onDestroy=function(){l.off(h.KEY_DOWN,this.onKeyDown,this),l.off(h.KEY_UP,this.onKeyUp,this)},i.onKeyDown=function(e){switch(e.keyCode){case d.KEY.right:this.accelRight=!0;break;case d.KEY.left:this.accelLeft=!0}},i.playJumpSound=function(e){this.jumpClip&&this.audioSrc&&this.audioSrc.playOneShot(this.jumpClip,1)},i.onKeyUp=function(e){switch(e.keyCode){case d.KEY.right:this.accelRight=!1;break;case d.KEY.left:this.accelLeft=!1}},i.setJumpAction=function(){var e=this;this.tween=f(this.node.position).to(this.jumpDuration,{y:this.jumpHeight},{easing:"cubicOut"}).to(this.jumpDuration,{y:-this.jumpHeight},{easing:"cubicIn",onComplete:function(){e.playJumpSound(e)}}).union().repeatForever().start()},i.update=function(e){this.accelLeft?this.xSpeed-=this.accel*e:this.accelRight&&(this.xSpeed+=this.accel*e),Math.abs(this.xSpeed)>this.maxMoveSpeed&&(this.xSpeed=this.maxMoveSpeed*this.xSpeed/Math.abs(this.xSpeed)),this.node.setPosition(new y(this.xSpeed*e+this.node.position.x,this.node.position.y,0))},t}(m)).prototype,"jumpHeight",[P],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),w=i(S.prototype,"jumpDuration",[P],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),j=i(S.prototype,"maxMoveSpeed",[P],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),x=i(S.prototype,"accel",[P],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),K=i(S.prototype,"jumpClip",[v],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),g=S))||g)),s._RF.pop()}}}));

System.register("chunks:///Star.js",["./_virtual/_rollupPluginBabelHelpers.js","cc"],(function(t,e){var i,n,a,o,s,r,c,u,p,h,l,d,g;return t({_dec:void 0,_class:void 0,_temp:void 0}),{setters:[function(t){i=t.inheritsLoose,n=t.createClass,a=t.defineProperty,o=t.assertThisInitialized},function(t){s=t.cclegacy,r=t._decorator,c=t.tween,u=t.Vec3,p=t.UIOpacity,h=t.Component}],execute:function(){s._RF.push({},"2a89btpXPRNTJ/HrXEXWyYw","Star",void 0),g=r.ccclass,r.property,t("Star",(l=g("Star"),l(d=function(t){function e(){for(var e,i=arguments.length,n=new Array(i),s=0;s<i;s++)n[s]=arguments[s];return e=t.call.apply(t,[this].concat(n))||this,a(o(e),"pickRadius",50),a(o(e),"game",null),e}i(e,t);var s=e.prototype;return s.onLoad=function(){c(this.node).to(.2,{scale:new u(1.5,1.5,0)},{easing:"cubicOut"}).to(.2,{scale:new u(1,1,0)},{easing:"cubicIn"}).union().repeatForever().start()},s.getPlayerDistance=function(){return u.distance(this.node.position,this.game.player.position)},s.onPicked=function(){this.game.spawnNewStar(),this.game.gainScore(),this.node.destroy()},s.update=function(t){this.getPlayerDistance()<this.pickRadius&&this.onPicked();var e=1-this.game.timer/this.game.starDuration;this.setOpacity(50+Math.floor(255*e-50))},s.setOpacity=function(t){this.node.getComponent(p).opacity=t},n(e,[{key:"Game",set:function(t){this.game=t},get:function(){return this.game}}]),e}(h))||d)),s._RF.pop()}}}));

System.register("chunks:///Game.js",["./_virtual/_rollupPluginBabelHelpers.js","cc","./Player.js","./Star.js"],(function(t,e){var r,i,o,n,a,l,s,u,c,p,d,h,m,v,f,g,b,y,S,_,w,C,z,D,P,B,O,G,L,j,x,N,V,A,E,H,I,M,Y,k,F,R,T;return t({_dec:void 0,_dec2:void 0,_dec3:void 0,_dec4:void 0,_dec5:void 0,_dec6:void 0,_dec7:void 0,_dec8:void 0,_class:void 0,_class2:void 0,_descriptor:void 0,_descriptor2:void 0,_descriptor3:void 0,_descriptor4:void 0,_descriptor5:void 0,_descriptor6:void 0,_descriptor7:void 0,_descriptor8:void 0,_descriptor9:void 0,_temp:void 0}),{setters:[function(t){r=t.applyDecoratedDescriptor,i=t.inheritsLoose,o=t.initializerDefineProperty,n=t.assertThisInitialized,a=t.defineProperty},function(t){l=t.cclegacy,s=t._decorator,u=t.Prefab,c=t.Node,p=t.Label,d=t.AudioClip,h=t.AudioSource,m=t.UITransform,v=t.EventHandler,f=t.Button,g=t.instantiate,b=t.Vec3,y=t.UIOpacity,S=t.game,_=t.Component},function(t){w=t.Player},function(t){C=t.Star}],execute:function(){l._RF.push({},"75ef0e2lP1Bvpvyxhz6+/3a","Game",void 0),R=s.ccclass,T=s.property,t("Game",(z=R("Game"),D=T({type:u}),P=T({type:c}),B=T({type:c}),O=T({type:c}),G=T({type:w}),L=T({type:p}),j=T({type:d}),z((V=r((N=function(t){function e(){for(var e,r=arguments.length,i=new Array(r),l=0;l<r;l++)i[l]=arguments[l];return e=t.call.apply(t,[this].concat(i))||this,o(n(e),"starPrefab",V,n(e)),o(n(e),"minStarDuration",A,n(e)),o(n(e),"maxStarDuration",E,n(e)),o(n(e),"ground",H,n(e)),o(n(e),"gameOverLabel",I,n(e)),o(n(e),"restartButton",M,n(e)),o(n(e),"player",Y,n(e)),o(n(e),"score",k,n(e)),a(n(e),"audioSrc",new h("collectStar")),o(n(e),"starCollected",F,n(e)),a(n(e),"scoreValue",0),a(n(e),"timer",0),a(n(e),"starDuration",0),a(n(e),"groundY",0),e}i(e,t);var r=e.prototype;return r.onLoad=function(){var t,e=null===(t=this.ground.getComponent(m))||void 0===t?void 0:t.contentSize.height;this.groundY=this.ground.position.y+e/2,this.spawnNewStar();var r=new v;r.target=this.node,r.component="Game",r.handler="restartCb",r.customEventData="foobar",this.restartButton.getComponent(f).clickEvents.push(r)},r.spawnNewStar=function(){var t=g(this.starPrefab);this.node.addChild(t),t.setPosition(this.getNewStarPosition()),t.getComponent(C).Game=this,this.starDuration=this.minStarDuration+Math.random()*(this.maxStarDuration-this.minStarDuration),this.timer=0},r.getNewStarPosition=function(){var t,e,r=this.groundY+Math.random()*this.player.getComponent(w).jumpHeight+50,i=(null===(t=this.node.getComponent(m))||void 0===t?void 0:t.contentSize.width)/2;return e=2*(Math.random()-.5)*i,new b(e,r,0)},r.gainScore=function(){this.scoreValue+=1,this.playCollectStart(),this.score.string="Score: "+this.scoreValue},r.playCollectStart=function(){this.audioSrc&&this.starCollected&&this.audioSrc.playOneShot(this.starCollected,1)},r.update=function(t){this.timer>this.starDuration&&this.gameOver(),this.timer+=t},r.gameOver=function(){this.gameOverLabel.getComponent(y).opacity=256,this.restartButton.getComponent(y).opacity=256,S.pause()},r.restartCb=function(t,e){S.resume(),S.restart()},e}(_)).prototype,"starPrefab",[D],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),A=r(N.prototype,"minStarDuration",[T],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),E=r(N.prototype,"maxStarDuration",[T],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),H=r(N.prototype,"ground",[P],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){}}),I=r(N.prototype,"gameOverLabel",[B],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),M=r(N.prototype,"restartButton",[O],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),Y=r(N.prototype,"player",[G],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),k=r(N.prototype,"score",[L],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),F=r(N.prototype,"starCollected",[j],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),x=N))||x)),l._RF.pop()}}}));

System.register("chunks:///TouchControl.js",["./_virtual/_rollupPluginBabelHelpers.js","cc","./Player.js"],(function(t,e){var n,o,i,r,c,a,l,s,u,p,h,d,y,f,T,v,_;return t({_dec:void 0,_dec2:void 0,_class:void 0,_class2:void 0,_descriptor:void 0,_temp:void 0}),{setters:[function(t){n=t.applyDecoratedDescriptor,o=t.inheritsLoose,i=t.initializerDefineProperty,r=t.assertThisInitialized},function(t){c=t.cclegacy,a=t._decorator,l=t.Node,s=t.UIOpacity,u=t.Component},function(t){p=t.Player}],execute:function(){c._RF.push({},"57e4eTEmrVN0bkj9M6YkDNE","TouchControl",void 0),v=a.ccclass,_=a.property,t("TouchControl",(h=v("TouchControl"),d=_({type:p}),h((T=n((f=function(t){function e(){for(var e,n=arguments.length,o=new Array(n),c=0;c<n;c++)o[c]=arguments[c];return e=t.call.apply(t,[this].concat(o))||this,i(r(e),"player",T,r(e)),e}o(e,t);var n=e.prototype;return n.start=function(){},n.onLoad=function(){var t=this;this.node.on(l.EventType.TOUCH_START,(function(){return t.onStartTouch()})),this.node.on(l.EventType.TOUCH_END,(function(){return t.onEndTouch()}))},n.onStartTouch=function(){this.node.getComponent(s).opacity=45,"Right"==this.node.name?this.player.accelRight=!0:"Left"==this.node.name&&(this.player.accelLeft=!0)},n.onEndTouch=function(){this.node.getComponent(s).opacity=35,"Right"==this.node.name?this.player.accelRight=!1:"Left"==this.node.name&&(this.player.accelLeft=!1)},e}(u)).prototype,"player",[d],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),y=f))||y)),c._RF.pop()}}}));

System.register("chunks:///_virtual/main",["../Player.js","../Star.js","../Game.js","../TouchControl.js"],(function(n,t){return{setters:[function(n){},function(n){},function(n){},function(n){}],execute:function(){}}}));

(function(r) {
  r('project:///assets/scripts/Player.js', 'chunks:///Player.js');
  r('project:///assets/scripts/Star.js', 'chunks:///Star.js');
  r('project:///assets/scripts/Game.js', 'chunks:///Game.js');
  r('project:///assets/scripts/TouchControl.js', 'chunks:///TouchControl.js');
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});