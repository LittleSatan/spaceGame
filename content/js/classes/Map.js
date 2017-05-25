class Map {
    constructor(width, height) {
        this.mapRendered = new Image();
        this.area = new Array(width);
        for (let x = 0; x < width; x++) {
            this.area[x] = new Array(height);
            for (let y = 0; y < this.area[x].length; y++) {
                this.area[x][y] = new Tile(x, y, Math.floor(Math.random() * 42));
            }
        }
        for (let x = 0; x < this.area.length; x++) {
            for (let y = 0; y < this.area[x].length; y++) {
                this.area[x][y].draw();
            }
        }
        this.mapRendered.src = c.toDataURL();
        state += 0.5;
    }

    resize() {
        this.prerender();
        scene.draw();
    }

    prerender() {
        for (let x = 0; x < this.area.length; x++) {
            for (let y = 0; y < this.area[x].length; y++) {
                this.area[x][y].draw();
            }
        }
        this.mapRendered.src = c.toDataURL();
    }

    update() {
        for (let x = 0; x < this.area.length; x++) {
            for (let y = 0; y < this.area[x].length; y++) {
                this.area[x][y].update();
            }
        }
    }

    draw() {
        // redraw player
        if ((scene.player.pos.x != scene.player.oldPos.x) || (scene.player.pos.y != scene.player.oldPos.y)) {
            ctx.drawImage(this.mapRendered, scene.player.oldPos.x, scene.player.oldPos.y, scene.player.width, scene.player.height, scene.player.oldPos.x, scene.player.oldPos.y, scene.player.width, scene.player.height);
        }
        if ((mouse.oldX != mouse.x) || mouse.oldY != mouse.y) {
            ctx.drawImage(this.mapRendered, mouse.oldX - 2, mouse.oldY - 2, 4, 4, mouse.oldX - 2, mouse.oldY - 2, 4, 4);
        }
    }

}