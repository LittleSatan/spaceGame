class Map {
    constructor(width, height) {
        this.water = { offsetX: 0, offsetY: 0, image: new Image() };
        this.area = new Array(width);

        //        let simplex = new SimplexNoise();
        noise.seed(Math.random());

        let waterMaxHeight = Math.random() * 0.005 + 0.0025;
        let sandMaxHeight = Math.random() * 0.04 + 0.18;
        let grassMaxHeight = Math.random() * 0.2 + 0.75;
        let steps = Math.random() * 0.004 + 0.006;

        for (let x = 0; x < width; x++) {
            this.area[x] = new Array(height);
            for (let y = 0; y < this.area[x].length; y++) {
                //                let value = simplex.noise2D(x * steps, y * steps);
                let value = noise.perlin2(x * steps, y * steps);
                if (value < waterMaxHeight) this.area[x][y] = new Tile(x, y, 5);
                if (value >= waterMaxHeight && value < sandMaxHeight) this.area[x][y] = new Tile(x, y, 2);
                if (value >= sandMaxHeight && value < grassMaxHeight) this.area[x][y] = new Tile(x, y, 1);
                if (value >= grassMaxHeight) this.area[x][y] = new Tile(x, y, 3);
            }
        }

        for (let x = 0; x < this.area.length; x++) {
            for (let y = 0; y < this.area[x].length; y++) {
                ctx.drawImage(scene.tiles, 128, 0, 32, 32, x * 32, y * 32, 32, 32);
            }
        }
        this.water.image.src = c.toDataURL();

        state += 0.5;
    }

    resize() {
        for (let x = 0; x < this.area.length; x++) {
            for (let y = 0; y < this.area[x].length; y++) {
                ctx.drawImage(scene.tiles, 128, 0, 32, 32, x * 32, y * 32, 32, 32);
            }
        }
        this.water.image.src = c.toDataURL();
    }

    update() {
        this.water.offsetX -= 0.5;
        if (this.water.offsetX <= -gwidth) this.water.offsetX += gwidth;
        for (let x = 0; x < this.area.length; x++) {
            for (let y = 0; y < this.area[x].length; y++) {
                this.area[x][y].update();
            }
        }
    }

    draw() {
        // redraw player

        let xOff;
        let yOff;

        if (scene.player.pos.x + (scene.player.width * 0.5) < gwidth * 0.5) xOff = 0;
        if (scene.player.pos.x + (scene.player.width * 0.5) >= gwidth * 0.5) xOff = scene.player.pos.x + (scene.player.width * 0.5) - gwidth * 0.5;
        if (scene.player.pos.x + (scene.player.width * 0.5) > this.area.length * 32 - gwidth * 0.5) xOff = (this.area.length * 32) - gwidth;

        if (scene.player.pos.y + (scene.player.height * 0.5) < gheight * 0.5) yOff = 0;
        if (scene.player.pos.y + (scene.player.height * 0.5) >= gheight * 0.5) yOff = Math.floor(scene.player.pos.y + (scene.player.height * 0.5) - gheight * 0.5);
        if (scene.player.pos.y + (scene.player.height * 0.5) > this.area[0].length * 32 - gheight * 0.5) yOff = (this.area[0].length * 32) - gheight;

        let startX = Math.floor(xOff / 32);
        let startY = Math.floor(yOff / 32);
        let endX = Math.ceil(gwidth / 32) + startX + 1;
        let endY = Math.ceil(gheight / 32) + startY + 1;

        if (endX > this.area.length) {
            endX = this.area.length;
            startX = endX - Math.ceil(gwidth / 32);
        }

        if (endY > this.area[0].length) {
            endY = this.area[0].length;
            startY = endY - Math.ceil(gheight / 32);
        }

        ctx.drawImage(this.water.image, this.water.offsetX, 0);
        ctx.drawImage(this.water.image, gwidth + this.water.offsetX, 0);
        for (let x = startX; x < endX; x++) {
            for (let y = startY; y < endY; y++) {
                this.area[x][y].draw(xOff, yOff);
            }
        }
        scene.player.draw(xOff, yOff);
    }

}