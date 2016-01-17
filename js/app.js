requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;
window.WebFontConfig = {
    google: {
        families: ['VT323::latin']
    },

    active: function () {
        // do something
        gameLoop();
    }
};

// include the web-font loader script
/* jshint ignore:start */
(function () {
    var wf = document.createElement('script');
    wf.src = ('https:' === document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();
var spelldata;
marmottajax("/js/spelldata.json").then(function (content) {
    spelldata = JSON.parse(content);
    console.log(spelldata);
});
var player;
var VERSION = "Alpha 0.1.1",
    WIDTH = 1280,
    HEIGHT = 720,
    GROUND = {
        x: 0,
        y: HEIGHT - 50,
        width: WIDTH,
        height: 50
    };
var Spells = [],
    Players = [],
    screens = [true, false, false],
    Speed = 6;
var spellTimer = 0;
var stage = new PIXI.Container();
var renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT);
var container = document.createElement('div');
var text = new PIXI.Text(VERSION, {
    font: '48px VT323',
    fill: 0xff1010,
    align: 'center'
});
text.x = 10;
text.y = 10;
var splashscreen = new PIXI.Sprite(splash);
splashscreen.interactive = true;
splashscreen.on('touchstart', gameStart).on('mousedown', gameStart)
document.body.appendChild(container);
container.appendChild(renderer.view);
renderer.view.style.cssText = "border: 1px solid black; width: " + 64 + "%; height: " + 36 + "%;";
container.style.cssText = "text-align: center;";
stage.addChild(splashscreen);
stage.addChild(text);
setInterval(function () {
    if (screens[1]) player.regen();
}, 1000);
var multi;
function gameStart() {
    multi = new Multiplayer();
    player = new Player(WIDTH / 2 - 25, 450, 80, 232)
    stage.removeChildren();
    screens = [false, true, false];
    bg = new PIXI.Graphics();
    bg.beginFill(0x34495e);
    bg.drawRect(0, 0, WIDTH, HEIGHT);
    bg.endFill();
    bg.beginFill(0x95a5a6);
    bg.drawRect(GROUND.x, GROUND.y, GROUND.width, GROUND.height);
    bg.endFill();
    bg.beginFill(0x660000);
    bg.drawRect(0, 10, WIDTH / 2, 15);
    bg.endFill();
    bg.beginFill(0x141452);
    bg.drawRect(WIDTH / 2, 10, WIDTH / 2, 15);
    bg.endFill();
    bg.beginFill(0x006600);
    bg.drawRect(0, 0, WIDTH, 10);
    bg.endFill();
    bg.cacheAsBitmap = true; // temporary for less resource usage
    stage.addChild(bg);
    stage.addChild(player.sprite);

    healthMeter = new PIXI.Sprite(healthBar);
    healthMeter.x = 0;
    healthMeter.y = 10;
    healthMeter.height = 15;
    stage.addChild(healthMeter);

    manaMeter = new PIXI.Sprite(manaBar);
    manaMeter.x = WIDTH / 2;
    manaMeter.y = 10;
    manaMeter.height = 15;
    stage.addChild(manaMeter);

    expMeter = new PIXI.Sprite(expBar);
    expMeter.x = 0;
    expMeter.y = 0;
    expMeter.height = 10;
    stage.addChild(expMeter);
    expText = new PIXI.Text("Level 0", {
        font: '24px VT323',
        fill: 0xEEEEEE,
        align: 'left'
    });
    expText.x = 5;
    expText.y = 30;
    stage.addChild(expText);

    icon1 = new PIXI.Sprite();
    icon1.x = 539;
    stage.addChild(icon1);
    icon2 = new PIXI.Sprite();
    icon2.x = 608;
    stage.addChild(icon2);
    icon3 = new PIXI.Sprite();
    icon3.x = 677;
    stage.addChild(icon3);
    icons = [icon1, icon2, icon3];
    for (i in icons) {
        icons[i].y = 40;
        icons[i].width = 64;
        icons[i].height = 64;
    }
}

function gameLoop() {
    if (screens[1]) {
        player.update();
        healthMeter.width = (WIDTH / 2) * (player.health / player.maxHealth);
        manaMeter.width = (WIDTH / 2) * (player.mana / player.maxMana);
        baseEXP = 150 * (Math.exp(player.lvl) - 1);
        maxEXP = 150 * (Math.exp(player.lvl + 1) - 1) - baseEXP;
        currentEXP = player.exp - baseEXP;
        expMeter.width = WIDTH * (currentEXP / maxEXP);
        expText.text = "Level " + player.lvl;

        spellCode = spellString.split(" ").join("");
        keyMap = ["U", "I", "O", "P"];
        spellMap = [earthIcon, fireIcon, airIcon, waterIcon];
        if (spellCode.length == 1) {
            for (i in icons) { icons[i].texture = PIXI.Texture.EMPTY; }
        }
        for (i = 0; i < spellCode.length; i++) {
            for (c in keyMap) {
                if (keyMap[c] == spellCode.charAt(i)) { icons[i].texture = spellMap[c]; }
            }
        }
    };
    requestAnimationFrame(gameLoop);
    renderer.render(stage);
}
