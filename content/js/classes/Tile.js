class Tile {
    constructor(x, y, tileID, collision) {
        this.tileNmbr = tileID;
        this.tileID = [tileID % 6, Math.floor(tileID / 6)];
        this.pos = [x * tileSize, y * tileSize];
        if (collision) {
            this.collision = new Collision(this.pos[0], this.pos[1], tileSize, tileSize);
        } else {
            this.collision = undefined;
        }
    }

    update() {

    }

    draw(xOff, yOff) {
        ctx.drawImage(scene.tiles, this.tileID[0] * tileSize, this.tileID[1] * tileSize, tileSize, tileSize, this.pos[0] - xOff, this.pos[1] - yOff, tileSize, tileSize);
    }

}