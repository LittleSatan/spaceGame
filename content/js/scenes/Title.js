class Title {
    constructor() {
        state = 0;
        this.background = { image: null, x: 0, y: 0 };
        this.planet = { image: null, x: 0, y: 0, rot: 0 };
        this.menu = [{ x: gwidth * 0.5 - 320, y: 300, width: 300, height: 50, text: "Single Player", frame: 0 },
            { x: gwidth * 0.5 + 20, y: 300, width: 300, height: 50, text: "Multi Player", frame: 0 },
            { x: gwidth * 0.5 - 320, y: 370, width: 300, height: 50, text: "Settings", frame: 0 },
            { x: gwidth * 0.5 + 20, y: 370, width: 300, height: 50, text: "Quit", frame: 0 }
        ];
        this.inputEnabled = false;
        this.frame = 0;
        this.fadeOut = 0;

        this.planet.image = new Image();
        this.planet.image.onload = function() {

            state += 0.5;

        }
        this.planet.image.src = "img/title/planet.png";


        this.background.image = new Image();
        this.background.image.onload = function() {

            state += 0.5;

        }
        this.background.image.src = "img/title/background.png";

    }

    resize() {
        this.menu[0].x = gwidth * 0.5 - 320;
        this.menu[1].x = gwidth * 0.5 + 20;
        this.menu[2].x = gwidth * 0.5 - 320;
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

                        if (i == 0) {
                            scene = new GameScreen();
                        }

                        // quit
                        if (i == 3) {
                            let window = remote.getCurrentWindow();
                            window.close();
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

            let r = 20;

            ctx.beginPath();
            ctx.moveTo(this.menu[i].x + r, this.menu[i].y);
            ctx.lineTo(this.menu[i].x + this.menu[i].width - r, this.menu[i].y);
            ctx.quadraticCurveTo(this.menu[i].x + this.menu[i].width, this.menu[i].y, this.menu[i].x + this.menu[i].width, this.menu[i].y + r);
            ctx.lineTo(this.menu[i].x + this.menu[i].width, this.menu[i].y + this.menu[i].height - r);
            ctx.quadraticCurveTo(this.menu[i].x + this.menu[i].width, this.menu[i].y + this.menu[i].height, this.menu[i].x + this.menu[i].width - r, this.menu[i].y + this.menu[i].height);
            ctx.lineTo(this.menu[i].x + r, this.menu[i].y + this.menu[i].height);
            ctx.quadraticCurveTo(this.menu[i].x, this.menu[i].y + this.menu[i].height, this.menu[i].x, this.menu[i].y + this.menu[i].height - r);
            ctx.lineTo(this.menu[i].x, this.menu[i].y + r);
            ctx.quadraticCurveTo(this.menu[i].x, this.menu[i].y, this.menu[i].x + r, this.menu[i].y);
            ctx.closePath();
            ctx.fill();

            ctx.globalAlpha = 1;
            ctx.fillStyle = "#000";
            ctx.fillText(this.menu[i].text, this.menu[i].x + this.menu[i].width * 0.5, this.menu[i].y + 40);
        }
        if (mouse.leftButton === 3) ctx.fillStyle = "#F00";
        if (mouse.leftButton === 2) ctx.fillStyle = "#00F";
        if (mouse.leftButton === 1) ctx.fillStyle = "#0F0";
        if (mouse.leftButton === 0) ctx.fillStyle = "#FFF";
        ctx.fillRect(mouse.x - 2, mouse.y - 2, 4, 4)
        if (this.fadeOut > 1) {
            ctx.fillStyle = "#FFF"
            ctx.globalAlpha = this.fadeOut / 15;
            ctx.fillRect(0, 0, gwidth, gheight);
        }
    }
}