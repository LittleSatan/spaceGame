class GameScreen {
    constructor() {
        state = 0;
        this.objs = [];
        this.offset = [0, 0];
        this.player = new Player();
        this.scale = 1;
        this.tiles = new Image();
        this.map;
        this.tiles.onload = function() {

            state += 0.5;
            scene.map = new Map(200, 200);

        }
        this.tiles.src = "img/texture1.png";

    }

    resize() {
        if (typeof this.map.resize === 'function') {
            this.map.resize();
        }
    }

    update() {
        this.map.update()
        this.player.update();
    }

    draw() {
        this.map.draw();
        this.player.draw();
    }

}