function Player(xval, yval, width, height, color, id) {
    //Note that all of those must be given some value on creation
    this.x = xval;
    this.y = yval;
    this.dx = 0;
    this.dy = 0;
    this.width = width;
    this.height = height;
    this.mana = 20;
    this.maxMana = 20;
    this.health = 10;
    this.maxHealth = 10;
    this.inShot = false;
    this.g = false; //State variable for when player is touching the ground.
    //this.wPressed = false;
    this.right = true;
    this.speed = 6; //Changed from 4 so you can't hit yourself.
    this.id = id;
    this.color = color;
    this.mps = 1;
    //this.spellKeyDown = false;
    this.update = function() {

        for (var i = Spells.length - 1; i >= 0; i--) {
            if (isCollide(Spells[i], this)) {
                this.health = this.health - Spells[i].damage;
                Spells[i].kill(i);
            };

        };

        if (isCollide(GROUND, this) && (this.dy < 0)) { //&& !this.g) {
            this.dy = 0;
            this.g = true;
        } //else {
        //    this.g = false;
        //}
        //document.getElementById("log").innerHTML = this.g;

        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        //if (this.dx > 5) this.dx = 5;
        //if (this.dx < 0) this.dx = 0;
        //if (this.right) {
            this.x += this.dx
        //} else {
            //this.x -= this.dx;
        //}

        this.y -= this.dy;
        if (!this.g) this.dy -= 0.5;

        if (this.x <= 0) {
            this.x = 0;
        }
        if (this.x >= WIDTH - width) {
            this.x = WIDTH - width;
        }

        this.shoot = function () {
            if (this.mana > 0) {
                this.mana--;
                if (this.right) {
                    this.speed = Math.abs(this.speed)

                };
                if (!this.right) {
                    this.speed = -Math.abs(this.speed)
                };


                x = this.x + this.width + 20;

                if (!this.right) {
                    x = this.x - 40;
                }

                y = this.y + this.height / 2;
                speed = this.speed;
                Spells.push(new Spell(x, y, speed, 1, 1));
                socket.emit("spell", JSON.stringify({
                    x: x,
                    y: y,
                    speed: speed,
                    id: player.id,
                    damage: 1,
                })); //Multiplayer
            }
        }

        this.takeDamage = function(damage) {
            this.health -= damage;
        }

        this.die = function() {
            //Setting to gameover screen
            socket.emit("death", this.id)
            screens[1] = false;
            screens[2] = true;
        }

        this.regen = function() {
            if (this.mana != this.maxMana) this.mana++;
        }
    }
}
