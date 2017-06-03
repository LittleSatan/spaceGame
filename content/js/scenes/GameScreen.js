class GameScreen {
    constructor() {
        state = 0;
        this.objs = [];
        this.offset = [0, 0];
        this.player = new Player();
        this.scale = 1;
        this.tiles = new Image();
        this.map;
        this.hud = new Hud();
        this.tiles.onload = function() {

            state += 0.5;
            scene.map = new Map(500, 500);

        }
        this.tiles.src = "img/tileset/texture1.png";

    }

    resize() {
        if (typeof this.map.resize === 'function') {
            this.map.resize();
        }
    }

    update() {
        this.player.update();
        this.map.update()
    }

    loading() {
        ctx.fillRect(0, 0, gwidth * this.state, gheight);
    }

    draw() {
        if (!this.map) return;
        this.map.draw();
        this.player.draw();
        this.hud.draw();
    }

}