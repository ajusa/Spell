function playermulti(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.sprite = new PIXI.Sprite(playerImg);
    this.sprite.width = 150;
    this.sprite.height = 232;
    stage.addChild(this.sprite);
    this.update = function() {
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }
    this.death = function() {
        stage.removeChild(this.sprite);
    }

}
