class Player {
    constructor() {
        this.pos = { x: 0, y: 0 };
        this.oldPos = { x: 0, y: 0 };
        this.width = 30;
        this.height = 30;
        this.speed = 3;
        this.velocity = [0, 0]
    }

    update() {
        this.oldPos.x = this.pos.x;
        this.oldPos.y = this.pos.y;
        this.velocity = [0, 0];
        if (keys[68] >= 2 && keys[65] <= 1) this.velocity[0] = this.speed;
        if (keys[83] >= 2 && keys[87] <= 1) this.velocity[1] = this.speed;
        if (keys[65] >= 2 && keys[68] <= 1) this.velocity[0] = -this.speed;
        if (keys[87] >= 2 && keys[83] <= 1) this.velocity[1] = -this.speed;

        // check col
        for (let a = 0; a < scene.map.entities.length; a++) {
            scene.map.entities[a].collision.checkCollsion();
        }


        this.pos.x += this.velocity[0];
        this.pos.y += this.velocity[1];
    }

    draw(xOff, yOff) {
        ctx.fillStyle = "#F00";
        ctx.fillRect(this.pos.x - xOff, this.pos.y - yOff - 30, this.width, this.height + 30);
    }

}