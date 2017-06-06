class Map {
    constructor(width, height) {
        this.water = { offsetX: 0, offsetY: 0, image: new Image() };
        this.area = new Array(width);
        this.entities = new Array();
        this.tileSize = 32;

        this.startX;
        this.startY;
        this.endX;
        this.endY;
        this.xOff;
        this.yOff;

        noise.seed(Math.random());
        let waterMaxHeight = Math.random() * 0.005 + 0.0025;
        let sandMaxHeight = Math.random() * 0.04 + 0.18;
        let grassMaxHeight = Math.random() * 0.2 + 0.75;
        let steps = Math.random() * 0.004 + 0.006;
        for (let x = 0; x < width; x++) {
            this.area[x] = new Array(height);
            for (let y = 0; y < this.area[x].length; y++) {
                let value = noise.perlin2(x * steps, y * steps);
                if (value < waterMaxHeight) this.area[x][y] = new Tile(x, y, 5, true);
                if (value >= waterMaxHeight && value < sandMaxHeight) this.area[x][y] = new Tile(x, y, 2);
                if (value >= sandMaxHeight && value < grassMaxHeight) this.area[x][y] = new Tile(x, y, 1);
                if (value >= sandMaxHeight && value < grassMaxHeight && Math.random() >= 0.98) {
                    this.entities.push(new Tree(x, y, 12 * 6))
                    this.entities.sort(function(a, b) {
                        if (a.pos[1] < b.pos[1]) return -1;
                        if (a.pos[1] == b.pos[1] && a.pos[0] < b.pos[0]) return -1;
                        return 1;
                    })
                }

                if (value >= grassMaxHeight) this.area[x][y] = new Tile(x, y, 3);
            }
        }

        for (let x = 0; x < this.area.length; x++) {
            for (let y = 0; y < this.area[x].length; y++) {
                ctx.drawImage(scene.tiles, 256, 0, tileSize, tileSize, x * tileSize, y * tileSize, tileSize, tileSize);
            }
        }
        this.water.image.src = c.toDataURL();

        while (true) {
            let x = Math.floor(Math.random() * this.area.length);
            let y = Math.floor(Math.random() * this.area[x].length);
            if (this.area[x][y].tileNmbr == 1) {
                scene.player = new Player(x * tileSize, y * tileSize);
                break;
            }
        };
        state += 0.3;
    }

    resize() {
        for (let x = 0; x < this.area.length; x++) {
            for (let y = 0; y < this.area[x].length; y++) {
                ctx.drawImage(scene.tiles, 256, 0, tileSize, tileSize, x * tileSize, y * tileSize, tileSize, tileSize);
            }
        }
        this.water.image.src = c.toDataURL();
    }

    update() {
        this.water.offsetX -= 0.5;
        if (this.water.offsetX <= -gwidth) this.water.offsetX += gwidth;

        if (scene.player.pos.x + (scene.player.width * 0.5) < gwidth * 0.5) this.xOff = 0;
        if (scene.player.pos.x + (scene.player.width * 0.5) >= gwidth * 0.5) this.xOff = scene.player.pos.x + (scene.player.width * 0.5) - gwidth * 0.5;
        if (scene.player.pos.x + (scene.player.width * 0.5) > this.area.length * tileSize - gwidth * 0.5) this.xOff = (this.area.length * tileSize) - gwidth;

        if (scene.player.pos.y + (scene.player.height * 0.5) < gheight * 0.5) this.yOff = 0;
        if (scene.player.pos.y + (scene.player.height * 0.5) >= gheight * 0.5) this.yOff = Math.floor(scene.player.pos.y + (scene.player.height * 0.5) - gheight * 0.5);
        if (scene.player.pos.y + (scene.player.height * 0.5) > this.area[0].length * tileSize - gheight * 0.5) this.yOff = (this.area[0].length * tileSize) - gheight;

        this.startX = Math.floor(this.xOff / tileSize);
        this.startY = Math.floor(this.yOff / tileSize);
        this.endX = Math.ceil(gwidth / tileSize) + this.startX + 1;
        this.endY = Math.ceil(gheight / tileSize) + this.startY + 1;

        if (this.endX > this.area.length) {
            this.endX = this.area.length;
            this.startX = this.endX - Math.ceil(gwidth / tileSize);
        }

        if (this.endY > this.area[0].length) {
            this.endY = this.area[0].length;
            this.startY = this.endY - Math.ceil(gheight / tileSize);
        }

        let resetCursor = true;
        for (let a = 0; a < scene.map.entities.length; a++) {
            let b = this.entities[a].mouseCollision();

            if (b == "clicked") {
                this.entities.splice(a, 1);
                scene.player.inventory.modifyItem(0, 5);
                break;
            };

            if (b == "hover") {
                resetCursor = false;
                break;
            };

        }
        if (resetCursor) c.style.cursor = 'url("./img/other/cursor.png"), auto';

        if (mouse.leftButton === 3) {
            // let x = Math.floor((mouse.x + this.xOff) / tileSize);
            // let y = Math.floor((mouse.y + this.yOff) / tileSize);
            // this.area[x][y] = new Tile(x, y, 21, true);
        }

        if (mouse.rightButton === 3) {
            // let x = Math.floor((mouse.x + this.xOff) / tileSize);
            // let y = Math.floor((mouse.y + this.yOff) / tileSize);
            // this.entities.push(new Tree(x, y, 12 * 6))
            // this.entities.sort(function(a, b) {
            //     if (a.pos[1] < b.pos[1]) return -1;
            //     if (a.pos[1] == b.pos[1] && a.pos[0] < b.pos[0]) return -1;
            //     return 1;
            // })
            let x = Math.floor((mouse.x + this.xOff) / tileSize);
            let y = Math.floor((mouse.y + this.yOff) / tileSize);
            if (scene.player.inventory.items[scene.player.inventory.selection][0] &&
                scene.player.inventory.items[scene.player.inventory.selection][0].id == 0 &&
                this.area[x][y].tileNmbr != 21) {
                scene.player.inventory.modifyItem(0, -1);
                this.area[x][y] = new Tile(x, y, 21);
            }
        }

        for (let x = this.startX; x < this.endX; x++) {
            for (let y = this.startY; y < this.endY; y++) {
                this.area[x][y].update();
            }
        }

        for (let a = 0; a < this.entities.length; a++) {
            this.entities[a].update();
        }

    }

    draw() {
        let waterXPos = Math.round(this.water.offsetX);
        ctx.drawImage(this.water.image, waterXPos, 0);
        ctx.drawImage(this.water.image, gwidth + waterXPos, 0);
        for (let x = this.startX; x < this.endX; x++) {
            for (let y = this.startY; y < this.endY; y++) {
                this.area[x][y].draw(this.xOff, this.yOff);
            }
        }

        let remeberEntEnd;

        for (let a = 0; a < this.entities.length; a++) {
            if (this.entities[a].pos[1] >= scene.player.pos.y) { remeberEntEnd = a; break };
            this.entities[a].draw(this.xOff, this.yOff);
        }

        scene.player.draw(this.xOff, this.yOff);

        for (let a = remeberEntEnd; a < this.entities.length; a++) {
            this.entities[a].draw(this.xOff, this.yOff);
        }


    }

}