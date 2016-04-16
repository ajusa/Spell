function Spell(xval, yval, spell, id, sign) {
    this.x = xval;
    this.y = yval;
    this.width = 24; // 20
    this.height = 24; // 10
    this.speed = sign * spelldata.spells[spell].speed;
    this.id = id;
    this.damage = spelldata.spells[spell].damage;
    this.sprite = new PIXI.Sprite.fromImage(spelldata.spells[spell].spritepath);
    this.distance = spelldata.spells[spell].distance;
    this.distanceSoFar;
    stage.addChild(this.sprite);
    this.update = function(i) {
        if(this.distanceSoFar> this.distance)
            multi.spellRemove(Spells[i].id)
        if (isCollide(this, player)) {
                player.health = player.health - this.damage;
                multi.spellRemove(this.id)
            };
        this.x += this.speed;
        this.distanceSoFar = Math.abs(this.x-xval)
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }

    this.kill = function(i) {
        stage.removeChild(this.sprite);
        Spells.splice(i, 1);
    }
}
