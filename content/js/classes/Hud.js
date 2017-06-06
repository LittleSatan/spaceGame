class Hud {
    constructor() {
        this.interface = new Image();
        this.interface.onload = function() {

            state += 0.1;

        }
        this.interface.src = "img/interface.png";
    }

    update() {

    }

    drawText(x, y, text) {

        // x is center, y is top

        // Digit    Width   Pos
        // 0        11      109
        // 1        7       120
        // 2        9       127 
        // 3        9       136 
        // 4        11      145  
        // 5        9       156 
        // 6        11      165  
        // 7        9       176 
        // 8        11      185  
        // 9        11      196  
        // /        9       207 

        let letterArray = text.split("");
        let width = 0;
        let pos = new Array(letterArray.length);
        let posDigit = new Array(letterArray.length);
        let digitWidth = new Array(letterArray.length);
        for (let i = 0; i < letterArray.length; i++) {
            pos[i] = width;
            switch (letterArray[i]) {
                case "0":
                    width += 11
                    posDigit[i] = 109;
                    digitWidth[i] = 11;
                    break;
                case "1":
                    width += 7
                    posDigit[i] = 120;
                    digitWidth[i] = 7;
                    break;
                case "2":
                    width += 9
                    posDigit[i] = 127;
                    digitWidth[i] = 9;
                    break;
                case "3":
                    width += 9
                    posDigit[i] = 136;
                    digitWidth[i] = 9;
                    break;
                case "4":
                    width += 11
                    posDigit[i] = 145;
                    digitWidth[i] = 11;
                    break;
                case "5":
                    width += 9
                    posDigit[i] = 156;
                    digitWidth[i] = 9;
                    break;
                case "6":
                    width += 11
                    posDigit[i] = 165;
                    digitWidth[i] = 11;
                    break;
                case "7":
                    width += 9
                    posDigit[i] = 176;
                    digitWidth[i] = 9;
                    break;
                case "8":
                    width += 11
                    posDigit[i] = 185;
                    digitWidth[i] = 11;
                    break;
                case "9":
                    width += 11
                    posDigit[i] = 196;
                    digitWidth[i] = 11;
                    break;
                case "/":
                    width += 9
                    posDigit[i] = 207;
                    digitWidth[i] = 9;
                    break;
            }
        }
        let currentPos = x - Math.floor((width * 0.5));
        for (let i = 0; i < letterArray.length; i++) {
            ctx.drawImage(this.interface, posDigit[i], 11, digitWidth[i], 14, currentPos, y, digitWidth[i], 14);
            currentPos += digitWidth[i];
        }
    }

    draw() {

        scene.player.inventory.drawHUD(); // Inventory hud

        ctx.drawImage(this.interface, 77, 5, 4, 26, 10, 70, 4, 26); // left side health bar
        ctx.drawImage(this.interface, 77, 5, 4, 26, 10, 100, 4, 26); // left side stamina bar

        ctx.drawImage(this.interface, 82, 5, 16, 26, 14, 70, scene.player.health[1], 26); // middle health bar
        ctx.drawImage(this.interface, 82, 5, 16, 26, 14, 100, scene.player.stamina[1], 26); // middle stamina bar

        ctx.drawImage(this.interface, 99, 5, 4, 26, 14 + scene.player.health[1], 70, 4, 26); // right side health bar
        ctx.drawImage(this.interface, 99, 5, 4, 26, 14 + scene.player.stamina[1], 100, 4, 26); // right side stamina bar

        // sizes of health and stamina boxes are 72 x 18
        // health bar fill
        let hpDraw = scene.player.health[0];
        let hpDrawPos = 14;
        while (hpDraw > 72) {
            ctx.drawImage(this.interface, 0, 0, 72, 18, hpDrawPos, 74, 72, 18); // right side health bar
            hpDrawPos += 72;
            hpDraw -= 72;
        }
        ctx.drawImage(this.interface, 0, 0, hpDraw, 18, hpDrawPos, 74, hpDraw, 18); // right side health bar

        // stamina bar fill
        let stDraw = scene.player.stamina[0];
        let stDrawPos = 14;
        while (stDraw > 72) {
            ctx.drawImage(this.interface, 0, 18, 72, 18, stDrawPos, 104, 72, 18); // right side health bar
            stDrawPos += 72;
            stDraw -= 72;
        }
        ctx.drawImage(this.interface, 0, 18, stDraw, 18, stDrawPos, 104, stDraw, 18); // right side health bar

        // draw text
        if (mouse.x >= 11 && mouse.x <= 14 + scene.player.health[1] + 4 &&
            mouse.y >= 70 && mouse.y <= 70 + 26) this.drawText(14 + Math.round(scene.player.health[1] * 0.5), 76, scene.player.health[0] + "/" + scene.player.health[1]);
        if (mouse.x >= 11 && mouse.x <= 14 + scene.player.stamina[1] + 4 &&
            mouse.y >= 100 && mouse.y <= 100 + 26) this.drawText(14 + Math.round(scene.player.stamina[1] * 0.5), 106, Math.round(scene.player.stamina[0]) + "/" + scene.player.stamina[1]);
    }

}