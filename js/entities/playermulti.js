function playermulti (x, y, id, color) {
	this.x = x;
	this.y = y;
	this.id = id;
	this.color = color;
	this.width = width;
    this.height = height;
	this.update = function() {

        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        
}