class Tree {
    constructor(x, y, tileID, width, height) {
        this.tileNmbr = tileID;
        this.tileID = [tileID % 6, Math.floor(tileID / 6)];
        this.pos = [x * tileSize, y * tileSize, tileSize * 3, tileSize * 4];
        this.collision = new Collision(this.pos[0], this.pos[1] + 20, tileSize, 16)
    }

    update() {

    }

    mouseCollision() {
        let x = this.pos[0] - scene.map.xOff;
        let y = this.pos[1] - tileSize - scene.map.yOff;
        let width = tileSize;
        let height = tileSize * 2;
        if (mouse.x >= x && mouse.x < x + width && mouse.y >= y && mouse.y < y + height) {
            c.style.cursor = 'url("./img/other/cursorAct.png"), auto';
            if (mouse.leftButton === 3) {
                return "clicked";
            }
            return "hover";
        }
        return;
    }

    draw(xOff, yOff) {
        if (this.pos[0] >= xOff - this.pos[2] && this.pos[0] <= xOff + gwidth + this.pos[2] && this.pos[1] >= yOff - this.pos[3] && this.pos[1] <= yOff + gheight + this.pos[3])
            ctx.drawImage(scene.tiles, this.tileID[0] * tileSize, this.tileID[1] * tileSize, this.pos[2], this.pos[3], this.pos[0] - tileSize - xOff, this.pos[1] - tileSize * 3 - yOff, this.pos[2], this.pos[3]);
    }

}