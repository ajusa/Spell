var STARTING_MANA = 20;
var STARTING_HEALTH = 10; //Hearts
function Player(xval, yval, width, height, color, id) {
    //Note that all of those must be given some value on creation
    this.x = xval;
    this.y = yval;
    this.dx = 0;
    this.dy = 0;
    this.width = width;
    this.height = height;
    this.mana = STARTING_MANA;
    this.health = STARTING_HEALTH;
    this.inShot = false;
    this.g = false; //State variable for when player is touching the ground.
    //this.wPressed = false;
    this.right = true;
    this.speed = 4;
    this.velocity = 0; //For parabolic jumps
    this.id = id;
    this.color = color;
    this.update = function() {

        for (var i = Spells.length - 1; i >= 0; i--) {
            if (isCollide(Spells[i], this)) {
                this.health = this.health - Spells[i].damage;
                Spells[i].kill(i);
            };

        };

        if (isCollide(GROUND, this) && !this.g) {
            this.velocity = 0;
            this.g = true;
            //document.getElementById("log").innerHTML = "Found player on ground";
        } else {
            this.g = false;
        }
        
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        this.x += this.dx;
        this.y -= this.velocity;
        if (!this.g) this.velocity -= 0.5;
        //document.getElementById("log").innerHTML += this.velocity + " ";

        if (this.x <= 0) {
            this.x = 0;
        }
        if (this.x >= WIDTH - width) {
            this.x = WIDTH - width;
        }
    }

    this.shoot = function() {
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
    this.takeDamage = function(damage) {
        this.health -= damage;
    }

    this.die = function() {
        //Setting to gameover screen
        socket.emit("death", this.id)
        screens[1] = false;
        screens[2] = true;
    }
}
