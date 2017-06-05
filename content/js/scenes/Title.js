class Title {
    constructor() {
        state = 0;
        this.background = { image: null, x: 0, y: 0 };
        this.planet = { image: null, x: 0, y: 0, rot: 0 };
        this.menu = [{ x: gwidth * 0.5 - 317 - 20, y: 300, width: 317, height: 67, text: "Single Player", frame: 0 },
            { x: gwidth * 0.5 + 20, y: 300, width: 317, height: 67, text: "Multi Player", frame: 0 },
            { x: gwidth * 0.5 - 317 - 20, y: 370, width: 317, height: 67, text: "Settings", frame: 0 },
            { x: gwidth * 0.5 + 20, y: 370, width: 317, height: 67, text: "Quit", frame: 0 }
        ];
        this.inputEnabled = false;
        this.frame = 0;
        this.fadeOut = 0;

        this.planet.image = new Image();
        this.planet.image.onload = function() {

            state += 0.4;

        }
        this.planet.image.src = "img/title/planet.png";

        this.background.image = new Image();
        this.background.image.onload = function() {

            state += 0.4;

        }
        this.background.image.src = "img/title/background.png";

        this.interface = new Image();
        this.interface.onload = function() {

            state += 0.2;

        }
        this.interface.src = "img/interface.png";
    }

    resize() {
        this.menu[0].x = gwidth * 0.5 - 317 - 20;
        this.menu[1].x = gwidth * 0.5 + 20;
        this.menu[2].x = gwidth * 0.5 - 317 - 20;
        this.menu[3].x = gwidth * 0.5 + 20;
    }

    update() {
        for (let i = 0; i < this.menu.length; i++) {
            if ((mouse.x >= this.menu[i].x && mouse.x <= this.menu[i].x + this.menu[i].width &&
                    (mouse.y >= this.menu[i].y && mouse.y <= this.menu[i].y + this.menu[i].height))) {
                if (this.menu[i].frame < 15) this.menu[i].frame++;
            } else {
                if (this.menu[i].frame > 0) this.menu[i].frame--;
            }
        }

        if (this.inputEnabled) {
            if (mouse.leftButton === 3) {
                for (let i = 0; i < this.menu.length; i++) {
                    if ((mouse.x >= this.menu[i].x && mouse.x <= this.menu[i].x + this.menu[i].width &&
                            (mouse.y >= this.menu[i].y && mouse.y <= this.menu[i].y + this.menu[i].height))) {

                        // new game
                        if (i == 0) {
                            scene = new GameScreen();
                        }

                        // quit
                        if (i == 3) {
                            if (electron) {
                                let window = remote.getCurrentWindow();
                                window.close();
                            }
                        }
                    }
                }
            }

        }

        this.background.x -= 0.2;
        this.planet.rot -= 0.0001;
        this.frame++;
        if (this.frame == 15) this.inputEnabled = true;
        if (this.fadeOut >= 1 && this.fadeOut < 15) this.fadeOut++;
        if (this.background.x <= -1920) this.background.x += 1920;
    }

    draw() {
        ctx.drawImage(this.background.image, this.background.x, this.background.y);
        ctx.drawImage(this.background.image, this.background.x + 1920, this.background.y);

        let x = gwidth * 0.5;
        let y = 500 + 1200
        ctx.translate(x, y);
        ctx.rotate(this.planet.rot);
        ctx.drawImage(this.planet.image, -1200, -1200, 2400, 2400);
        ctx.rotate(-this.planet.rot);
        ctx.translate(-x, -y);

        ctx.textAlign = 'center';
        ctx.font = "40px Verdana";
        for (let i = 0; i < this.menu.length; i++) {
            ctx.fillStyle = "#FFF";
            ctx.globalAlpha = this.menu[i].frame * 0.033 + 0.5;
            ctx.drawImage(this.interface, 108, 36, 317, 67, this.menu[i].x, this.menu[i].y, 317, 67);
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.fillStyle = "#000";
            ctx.fillText(this.menu[i].text, this.menu[i].x + this.menu[i].width * 0.5, this.menu[i].y + 50);
        }
    }
}