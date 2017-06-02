class Collision {
    constructor(x, y, width, height) {
        this.pos = [x, y, width, height];
        this.middle = { x: this.pos[0] + this.pos[2] * 0.5, y: this.pos[1] + this.pos[3] * 0.5 }
        this.diameterSQR = this.pos[2] * this.pos[2] + this.pos[3] * this.pos[3];

    }

    checkCollsion() {

        if ((this.middle.x - scene.player.middle.x * this.middle.x - scene.player.middle.x) + (this.middle.y - scene.player.middle.y * this.middle.y - scene.player.middle.y) <= this.diameterSQR + scene.player.diameterSQR + scene.player.speed[0]) {
            // if scene.player above block horizontally
            if (scene.player.pos.x + scene.player.width > this.pos[0] &&
                scene.player.pos.x < this.pos[0] + this.pos[2]) {
                // if scene.player above block vertically?
                if (scene.player.pos.y + scene.player.height <= this.pos[1]) {
                    // if scene.player in block vertically after movement?
                    if (scene.player.pos.y + scene.player.height + scene.player.velocity[1] > this.pos[1]) {
                        scene.player.velocity[1] = this.pos[1] - (scene.player.pos.y + scene.player.height);
                        return;
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
                        return;
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
                        return;
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
                        return;
                    }
                }
            }

            if (!(((scene.player.pos.y + scene.player.height + scene.player.velocity[1]) <= (this.pos[1])) ||
                    (scene.player.pos.y + scene.player.velocity[1] >= (this.pos[1] + this.pos[3])) ||
                    ((scene.player.pos.x + scene.player.width + scene.player.velocity[0]) <= this.pos[0]) ||
                    (scene.player.pos.x + scene.player.velocity[0] >= (this.pos[0] + this.pos[2])))) {
                scene.player.velocity = [0, 0];
                return;
            }
        }
    }
}