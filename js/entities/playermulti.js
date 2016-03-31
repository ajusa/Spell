function playermulti(x, y, id) {
    this.x = x;
    this.y = y;
    this.dx;
    this.dy;
    this.id = id;
    this.sprite = new PIXI.Sprite(playerImg);
    this.sprite.width = 150;
    this.sprite.height = 232;
    stage.addChild(this.sprite);
    this.update = function() {
    	this.x = this.x + this.dx;
    	this.y = this.y + this.dx;
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }
    this.death = function() {
        stage.removeChild(this.sprite);
    }

}
