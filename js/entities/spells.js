function Spell(xval, yval, spell) {
    this.x = xval;
    this.y = yval;
    this.width = 24; // 20
    this.height = 24; // 10

    sprite = new PIXI.Sprite(spelldata.spells[spell].spritepath);
    stage.addChild(sprite);

    this.update = function(i) {
        if(this.x > WIDTH || this.x < 0)
            Spells[i].kill(i);
        this.x += this.speed;
        
    }

    this.kill = function(i) {
        Spells.splice(i, 1);
    }
}
