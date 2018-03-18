(function(){

  function startRuntime(update, render, subscriptions, model){
var currentSubs = [];

function onEvent(ev){
    modelTask = update(ev, model);
    model = modelTask[0];
    var task = modelTask[1];
    runEffect(task);
    currentSubs = handleSubs(subscriptions(model));
    render(model);
}

function runEffect(effec){
  effec();
}
  
function partitionById(subsN, subsC){
    const act = [], dis = [];
    const subsNFlatten = subsN.map( (sn) => { return sn[0] } );
    subsC.forEach( sc => {
      if(subsNFlatten.includes(sc[0])){
        act.push(sc)
      }else{
        dis.push(sc)
      }
    });
    return [act,dis];
  }
  
  function handleSubs(comingSubs){
    const newSubs = [];
    const activesAndDiscard = partitionById(comingSubs, currentSubs);
    const actives = activesAndDiscard[0];
    const discard = activesAndDiscard[1];
    const onlyNews = partitionById(actives, comingSubs)[1];
    onlyNews.forEach(on => newSubs.push([on[0],on[1](onEvent)]) );
    discard.forEach(ds => ds[1]() );
    actives.forEach( ac => newSubs.push(ac) )
    return newSubs;
  }
  
  onEvent(new CustomEvent('start', {'detail': ''}))
}

  
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 180;
document.body.appendChild(canvas);
const floorY = 180-35;

var mario_walk_right = new Image
mario_walk_right.src = "mario_right_walking.png";

var mario_walk_left = new Image
mario_walk_left.src = "mario_left_walking.png";


var mario_stand_right = new Image
mario_stand_right.src = "right.gif";

var mario_stand_left = new Image
mario_stand_left.src = "left.gif";

var mario_jump_right = new Image
mario_jump_right.src = "jump_right.gif";

var mario_jump_left = new Image
mario_jump_left.src = "jump_left.gif";

var jump_audio = new Audio
jump_audio.src = "jump-c-07.mp3";

const model = {x: 320 / 2, y:  floorY, vx: 0, vy: 0 ,dir: 'right', t: 0.0};

var walking = [{"x":0,"y":0,"w":27,"h":27},{"x":27,"y":0,"w":27,"h":27},{"x":54,"y":0,"w":27,"h":27},{"x":81,"y":0,"w":27,"h":27},{"x":108,"y":0,"w":27,"h":27},{"x":135,"y":0,"w":27,"h":27},{"x":162,"y":0,"w":27,"h":27},{"x":189,"y":0,"w":27,"h":27}] 


const PassageOfTime = 'PassageOfTime';
const ArrowLeftPressed = 'ArrowLeftPressed';
const ArrowRightPressed = 'ArrowRightPressed';
const ArrowLeftReleased = 'ArrowLeftReleased';
const ArrowRightReleased = 'ArrowRightReleased';
const ArrowUpPressed = 'ArrowUpPressed';

  
const subAnimation = createSub('subAnimation', function(subscriber){
  var id; 
  const startTime = performance.now();
  function keepAnimation(time){
      const t = (time - startTime);
      subscriber(new CustomEvent(PassageOfTime, {'detail': t}))
      id = window.requestAnimationFrame(keepAnimation);
    }
   id = window.requestAnimationFrame(keepAnimation);
    () => window.cancelAnimationFrame(id);
});


const gravity = 0.25

const applyGravity = (model) => {
    if(model.y <= floorY){
        model.vy = model.vy + gravity;
      return model;
    }else{
      model.vy = 0;
        return model;
    }
}
 const applyMotion = (model ) => {
    model.x = model.x + model.vx; 
    model.y = Math.min(floorY, model.y + 3 * model.vy);
    return model ;
 }
const walkLeft = (model) => {
    model.vx = -1.5;
    model.dir = 'left';
    return model;
}

const walkRight = (model) => {
    model.vx = 1.5;
    model.dir = 'right';
    return model;
}

const jump = (model) => {
    model.vy = -5.0;
    return model;
} 
const applyPhysics = (model) => applyGravity(applyMotion(model))

function render(model){
  ctx.fillStyle = "#1099bb";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  var i = parseInt((model.t % (8*80))/80)
  var img = walking[i];
  if(model.y < floorY){
    if(model.dir === 'right'){
        ctx.drawImage(mario_jump_right,model.x,model.y);
      }else{
        ctx.drawImage(mario_jump_left,model.x,model.y);
      }
  }
  if(model.vx > 0){
    ctx.drawImage(mario_walk_right,img.x,img.y,img.w,img.h,model.x,model.y,27,27);
  }else if(model.vx === 0){
      if(model.dir === 'right'){
        ctx.drawImage(mario_stand_right,model.x,model.y);
      }else{
        ctx.drawImage(mario_stand_left,model.x,model.y);
      }
    }else{
    ctx.drawImage(mario_walk_left,img.x,img.y,img.w,img.h,model.x,model.y,27,27);
  }
  ctx.imageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  canvas.style.imageRendering = 'pixelated';
}

function empty(){
}

function jumpSound(){
  jump_audio.play();
}

function update(ev, model){
    switch(ev.type){
        case ArrowUpPressed:
            if(model.y >= floorY){
                return [jump(applyPhysics(model)), jumpSound];
            }
          return [model, empty];
        case ArrowLeftPressed:
            return [walkLeft(applyPhysics(model)), empty];
        case ArrowRightPressed:
            return [walkRight(applyPhysics(model)), empty];
        case ArrowLeftReleased:
            model.vx = 0;
            return [model, empty];
        case ArrowRightReleased:
            model.vx = 0;
            return [model, empty];
        case PassageOfTime:
            model.t = ev.detail;
            return [applyPhysics(model), empty];
        default:
          return [model, empty];
    }
}

function createSub(name,cancellable){
  return [name, cancellable];
}

const presssEvents = createSub('pressEvents', function(subscriber){
  const handler = (e) => {
  switch(e.keyCode){
    case 37: 
      subscriber(new CustomEvent(ArrowLeftPressed, {'detail': e.keyCode}))
      break;
    case 39:
      subscriber(new CustomEvent(ArrowRightPressed, {'detail': e.keyCode}))
      break;
    case 38:
      subscriber(new CustomEvent(ArrowUpPressed, {'detail': e.keyCode}))
      break;
  } 
};
  window.addEventListener('keydown', handler, true);
  () => window.removeEventListener('keydown', handler, true);
});

const releaseEvents = createSub('releaseEvents', function(subscriber){
  const handler = (e) => {
  switch(e.keyCode){
    case 37: 
      subscriber(new CustomEvent(ArrowLeftReleased, {'detail': e.keyCode}))
      break;
    case 39:
      subscriber(new CustomEvent(ArrowRightReleased, {'detail': e.keyCode}))
      break;
  } 
}; 
  window.addEventListener('keyup', handler, true);
  () => window.removeEventListener('keyup', handler, true);
});

const gamePads = createSub('gamePad', function(subscriber){
  var left = false;
  var right = false;
  var up = false;

  var id = setInterval(function(){
    var gp = navigator.getGamepads()[0];
  if(gp){
    const axisXNew = gp.axes[0], axisYNew = gp.axes[1];
    if(axisXNew > 0.1 && !right){
        right = !right;
        subscriber(new CustomEvent(ArrowRightPressed, {}))
    }
    if(axisXNew < 0.0 && right){
        right = !right;
        subscriber(new CustomEvent(ArrowRightReleased, {}))
    }
    if(axisXNew < -0.1 && !left){
        left = !left;
        subscriber(new CustomEvent(ArrowLeftPressed, {}))
    }
    if(axisXNew > 0.0 && left){
        left = !left;
        subscriber(new CustomEvent(ArrowLeftReleased, {}))
    }

    if(axisYNew < -0.1 && !up){
        up = !up;
        subscriber(new CustomEvent(ArrowUpPressed, {}))
    }
    if(axisYNew > 0.0 && up){
        up = !up;
    }
  }
}, 33);
  
() => {
  clearInterval(id);
}
});

function subscriptions(model){
  return [releaseEvents,presssEvents, subAnimation, gamePads];
}
  

  






  ///-------- debug


  const Wrapper = 'Wrapper'
  const Pause = 'Pause'
  const Play = 'Play'
  const Lookup = 'Lookup'
  const msg_init = new CustomEvent('start', {'detail': ''})
  const debug_model = {pause: false, states: [ {msg: msg_init, model: model}], index: 0}
  var button = document.querySelector("button");
  var input = document.querySelector("input");

  function debugger_render(d_model){
    if(!model.pause){
      button.innerHTML = '||';
      input.disabled = false;
    }else{
      button.innerHTML = '>';
      input.disabled = true;
    }
    input.mix = 0;
    input.max = d_model.states.lenght;
    input.value = d_model.states.lenght;
    input.step = 1;

    var indx;
     if (d_model.index - 1 > 0) {
      indx = d_model.index - 1
    } else {
      indx = 0;
    }

    console.log(d_model.states[indx].model)
    render(d_model.states[indx].model)
  }

  function debugger_update(msg, model){
      switch(msg.type){
        case Play:
          model.pause = false;
          model.index = model.states.length;
          return [model, empty]

        case Pause: 
          model.pause = true;
          pause.index = model.states.length;
          return [model, empty];

        case Wrapper:
          const me = update(msg.detail,model.states[model.states.length-1].model)
          model.states.push({msg: msg.detail, model: me[0]})
          return [model, me[1]];

        case Lookup:
        var item;
          if(msg.detail - 1 > 0 ){
            item = model.states[msg.detail - 1]
          }else{
            item = model.states[0]
          }
          const mt = update(item.msg, item.model)
          return [m[0], m[1]];

        default:
          return [model, empty];
        }

  }

  function debugger_subscriptions(d_model){
    var input = document.querySelector("input");
    if(!d_model.pause){
      console.log(d_model.states.length)
      return subscriptions(d_model.states[d_model.states.length-1].model)
    }else{
      return [createSub("slider", function(subscriber){
        const handler = function(event){
          subscriber(event.detail)
        };
        input.addEventListener("value", handler);

        () => input.removeEventListener("value", handler)

      })];
    }
  }


  //startRuntime(debugger_update, debugger_render, debugger_subscriptions, debug_model);

 startRuntime(update, render, subscriptions, model);


})();



