function playermulti(x, y, dx, dy, id) {
    this.x = x;
    this.y = y;
    this.dx;
    this.dy;
    this.id = id;
    this.sprite = new PIXI.Sprite(playerImg);
    this.sprite.width = 128;
    this.sprite.height = 128;
    this.sprite.anchor = new PIXI.Point(0.5, 0);
    stage.addChild(this.sprite);
    this.update = function() {
    	//this.x = this.x + this.dx/1.1;
    	//this.y = this.y + this.dy/1.1;
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }
    this.death = function() {
        stage.removeChild(this.sprite);
    }

}
