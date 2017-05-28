class Tree {
    constructor(x, y, tileID, width, height) {
        this.tileNmbr = tileID;
        this.tileID = [tileID % 6, Math.floor(tileID / 6)];
        this.tileSize = 32;
        this.pos = [x * this.tileSize, y * this.tileSize, 96, 128];
    }

    update() {

    }

    draw(xOff, yOff) {
        ctx.drawImage(scene.tiles, this.tileID[0] * this.tileSize, this.tileID[1] * this.tileSize, this.pos[2], this.pos[3], this.pos[0] - 32 - xOff, this.pos[1] - 96 - yOff, this.pos[2], this.pos[3]);
    }

}