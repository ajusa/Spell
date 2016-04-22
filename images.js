//This is where we will load all of the images in.
var splash = new PIXI.Texture.fromImage('assets/splashscreen.png');
var playerImg = new PIXI.Texture.fromImage('assets/Wizard Topdown.png');
var manaBar = new PIXI.Texture.fromImage('assets/mana.png');
var healthBar = new PIXI.Texture.fromImage('assets/health.png');
var expBar = new PIXI.Texture.fromImage('assets/exp.png');

var airIcon = new PIXI.Texture.fromImage('assets/elements/air_icon.png');
var earthIcon = new PIXI.Texture.fromImage('assets/elements/earth_icon.png');
var fireIcon = new PIXI.Texture.fromImage('assets/elements/fire_icon.png');
var waterIcon = new PIXI.Texture.fromImage('assets/elements/water_icon.png');

var airBar = new PIXI.Texture.fromImage('assets/elements/air_bar.png');
var earthBar = new PIXI.Texture.fromImage('assets/elements/earth_bar.png');
var fireBar = new PIXI.Texture.fromImage('assets/elements/fire_bar.png');
var waterBar = new PIXI.Texture.fromImage('assets/elements/water_bar.png');
cheet('w e e d', function() {
	var splash = new PIXI.Texture.fromImage('assets/weedsplash.jpg');
    splashscreen.texture = splash;
    var playerImg = new PIXI.Texture.fromImage('assets/snoop.png');
    player.sprite.texture = playerImg;
    var airIcon = new PIXI.Texture.fromImage('assets/weed.png');
    var earthIcon = new PIXI.Texture.fromImage('assets/weed.png');
    var fireIcon = new PIXI.Texture.fromImage('assets/weed.png');
    var waterIcon = new PIXI.Texture.fromImage('assets/weed.png');
    for (i in icons) {
        icons[i].texture = airIcon;
    } 
});
