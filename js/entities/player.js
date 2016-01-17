function Player(xval, yval, width, height, id) {
    //Note that all of those must be given some value on creation
    this.x = xval;
    this.y = yval;
    this.dx = 0;
    this.dy = 0;
    this.width = width;
    this.height = height;
    this.mana = 20;
    this.maxMana = 20;
    this.manaRegen = 1.0;
    this.health = 10;
    this.maxHealth = 10;
    this.healthRegen = 0.0;
    this.inShot = false;
    this.g = false; //State variable for when player is touching the ground.
    this.right = true;
    this.speed = 6; //Changed from 4 so you can't hit yourself. Thanks - Arham
    this.id = id;
    this.color = 0xe67e22;
    this.mps = 1;
    this.sprite = new PIXI.Sprite(playerImg);
    this.sprite.width = width;
    this.sprite.height = height;
    this.exp = 0.0;
    this.lvl = 0;

    this.update = function() {

        if (player.health < 1) {
            player.die();
        }
        for (var i = Spells.length - 1; i >= 0; i--) {
            if (isCollide(Spells[i], this)) {
                this.health = this.health - Spells[i].damage;
                Spells[i].kill(i);
            };
        };

        if (isCollide(GROUND, this) && (this.dy < 0)) { //&& !this.g) {
            this.dy = 0;
            this.g = true;
        }

        this.x += this.dx
        this.y -= this.dy;
        if (!this.g) this.dy -= 0.5;

        if (this.x <= 0) {
            this.x = 0;
        }
        if (this.x >= WIDTH - width) {
            this.x = WIDTH - width;
        }
        this.sprite.x = this.x;
        this.sprite.y = this.y;

        this.exp += 1; // TESTING
        this.lvl = Math.floor(Math.log((this.exp / 150) + 1));
    }
    this.shoot = function() {
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
            Spells.push(new Spell(x, y, spellID));
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
        if (this.mana < this.maxMana) this.mana += this.manaRegen;
        if (this.mana > this.maxMana) this.mana = this.maxMana;
    }
}
