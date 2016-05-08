function Spell(xval, yval, dx, dy, spell, rotation, id) {
    this.x = xval;
    this.y = yval;
    this.dy = dy;
    this.dx = dx;
    this.width = 32; // This is the size of the image
    this.height = 32; // 10
    this.id = id;
    this.rotation = rotation;
    this.damage = spelldata.spells[spell].damage;
    this.sprite = new PIXI.Sprite.fromImage(spelldata.spells[spell].spritepath);
    this.sprite.width = 32;
    this.sprite.height = 32;
    this.sprite.rotation = rotation;
    this.distance = spelldata.spells[spell].distance;
    this.distanceSoFar;
    stage.addChild(this.sprite);
    this.update = function(i) {
        if (this.distanceSoFar > this.distance)
            multi.spellRemove(Spells[i].id)
        if (isCollide(this, player)) {
            player.health = player.health - this.damage;
            multi.spellRemove(this.id)
        };
        this.x += this.dx;
        this.y += this.dy;
        this.distanceSoFar = Math.abs(getDistance(this.x, xval, this.y, yval))
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }

    this.kill = function(i) {
        stage.removeChild(this.sprite);
        Spells.splice(i, 1);
    }
}
