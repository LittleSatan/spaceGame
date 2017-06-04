class Item {
    constructor(id, amount) {
        this.id = id;
        this.amount = amount;
    }

    update() {

    }

    draw(x, y) {
        if (this.amount >= 1) {
            ctx.drawImage(scene.itemsSprite, this.id * 40, 0, 40, 40, x, y, 40, 40);
            ctx.textAlign = 'right';
            ctx.font = "16px Verdana";
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 2;
            ctx.strokeText(this.amount, x + 36, y + 36);
            ctx.fillStyle = "#FFF";
            ctx.fillText(this.amount, x + 36, y + 36);
        }
    }
}