function Spell(xval, yval, spd, spell, id) {
    this.x = xval;
    this.y = yval;
    this.width = 24; // 20
    this.height = 24; // 10
    this.speed = spd;
    this.id = id;
    this.sprite = new PIXI.Sprite.fromImage(spelldata.spells[spell].spritepath);
    stage.addChild(this.sprite);
    this.update = function(i) {
        if(this.x > WIDTH || this.x < 0)
            multi.spellRemove(Spells[i].id)
        this.x += this.speed;
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }

    this.kill = function(i) {
        stage.removeChild(this.sprite);
        Spells.splice(i, 1);
    }
}
