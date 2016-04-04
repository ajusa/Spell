function playermulti(x, y, dx, dy, id) {
    this.x = x;
    this.y = y;
    this.lastx = x;
    this.lasty = y;
    this.dx;
    this.dy;
    this.id = id;
    this.sprite = new PIXI.Sprite(playerImg);
    this.sprite.width = 150;
    this.sprite.height = 232;
    this.sprite.anchor = new PIXI.Point(0.5, 0);
    this.tween = new Tweenable();
    stage.addChild(this.sprite);
    this.render = function () {
        this.sprite.x = this.tween.get().x;
        this.sprite.y = this.tween.get().y;
    }
    this.update = function() {
        this.tween.tween({
            from: { x: this.lastx, y: this.lasty },
            to: { x: this.x, y: this.y },
            duration: 50,
            easing: 'swingFromTo',
        });
        this.lastx = this.x;
        this.lasty = this.y;
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }
    this.death = function() {
        stage.removeChild(this.sprite);
    }
}
