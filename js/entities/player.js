var STARTING_MONEY = 20;
var STARTING_HEALTH = 10; //Hearts
function Player(xval, yval, width, height, color) {
    //Note that all of those must be given some value on creation
    this.x = xval;
    this.y = yval;
    this.dx = 0;
    this.dy = 0;
    this.width = width;
    this.height = height;
    this.money = STARTING_MONEY;
    this.health = STARTING_HEALTH;
    this.inShot = false;
    this.right = true;
    this.speed = 4;
    this.id = "";
    this.update = function() {

        /*for (var i = Spells.length - 1; i >= 0; i--) {
            if (isCollide(Spells[i], this)) {
                this.health = this.health - Spells[i].damage;
                Spells[i].kill(i);
            };
            
        };*/
        //if (this.health < 1) {
          //  this.die();
       // } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            this.x += this.dx;
            this.y += this.dy;
        //}
    }

    this.shoot = function() {
        if (this.right) {
            this.speed = Math.abs(this.speed)

        };
        if (!this.right) {
            this.speed = -Math.abs(this.speed)
        };
        if (Math.random() >= .5) {
            x = this.x + this.width + 20;

            if (!this.right) {
                x = this.x - 0;
            }
            y = this.y + this.height / 2 + 10 * Math.random();
            speed = this.speed;
            Spells.push(new Spell(x, y, speed, 1,1));
            socket.emit("spell", JSON.stringify({
                x: x,
                y: y,
                speed: speed,
                id: player.id,
                damage: 1,
            })); //Multiplayer
        } else {

            x = this.x + this.width +20;

            if (!this.right) {
                x = this.x - 40;
            }
            x = this.x + this.width;
            y = this.y + this.height / 2 - 10 * Math.random();
            speed = this.speed;
            Spells.push(new Spell(x, y, speed,1,1));
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
        screens[1] = false;
        screens[2] = true;
    }
}
