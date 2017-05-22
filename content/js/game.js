const remote = require('electron').remote;

let fps = 60,
    tileSize = 40,
    gwidth = 1280,
    gheight = 720,
    scene,
    c, ctx,
    state = "init",
    mouse = { x: 0, y: 0, leftButton: 0, rightButton: 0 },
    keys;

window.onload = function() {
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

    c.addEventListener('mousemove', function(evt) {
        function getMousePos(canvas, evt) {
            let rect = canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        }
        let mouseTemp = getMousePos(c, evt);
        mouse.x = mouseTemp.x;
        mouse.y = mouseTemp.y;
    }, false);

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
    let start = +new Date();
    if (state === 1) {
        scene.draw();
        scene.update();
    } else {
        if (typeof scene.loading === 'function') {
            scene.loading();
        }
    }
    clearPressedKeys();
    let end = +new Date();
    if (end - start <= 0) {
        setTimeout(window.requestAnimationFrame(loop), 0);
    } else {
        setTimeout(window.requestAnimationFrame(loop), fps - (end - start));
    }
}

function resize() {
    let c = document.getElementById("gameCanvas");
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

function clearPressedKeys() {
    for (let i = 0; i < 222; i++) {
        if (keys[i] == 3) keys[i] = 2;
        if (keys[i] == 1) keys[i] = 0;
    }
    if (mouse.leftButton == 3) mouse.leftButton = 2;
    if (mouse.leftButton == 1) mouse.leftButton = 0;
    if (mouse.rightButton == 3) mouse.rightButton = 2;
    if (mouse.rightButton == 1) mouse.rightButton = 0;
}