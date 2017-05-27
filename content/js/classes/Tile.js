class Tile {
    constructor(x, y, tileID) {
        this.tileNmbr = tileID;
        this.tileID = [tileID % 6, Math.floor(tileID / 6)];
        this.tileSize = 32;
        this.pos = [x * this.tileSize, y * this.tileSize];
    }

    update() {

    }

    draw(xOff, yOff) {
        ctx.drawImage(scene.tiles, this.tileID[0] * this.tileSize, this.tileID[1] * this.tileSize, this.tileSize, this.tileSize, this.pos[0] - xOff, this.pos[1] - yOff, this.tileSize, this.tileSize);
    }

}