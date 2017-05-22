class Player {
    constructor() {
        this.pos = { x: 0, y: 0 };
        this.oldPos = { x: 0, y: 0 };
        this.width = 30;
        this.height = 30;
        this.speed = 2;
    }

    update() {
        this.oldPos.x = this.pos.x;
        this.oldPos.y = this.pos.y;
        if (keys[37] >= 2 && keys[39] <= 1) this.pos.x -= this.speed;
        if (keys[38] >= 2 && keys[40] <= 1) this.pos.y -= this.speed;
        if (keys[39] >= 2 && keys[37] <= 1) this.pos.x += this.speed;
        if (keys[40] >= 2 && keys[38] <= 1) this.pos.y += this.speed;
    }

    draw() {
        ctx.fillStyle = "#F00";
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }

}