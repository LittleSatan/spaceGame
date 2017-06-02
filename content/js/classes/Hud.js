class Hud {
    constructor() {}

    update() {

    }

    draw() {

        // drawh health
        ctx.fillStyle = "#F33"
        ctx.fillRect(10, 70, scene.player.health[0], 20);
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "black";
        ctx.rect(10, 70, scene.player.health[1], 20);
        ctx.stroke();


        // draw stamina
        if (scene.player.exhausted) {
            ctx.fillStyle = "#080"
        } else {
            ctx.fillStyle = "#4F4"
        }
        ctx.fillRect(10, 110, scene.player.stamina[0] * 0.7, 20);
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "black";
        ctx.rect(10, 110, scene.player.stamina[1] * 0.7, 20);
        ctx.stroke();
    }

}