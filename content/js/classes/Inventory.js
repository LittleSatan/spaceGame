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

    modifyItem(itemid, amount) {
        for (let j = 0; j < this.items[0].length; j++) {
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i][j] && this.items[i][j].id == itemid) {
                    this.items[i][j].amount += amount;
                    if (this.items[i][j].amount <= 0) this.items[i][j] = undefined;
                    return;
                }
            }
        }
        if (amount > 0) {
            for (let j = 0; j < this.items[0].length; j++) {
                for (let i = 0; i < this.items.length; i++) {
                    if (!this.items[i][j]) {
                        this.items[i][j] = new Item(itemid, amount);
                        return;
                    }
                }
            }
        }
    }

    drawHUD() {
        for (let i = 0; i < this.items.length; i++) {

            if (this.selection == i) {
                ctx.drawImage(scene.hud.interface, 54, 36, 50, 50, i * 55 + 10, 10, 50, 50)
            } else {
                ctx.drawImage(scene.hud.interface, 0, 36, 50, 50, i * 55 + 10, 10, 50, 50)
            }
            if (this.items[i][0]) {
                this.items[i][0].draw(i * 55 + 15, 15);
            }
        }
    }

}