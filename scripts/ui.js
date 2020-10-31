const classes = {
    "Fluctuating Hexagons": Fluctuating_Hexagons
};

let canvasAnimation = {};

let animFrame = { h: 0, w: 0, isTarget: true };

var setupUI =  function(){
    let toggle_a = document.getElementById("toggle-a");
    toggle_a.addEventListener('click', toggleSettings);
    let toggle_b = document.getElementById("toggle-b");
    toggle_b.addEventListener('click', toggleJSON);
    initializeSelectList();
    let radioBtns = document.getElementsByName("animTarget");
    for (let i = 0; i < radioBtns.length; i++){
        radioBtns[i].addEventListener('click', function(){
            switchTarget(this.value);
        })
    }
    initializeAnimFrameDims();
    window.setInterval(function(){
        updateAnimFrameDims();
    }, 200);
}

var initializeAnimFrameDims = function(){
    let ele = document.getElementById("funAnimation");
    animFrame.w = ele.clientWidth;
    animFrame.h = ele.clientHeight;
    // ele.setAttribute("style","height:" + (animFrameDims.h+ 1).toString() + ";");
    // console.log(animFrameDims);
}

var updateAnimFrameDims = function(){
    if (animFrame.isTarget){
        let ele = document.getElementById("funAnimation");
        let w = ele.clientWidth;
        let h = ele.clientHeight;
        if (animFrame.w !== w || animFrame.h !== h){
            animFrame.w = w;
            animFrame.h = h;
            canvasAnimation.resizeCanvas();
        }
    }
}

var initializeSelectList = function(){
    let selector = document.getElementById("classSelector");
    for (var key in AnimationClasses){
        if (AnimationClasses.hasOwnProperty(key)){
            let option = document.createElement('option');
            option.setAttribute("value", key);
            option.innerText = key.replace("_"," ");
            selector.appendChild(option);
        }
    }
    selector.addEventListener('change', function() {
        createControls(selector.value)
        toggleSettings();
        updateSettingsJSON();
        canvasAnimation.resizeCanvas();
    });
}

var switchTarget = function(target){
    let eles = document.getElementsByName("animTargetEle");
    let oldCanvas = document.getElementById("animCanvas");
    animFrame.isTarget = !animFrame.isTarget;
    eles.forEach(element => {
        if (element.dataset.target === target){
            element.setAttribute("id","funAnimation");
            element.classList.remove("hide");
        } else {
            element.setAttribute("id","");
            element.classList.add("hide");
            element.removeChild(oldCanvas);
        }
    });
    let ele = document.getElementById("funAnimation");
    ele.innerHTML = null;
    let canvas = document.createElement('canvas');
    canvas.setAttribute('id',"animCanvas");
    ele.appendChild(canvas);
    if (canvasAnimation.resizeCanvas) {
        canvasAnimation.resizeCanvas();
    }
}

var toggleSettings = function(){ 
    let toggle_a = document.getElementById("toggle-a");
    toggle_a.classList.toggle("bottom");
    toggle_a.classList.toggle("right");
    let controls = document.getElementById("controlSection");
    controls.classList.toggle("hide");
}

var toggleJSON = function(){
    let toggle_b = document.getElementById("toggle-b");
    toggle_b.classList.toggle("bottom");
    toggle_b.classList.toggle("right");
    let json = document.getElementById("json");
    json.classList.toggle("hide");
}

var createControls = function(className){
    if (className === "") window.location="";
    let controlSection = document.getElementById("controlSection");
    controlSection.innerHTML = null;

    let animClass = getAnimClass(className);
    initializeAnimation({
        class: animClass
    });
    
    let settings = canvasAnimation.getSettings();
    delete settings.class;

    for (let [key, value] of Object.entries(settings)){
        controlSection.appendChild(createControl(key, value));
    }
}

var createControl = function(argKey,argVal,parentKey){
    let ele = document.createElement('div');
    ele.classList.add("control-sub-section");
    switch (typeof argVal){
        case "object":
            ele.innerText = argKey;
            for (let [key, value] of Object.entries(argVal)){
                ele.appendChild(createControl(key, value, argKey));
            }
            break;
        case "string":
            ele.appendChild(stringControl(argKey, argVal, parentKey));
            break;
        case "number":
            ele.appendChild(numberControl(argKey, argVal, parentKey));
            break;
    }
    return ele;
}

var stringControl = function(key, value, parentKey){
    let ele = document.createElement("div");
    ele.classList.add("control-item");
    let lbl = document.createElement("label");
    lbl.innerText = key;
    let txt = document.createElement("input");
    txt.setAttribute("type","text");
    txt.value = value;
    txt.addEventListener('change', function(){
        updateCanvasAnimation(parentKey,key,this.value);
        updateSettingsJSON();
    });
    ele.appendChild(lbl);
    ele.appendChild(txt);
    return ele;
}

var numberControl = function(key, value, parentKey){
    let ele = document.createElement("div");
    ele.classList.add("control-item");
    let lbl = document.createElement("label");
    lbl.innerText = key;
    let num = document.createElement("input");
    num.setAttribute("type","number");
    num.setAttribute("step",.5);
    num.value = value;
    num.addEventListener('change', function(){
        updateCanvasAnimation(parentKey,key,parseFloat(this.value));
        updateSettingsJSON();
        canvasAnimation.resizeCanvas();
    });
    ele.appendChild(lbl);
    ele.appendChild(num);
    return ele;
}

var updateCanvasAnimation = function (parentKey,key,value){
    if (parentKey){
        canvasAnimation[parentKey][key] = value;
    } else {
        canvasAnimation[key] = value;
    }
}

var updateSettingsJSON = function(){
    let json = document.getElementById("json");
    let settings = canvasAnimation.getSettings();
    json.innerText = JSON.stringify(settings,null,2);
    return settings;
}

var getAnimClass = function(className){
    // className = className.replace("_"," ");
    let animClass = AnimationClasses[className];
    delete animClass.targetElement;
    delete animClass.canvas;
    return animClass;
}

var initializeAnimation = function (animSettings) {
    animSettings.targetId = "funAnimation";
    animSettings.targetElement = document.getElementById(animSettings.targetId);
    animSettings.targetElement.innerHTML = null;
    animSettings.canvas = document.createElement('canvas');
    animSettings.canvas.setAttribute('id','animCanvas');
    animSettings.targetElement.appendChild(animSettings.canvas);
    canvasAnimation = new animSettings.class(animSettings);
};