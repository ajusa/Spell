requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;
window.WebFontConfig = {
    google: {
        families: ['VT323::latin']
    },

    active: function() {
        // do something
        gameLoop();
    }
};

// include the web-font loader script
/* jshint ignore:start */
(function() {
    var wf = document.createElement('script');
    wf.src = ('https:' === document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();
var spelldata;
marmottajax("js/spelldata.json").then(function(content) {
    spelldata = JSON.parse(content);
    spelldata = spelldata.spelldata;
    // console.log(spelldata);
});
var player;
var Players = [];
var VERSION = "Alpha 0.1.3",
    WIDTH = 1280,
    HEIGHT = 720,
    GROUND = {
        x: 0,
        y: HEIGHT - 50,
        width: WIDTH,
        height: 50
    };
var Spells = [],
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
setInterval(function() {
    if (screens[1]) player.regen();
}, 1000);
var multi;

var filterStrength = 10;
var frameTime = 0,
    lastLoop = new Date,
    thisLoop;

var biasStrength = 0.003;

function gameStart() {
    multi = new Multiplayer();
    player = new Player(WIDTH / 2 - 25, 450, 150, 232)
    multi.start(player);
    stage.removeChildren();
    screens = [false, true, false];
    bg = new PIXI.Graphics();
    bg.beginFill('0x34495e');
    bg.drawRect(0, 0, WIDTH, HEIGHT);
    bg.endFill();
    bg.beginFill('0x95a5a6');
    bg.drawRect(GROUND.x, GROUND.y, GROUND.width, GROUND.height);
    bg.endFill();
    bg.beginFill('0x660000');
    bg.drawRect(0, 10, WIDTH / 2, 15);
    bg.endFill();
    bg.beginFill('0x141452');
    bg.drawRect(WIDTH / 2, 10, WIDTH / 2, 15);
    bg.endFill();
    bg.beginFill('0x006600');
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

    fps = new PIXI.Text("FPS: 0", {
        font: '18px VT323',
        fill: '#34495e',
        align: 'left'
    });
    fps.x = 2;
    fps.y = HEIGHT - fps.height;
    stage.addChild(fps);
    setInterval(function () {
        var _fps = Math.round(1000 / frameTime);
        fps.text = "FPS: " + _fps;
        if (_fps < 60) {
            fps.style = {
                font: '18px VT323',
                fill: 'red',
                align: 'left'
            };
        }
        else {
            fps.style = {
                font: '18px VT323',
                fill: '#34495e',
                align: 'left'
            };
        }
    }, 500);

    biasText = new PIXI.Text("Bias", {
        font: '24px VT323',
        fill: 0xEEEEEE,
        align: 'right'
    });
    biasText.x = WIDTH - biasText.width - 5;
    biasText.y = 30;
    stage.addChild(biasText);

    biasMeterEarth = new PIXI.Sprite(earthBar);
    biasMeterEarth.y = 55;
    biasMeterEarth.height = 5;
    stage.addChild(biasMeterEarth);

    biasMeterFire = new PIXI.Sprite(fireBar);
    biasMeterFire.y = 60;
    biasMeterFire.height = 5;
    stage.addChild(biasMeterFire);

    biasMeterAir = new PIXI.Sprite(airBar);
    biasMeterAir.y = 65;
    biasMeterAir.height = 5;
    stage.addChild(biasMeterAir);

    biasMeterWater = new PIXI.Sprite(waterBar);
    biasMeterWater.y = 70;
    biasMeterWater.height = 5;
    stage.addChild(biasMeterWater);

    skillDisplay = new PIXI.Text("Skill Points: 0", {
        font: '36px VT323',
        fill: 0xf39c12,
        align: 'center'
    });
    skillDisplay.x = (WIDTH / 2) - (skillDisplay.width / 2);
    skillDisplay.y = 50;
    stage.addChild(skillDisplay);
}

function gameLoop() {
    if (screens[1]) {
        player.update();
        multi.update(player);
        for (var i = Players.length - 1; i >= 0; i--) {
            Players[i].update()
            if (Players[i].id == multi.id) {
                Players[i].death()
            }
        }
        healthMeter.width = (WIDTH / 2) * (player.health / player.maxHealth);
        manaMeter.width = (WIDTH / 2) * (player.mana / player.maxMana);
        baseEXP = 150 * (Math.exp(player.lvl) - 1);
        maxEXP = 150 * (Math.exp(player.lvl + 1) - 1) - baseEXP;
        currentEXP = player.exp - baseEXP;
        expMeter.width = WIDTH * (currentEXP / maxEXP);
        expText.text = "Level " + player.lvl;

        spellCode = spellString.split(" ").join("");
        keyMap = ["U", "I", "O", "P"];
        spellIconMap = [earthIcon, fireIcon, airIcon, waterIcon];
        if (spellCode.length == 1) {
            for (i in icons) {
                icons[i].texture = PIXI.Texture.EMPTY;
            }
        }
        for (i = 0; i < spellCode.length; i++) {
            for (c in keyMap) {
                if (keyMap[c] == spellCode.charAt(i)) {
                    icons[i].texture = spellIconMap[c];
                }
            }
        }

        var biasWidth = 200;
        biasMeterEarth.width = biasWidth * player.bias[0];
        biasMeterEarth.x = WIDTH - biasMeterEarth.width;
        biasMeterFire.width = biasWidth * player.bias[1];
        biasMeterFire.x = WIDTH - biasMeterFire.width;
        biasMeterAir.width = biasWidth * player.bias[2];
        biasMeterAir.x = WIDTH - biasMeterAir.width;
        biasMeterWater.width = biasWidth * player.bias[3];
        biasMeterWater.x = WIDTH - biasMeterWater.width;

        if (player.skillpoints > 0) {
            skillDisplay.text = "Skill Points: " + player.skillpoints.toString()
                                + "\n1. Health\n2. Mana\n3. EXP";
        } else {
            skillDisplay.text = "";
        }
    };
    var thisFrameTime = (thisLoop = new Date) - lastLoop;
    frameTime += (thisFrameTime - frameTime) / filterStrength;
    lastLoop = thisLoop;

    requestAnimationFrame(gameLoop);
    renderer.render(stage);
}
