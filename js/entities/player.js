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
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    this.dead = false;
    this.speed = 5;
    var lastLvl = -1;

    this.update = function() {
        if (player.dead = true) {
            player.die();
        }
        if (player.health < 1) {
            player.die();
        }
        this.x += this.dx
        this.y -= this.dy;
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.exp += this.expRate;
        this.lvl = Math.floor(Math.log((this.exp / 150) + 1));
        if (lastLvl < this.lvl) {
            this.levelUp();
            lastLvl = this.lvl;
        }

        var mousePosition = renderer.plugins.interaction.mouse.global;
        var playerPosition = new PIXI.Point(WIDTH / 2, HEIGHT / 2);
        var xDiff = mousePosition.x - playerPosition.x;
        this.sprite.rotation = Math.atan(calculateSlope(mousePosition, playerPosition)) + (Math.PI / 2) * (xDiff / Math.abs(xDiff));
    }

    this.shoot = function() {
        if (this.mana >= spelldata.spells[spellID].cost) {
            shotTaken = true;
            this.mana = this.mana - spelldata.spells[spellID].cost;
            x = this.x + 200
            y = this.y + 200
            console.log(this.sprite.rotation)
            dx = Math.cos(this.sprite.rotation - (Math.PI / 2)) * spelldata.spells[spellID].speed/10;
            dy = Math.sin(this.sprite.rotation - (Math.PI / 2)) * spelldata.spells[spellID].speed/10;
            multi.spell(x, y, dx, dy, spellID, this.sprite.rotation);
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
    this.moveRight = function() {
        this.dx = this.speed;
    }
    this.moveLeft = function() {
        this.dx = -this.speed;
    }
    this.moveUp = function() {
        this.dy = this.speed;
    }
    this.moveDown = function() {
        this.dy = -this.speed;
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
