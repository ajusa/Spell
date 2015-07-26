function Spell(xval, yval, speed, spell) {
    this.x = xval;
    this.y = yval;
    this.speed = speed;
    this.width = 20;
    this.height = 10;
    //ctx.drawImage(arrowImg,  xval, yval);
    this.update = function(i) {

        //ctx.drawImage(arrowImg, this.x, this.y);
        if(this.x>800||this.x<0)
            Spells[i].kill(i);
        this.x += this.speed;
        ctx.fillStyle = "#000"
        ctx.fillRect(this.x, this.y, this.width, this.height);

    }

    this.kill = function(i) {
        Spells.splice(i, 1);
    }
}
