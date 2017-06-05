class Hud {
    constructor() {}

    update() {

    }

    draw() {

        scene.player.inventory.drawHUD();

        // drawh health
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = "#000"
        ctx.fillRect(10, 60, scene.player.health[1] * 2, 20);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#F33"
        ctx.fillRect(10, 60, scene.player.health[0] * 2, 20);
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "black";
        ctx.rect(10, 60, scene.player.health[1] * 2, 20);
        ctx.stroke();
        ctx.textAlign = 'center';
        ctx.font = "16px Verdana";
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.strokeText(scene.player.health[0] + "/" + scene.player.health[1], 10 + scene.player.health[1], 76);
        ctx.fillStyle = "#FFF";
        ctx.fillText(scene.player.health[0] + "/" + scene.player.health[1], 10 + scene.player.health[1], 76);

        // draw stamina
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = "#000"
        ctx.fillRect(10, 90, scene.player.stamina[1] * 0.7, 20);
        ctx.globalAlpha = 1;
        if (scene.player.exhausted) {
            ctx.fillStyle = "#050"
        } else {
            ctx.fillStyle = "#191"
        }
        ctx.fillRect(10, 90, scene.player.stamina[0] * 0.7, 20);
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "black";
        ctx.rect(10, 90, scene.player.stamina[1] * 0.7, 20);
        ctx.stroke();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.strokeText(Math.round(scene.player.stamina[0]) + "/" + scene.player.stamina[1], 10 + scene.player.stamina[1] * 0.35, 106);
        ctx.fillStyle = "#FFF";
        ctx.fillText(Math.round(scene.player.stamina[0]) + "/" + scene.player.stamina[1], 10 + scene.player.stamina[1] * 0.35, 106);
    }

}