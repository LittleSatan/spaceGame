class Tree {
    constructor(x, y, tileID, width, height) {
        this.tileNmbr = tileID;
        this.tileID = [tileID % 6, Math.floor(tileID / 6)];
        this.tileSize = 32;
        this.pos = [x * this.tileSize, y * this.tileSize, 96, 128];
        this.collision = new Collision(this.pos[0], this.pos[1] + 10, this.tileSize, 2)
    }

    update() {

    }

    draw(xOff, yOff) {
        if (this.pos[0] >= xOff - this.pos[2] && this.pos[0] <= xOff + gwidth + this.pos[2] && this.pos[1] >= yOff - this.pos[3] && this.pos[1] <= yOff + gheight + this.pos[3])
            ctx.drawImage(scene.tiles, this.tileID[0] * this.tileSize, this.tileID[1] * this.tileSize, this.pos[2], this.pos[3], this.pos[0] - 32 - xOff, this.pos[1] - 96 - yOff, this.pos[2], this.pos[3]);
    }

}