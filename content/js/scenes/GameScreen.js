class GameScreen {
    constructor() {
        this.objs = [];
        this.player = new Player();
    }

    update() {

        this.player.update();

    }

    draw() {

        this.player.draw();
    }

}