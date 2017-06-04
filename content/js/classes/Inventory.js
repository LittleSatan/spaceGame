class Inventory {
    constructor() {

        this.selection = 0;
        this.items = new Array(10)
        for (let i = 0; i < this.items.length; i++) {
            this.items[i] = new Array(3);
        }
    }

    update() {

    }

    drawHUD() {
        for (let i = 0; i < this.items.length; i++) {

            ctx.fillStyle = "#000"
            ctx.globalAlpha = 0.4;
            ctx.fillRect(i * 50 + 10, 10, 40, 40);
            ctx.globalAlpha = 1;
            if (this.items[i][0]) {
                this.items[i][0].draw(i * 50 + 10, 10);
            }
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "black";
            if (this.selection == i) ctx.strokeStyle = "yellow";
            ctx.rect(i * 50 + 10, 10, 40, 40);
            ctx.stroke();
        }
    }

}