class Tile {
    constructor(x, y, tileID) {
        this.tileID = [tileID % 6, Math.floor(tileID / 6)];
        this.tileSize = 32;
        this.pos = [x * this.tileSize, y * this.tileSize];
    }


    update() {

    }

    draw() {
        ctx.drawImage(scene.tiles, this.tileID[0] * this.tileSize, this.tileID[1] * this.tileSize, this.tileSize, this.tileSize, this.pos[0] - scene.offset[0], this.pos[1] - scene.offset[1], this.tileSize, this.tileSize);
    }

}