class Player {
    constructor() {
        this.pos = { x: 0, y: 0 };
        this.oldPos = { x: 0, y: 0 };
        this.width = 30;
        this.height = 30;
        this.speed = 3;
    }

    update() {
        this.oldPos.x = this.pos.x;
        this.oldPos.y = this.pos.y;
        if (keys[68] >= 2 && keys[65] <= 1) this.pos.x += this.speed;
        if (keys[83] >= 2 && keys[87] <= 1) this.pos.y += this.speed;
        if (keys[65] >= 2 && keys[68] <= 1) this.pos.x -= this.speed;
        if (keys[87] >= 2 && keys[83] <= 1) this.pos.y -= this.speed;



    }

    draw(xOff, yOff) {
        ctx.fillStyle = "#F00";
        ctx.fillRect(this.pos.x - xOff, this.pos.y - yOff, this.width, this.height);
    }

}