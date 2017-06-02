class Player {
    constructor(xPos, yPos) {
        this.pos = { x: xPos || 0, y: yPos || 0 };
        this.oldPos = { x: xPos || 0, y: yPos || 0 };
        this.width = 30;
        this.height = 30;
        this.middle = { x: this.pos.x + this.width * 0.5, y: this.pos.y + this.height * 0.5 }
        this.diameterSQR = this.width * this.width + this.height * this.height;
        this.speed = [3, 3, 7]; // 0 = current speed, 1 = normal speed, 2 = running speed
        this.running = false;
        this.exhausted = false;
        this.health = [100, 100]; // 0 = current health, 1 = max health
        this.stamina = [200, 200]; // 0 = current stamina, 1 = max stamina
        this.velocity = [0, 0]
    }

    update() {
        this.oldPos.x = this.pos.x;
        this.oldPos.y = this.pos.y;
        this.velocity = [0, 0];

        // running thingy
        if (keys[16] == 3 && (this.stamina[0] > 50 || !this.exhausted)) this.running = true;
        if (keys[16] >= 2 && this.running) {
            this.stamina[0]--;
        }
        if (keys[16] <= 1 || !this.running || (keys[65] <= 1 && keys[68] <= 1 && keys[83] <= 1 && keys[87] <= 1)) {
            this.stamina[0] += 0.4;
            this.running = false;
        }
        if (this.stamina[0] < 0) {
            this.exhausted = true;
            this.stamina[0] = 0;
            this.running = false;
        }
        if (this.stamina[0] > 50) this.exhausted = false;
        if (this.stamina[0] > this.stamina[1]) this.stamina[0] = this.stamina[1];
        if (this.running) { this.speed[0] = this.speed[2] } else this.speed[0] = this.speed[1];

        // walk thingy
        if (keys[68] >= 2 && keys[65] <= 1) this.velocity[0] = this.speed[0];
        if (keys[83] >= 2 && keys[87] <= 1) this.velocity[1] = this.speed[0];
        if (keys[65] >= 2 && keys[68] <= 1) this.velocity[0] = -this.speed[0];
        if (keys[87] >= 2 && keys[83] <= 1) this.velocity[1] = -this.speed[0];

        // check col
        for (let a = 0; a < scene.map.entities.length; a++) {
            scene.map.entities[a].collision.checkCollsion();
        }

        // check col of tiles connected to player
        let checkColX = Math.floor(scene.player.pos.x / tileSize) - 1;
        let checkColY = Math.floor(scene.player.pos.y / tileSize) - 1;
        if (checkColX < 0) checkColX = 0;
        if (checkColY < 0) checkColY = 0;
        if (checkColX > scene.map.area.lenght - 3) checkColX = scene.map.area.lenght - 3;
        if (checkColY > scene.map.area[checkColX].lenght - 3) checkColY = scene.map.area[checkColX].lenght - 3;
        for (let x = checkColX; x < checkColX + 3; x++) {
            for (let y = checkColY; y < checkColY + 3; y++) {
                if (scene.map.area[x][y].collision) scene.map.area[x][y].collision.checkCollsion();
            }
        }

        // move thingy with pos update and stuff like that
        this.pos.x += this.velocity[0];
        this.pos.y += this.velocity[1];
        this.middle = { x: this.pos.x + this.width * 0.5, y: this.pos.y + this.height * 0.5 }

    }

    draw(xOff, yOff) {
        ctx.fillStyle = "#F00";
        ctx.fillRect(this.pos.x - xOff, this.pos.y - yOff - 30, this.width, this.height + 30);
    }

}