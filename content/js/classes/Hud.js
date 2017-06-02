class Hud {
    constructor() {}

    update() {

    }

    draw() {

        // drawh health
        ctx.fillStyle = "#F33"
        ctx.fillRect(10, 70, scene.player.health[0] * 2, 20);
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "black";
        ctx.rect(10, 70, scene.player.health[1] * 2, 20);
        ctx.stroke();
        ctx.textAlign = 'center';
        ctx.font = "16px Verdana";
        ctx.fillStyle = "#000";
        ctx.fillText(scene.player.health[0] + "/" + scene.player.health[1], 10 + scene.player.health[1], 86);

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
        ctx.fillStyle = "#000";
        ctx.fillText(Math.round(scene.player.stamina[0]) + "/" + scene.player.stamina[1], 10 + scene.player.stamina[1] * 0.35, 126);
    }

}