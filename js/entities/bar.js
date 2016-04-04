function Bar(x, y, w, h, img, v, m) {
    this.sprite = new PIXI.Sprite.fromImage(img);
    this.sprite.x = x;
    this.sprite.y = y;
    this.sprite.width = w;
    this.sprite.height = h;
    this.value = v;
    this.max = m;
    this.width = w;

    stage.addChild(this.sprite);

    this.render = function() {
        this.sprite.width = this.width * (this.value / this.max);
    }
}
