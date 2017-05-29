class Collision {
    constructor(x, y, width, height) {
        this.pos = [x, y, width, height];
    }

    checkCollsion() {


        // if scene.player above block horizontally
        if (scene.player.pos.x + scene.player.width > this.pos[0] &&
            scene.player.pos.x < this.pos[0] + this.pos[2]) {
            // if scene.player above block vertically?
            if (scene.player.pos.y + scene.player.height <= this.pos[1]) {
                // if scene.player in block vertically after movement?
                if (scene.player.pos.y + scene.player.height + scene.player.velocity[1] > this.pos[1]) {
                    scene.player.velocity[1] = this.pos[1] - (scene.player.pos.y + scene.player.height);
                }
            }
        }

        // if scene.player below block horizontally
        if (scene.player.pos.x + scene.player.width > this.pos[0] &&
            scene.player.pos.x < this.pos[0] + this.pos[2]) {

            // if scene.player below block vertically?
            if (scene.player.pos.y >= this.pos[1] + this.pos[3]) {

                // if scene.player in block vertically after movement?
                if (scene.player.pos.y + scene.player.velocity[1] < this.pos[1] + this.pos[3]) {

                    scene.player.velocity[1] = this.pos[1] + this.pos[3] - scene.player.pos.y;

                }
            }
        }

        // if scene.player is on the same high as the block
        if (scene.player.pos.y + scene.player.height > this.pos[1] &&
            scene.player.pos.y < this.pos[1] + this.pos[3]) {

            // if scene.player is left from block
            if (scene.player.pos.x + scene.player.width <= this.pos[0]) {

                // if scene.player in block after movement?
                if (scene.player.pos.x + scene.player.width + scene.player.velocity[0] > this.pos[0]) {

                    scene.player.velocity[0] = this.pos[0] - (scene.player.pos.x + scene.player.width);

                }
            }
        }

        // if scene.player is on the same high as the block
        if (scene.player.pos.y + scene.player.height > this.pos[1] &&
            scene.player.pos.y < this.pos[1] + this.pos[3]) {

            // if scene.player is left from block
            if (scene.player.pos.x >= this.pos[0] + this.pos[2]) {

                // if scene.player in block after movement?
                if (scene.player.pos.x + scene.player.velocity[0] < this.pos[0] + this.pos[2]) {

                    scene.player.velocity[0] = this.pos[0] + this.pos[2] - scene.player.pos.x;

                }
            }
        }

    }

}