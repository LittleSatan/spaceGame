class Hud {
    constructor() {}

    update() {

    }

    draw() {

        // draw stamina
        if (scene.player.exhausted) {
            ctx.fillStyle = "#080"
        } else {
            ctx.fillStyle = "#4F4"
        }
        ctx.fillRect(10, 110, scene.player.stamina * 0.7, 40);
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "black";
        ctx.rect(10, 110, 210, 40);
        ctx.stroke();
    }

}