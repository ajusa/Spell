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
    this.color = 0xe67e22;
    this.mps = 1;
    this.sprite = new PIXI.Sprite(playerImg);
    this.sprite.width = width;
    this.sprite.height = height;
    this.exp = 0;
    this.lvl = 0;
    this.expRate = 1.0;
    this.bias = [0.250, 0.250, 0.250, 0.250]; // earth fire air water
    this.skillpoints = 0;
    this.sprite.anchor = new PIXI.Point(0.5, 0);
    this.dead = false;
    var lastLvl = -1;

    this.update = function() {
        if (player.health < 1) {
            player.die();
        }

        for (var i = Spells.length - 1; i >= 0; i--) {
            if (isCollide(Spells[i], this)) {
                this.health = this.health - Spells[i].damage;
                multi.spellRemove(Spells[i].id)
            };
        };

        if (isCollide(GROUND, this) && (this.dy < 0)) { //&& !this.g) {
            this.dy = 0;
            this.g = true;
        }

        this.x += this.dx
        this.y -= this.dy;
        if (!this.g) this.dy -= 0.5;

        if (this.x <= width / 2) {
            this.x = width / 2;
        }
        if (this.x >= WIDTH - width / 2) {
            this.x = WIDTH - width / 2;
        }
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.exp += this.expRate;
        this.lvl = Math.floor(Math.log((this.exp / 150) + 1));
        if (lastLvl < this.lvl) {
            this.levelUp();
            lastLvl = this.lvl;
        }

        if (this.right) {
            this.sprite.scale.x = 1;
        } else {
            this.sprite.scale.x = -1;
        }
    }
    
    this.shoot = function() {
        if (this.mana > 0) {
            this.mana--;
            speed = 0;
            x = 0;
            if (this.right) {
                speed = Math.abs(this.speed);
                x = this.x + this.width + 20; // Changing this breaks something?
            } else {
                speed = -Math.abs(this.speed);
                x = this.x - this.width / 2;
            }
            y = this.y + this.height / 2;
            multi.spell(x, y, spellID, this.sprite.scale.x);
        }
    }

    this.takeDamage = function(damage) {
        this.health -= damage;
    }

    this.die = function() {
        screens[1] = false;
        screens[2] = true;
        this.dead = true;
        multi.item.remove();
        //Setting to gameover screen
    }

    this.regen = function() {
        if (this.mana < this.maxMana) this.mana += this.manaRegen;
        if (this.mana > this.maxMana) this.mana = this.maxMana;
    }

    this.levelUp = function() {
        // add skill buttons to stage
        // animate levelup somehow

        this.skillpoints += 1;
    }

    this.changeBias = function(keyID) { // Valid keyIDs are 1 2 3 4 for earth fire air water resp.
        var totalC = 0;
        for (i = 0; i < 4; i++) {
            if (i != keyID - 1) {
                this.bias[i] -= biasStrength;
                totalC += biasStrength;
                if (this.bias[i] < 0) {
                    var diff = -1 * this.bias[i];
                    this.bias[i] += diff;
                    totalC -= diff;
                }
            }
        }
        this.bias[keyID - 1] += totalC;
    }
}
