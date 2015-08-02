function Spell(xval, yval, speed, spell, damage) {
    this.x = xval;
    this.y = yval;
    this.speed = speed;
    this.width = 20;
    this.height = 10;
    this.damage = damage;
    //ctx.drawImage(arrowImg,  xval, yval);
    this.update = function(i) {

        //ctx.drawImage(arrowImg, this.x, this.y);
        if(this.x > WIDTH || this.x < 0)
            Spells[i].kill(i);
        this.x += this.speed;
        ctx.fillStyle = "#000"
        ctx.fillRect(this.x, this.y, this.width, this.height);

    }

    this.kill = function(i) {
        Spells.splice(i, 1);
    }
}
