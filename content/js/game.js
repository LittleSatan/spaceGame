// const remote = require('electron').remote;

let fps = 60,
    tileSize = 64,
    gwidth = 1280,
    gheight = 720,
    scene,
    c, ctx,
    state = "init",
    mouse = { x: 0, y: 0, leftButton: 0, rightButton: 0, wheel: 0 },
    keys,
    settings = new Settings(),
    electron,
    remote;

window.onload = function() {
    if ((navigator.userAgent).includes("Electron")) {
        electron = true;
        remote = require('electron').remote;
    }
    fps = 1000 / fps;
    keys = new Array(222);

    c = document.getElementById("gameCanvas");
    ctx = c.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "60px Courier";
    ctx.textAlign = "center";
    ctx.fillText("Loading...", gwidth * 0.5, gheight * 0.5);

    for (let i = 0; i < 222; i++) {
        keys[i] = 0;
    }

    document.addEventListener('mousemove', mouseMove, false);

    document.addEventListener("mousewheel", MouseWheelHandler, false);

    document.onmousedown = function(evt) {
        mouseDown(evt);
    };

    document.oncontextmenu = function(e) {
        e.preventDefault();
    };

    document.onmouseup = function(evt) {
        mouseUp(evt);
    };

    document.onkeydown = function(evt) {
        keyDown(evt);
    };

    document.onkeyup = function(evt) {
        keyUp(evt);
    };

    window.onresize = resize;
    scene = new Title();
    resize();
    loop();

};

function loop() {
    if (state === 1) {
        scene.update();
        scene.draw();
    } else {
        if (typeof scene.loading === 'function') {
            scene.loading();
        }
    }
    clearPressedKeys();
    window.requestAnimationFrame(loop)
}

function resize() {
    gwidth = window.innerWidth;
    gheight = window.innerHeight;
    c.style.height = gwidth;
    c.style.width = gheight;
    c.width = gwidth;
    c.height = gheight;
    if (typeof scene.resize === 'function') {
        scene.resize();
    }
}

function keyDown(e) {
    e = e.keyCode;
    if (keys[e] <= 1) keys[e] = 3;
}

function keyUp(e) {
    e = e.keyCode;
    if (keys[e] >= 2) keys[e] = 1;
}

function mouseMove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}

function mouseDown(e) {
    if (e.button == 0)
        if (mouse.leftButton <= 1) mouse.leftButton = 3;
    if (e.button == 2)
        if (mouse.rightButton <= 1) mouse.rightButton = 3;
}

function mouseUp(e) {
    if (e.button == 0)
        if (mouse.leftButton >= 2) mouse.leftButton = 1;
    if (e.button == 2)
        if (mouse.rightButton >= 2) mouse.rightButton = 1;
}

function MouseWheelHandler(e) {
    var e = window.event;
    mouse.wheel += Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
}

function clearPressedKeys() {
    mouse.wheel = 0;
    for (let i = 0; i < 222; i++) {
        if (keys[i] == 3) keys[i] = 2;
        if (keys[i] == 1) keys[i] = 0;
    }
    if (mouse.leftButton == 3) mouse.leftButton = 2;
    if (mouse.leftButton == 1) mouse.leftButton = 0;
    if (mouse.rightButton == 3) mouse.rightButton = 2;
    if (mouse.rightButton == 1) mouse.rightButton = 0;
}