function Spell(xval, yval, spd, spell) {
    this.x = xval;
    this.y = yval;
    this.width = 24; // 20
    this.height = 24; // 10
    this.speed = spd;
    this.sprite = new PIXI.Sprite.fromImage(spelldata.spells[spell].spritepath);
    stage.addChild(this.sprite);

    this.update = function(i) {
        if(this.x > WIDTH || this.x < 0)
            Spells[i].kill(i);
        this.x += this.speed;
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }

    this.kill = function(i) {
        Spells.splice(i, 1);
        stage.removeChild(this.sprite);
    }
}
