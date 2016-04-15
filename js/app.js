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
splashscreen.interactive = true;
splashscreen.on('touchstart', gameStart).on('mousedown', gameStart)
// include the web-font loader script
/* jshint ignore:start */

var healthMeter, manaMeter, expMeter, biasMeterEarth, biasMeterFire, biasMeterWater, biasMeterAir;

function gameStart() {
    setInterval(function() { publish("update") }, 50);
    multi = new Multiplayer();
    player = new Player(WIDTH / 2 - 25, 450, 150, 232)
    //setInterval(function(){player.interpolate()}, 20); This don't work right now. Pls fix
    multi.start(player);
    stage.removeChildren();
    screens = [false, true, false];
    bg = new PIXI.Graphics();
    bg.beginFill('0x34495e').drawRect(0, 0, WIDTH, HEIGHT).endFill();
    bg.beginFill('0x95a5a6').drawRect(GROUND.x, GROUND.y, GROUND.width, GROUND.height).endFill();
    bg.beginFill('0x660000').drawRect(0, 10, WIDTH / 2, 15).endFill();
    bg.beginFill('0x141452').drawRect(WIDTH / 2, 10, WIDTH / 2, 15).endFill();
    bg.beginFill('0x006600').drawRect(0, 0, WIDTH, 10).endFill();
    bg.cacheAsBitmap = true; // temporary for less resource usage
    stage.addChild(bg);
    stage.addChild(player.sprite);

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
    setInterval(function() {
        var _fps = Math.round(1000 / frameTime);
        fps.text = "FPS: " + _fps;
        if (_fps < 60) {
            fps.style = {
                font: '18px VT323',
                fill: 'red',
                align: 'left'
            };
        } else {
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

    skillDisplay = new PIXI.Text("Skill Points: 0", {
        font: '36px VT323',
        fill: 0xf39c12,
        align: 'center'
    });
    skillDisplay.x = (WIDTH / 2) - (skillDisplay.width / 2);
    skillDisplay.y = 150;
    stage.addChild(skillDisplay);

    healthMeter = new Bar(0, 10, WIDTH / 2, 15, healthBar, player.health, player.maxHealth);
    manaMeter = new Bar(WIDTH / 2, 10, WIDTH / 2, 15, manaBar, player.mana, player.maxMana);
    expMeter = new Bar(0, 0, WIDTH, 10, expBar, player.exp, player.exp);
    statMeters = [healthMeter, manaMeter, expMeter];

    var biasWidth = 200;
    biasMeterEarth = new Bar(0, 55, biasWidth, 5, earthBar, 0.25, 1);
    biasMeterFire = new Bar(0, 60, biasWidth, 5, fireBar, 0.25, 1);
    biasMeterAir = new Bar(0, 65, biasWidth, 5, airBar, 0.25, 1);
    biasMeterWater = new Bar(0, 70, biasWidth, 5, waterBar, 0.25, 1);
    biasMeters = [biasMeterEarth, biasMeterFire, biasMeterAir, biasMeterWater];

}
subscribe("update", function() {
    for (var i = Players.length - 1; i >= 0; i--) {
        Players[i].update()
        if (Players[i].id == multi.id) {
            Players[i].death()
        }
    }
    for (var i = Spells.length - 1; i >= 0; i--) {
        Spells[i].update(i)
    }
    player.update();
    multi.update(player);
})

function gameLoop() {
    if (screens[1]) {
        player.render()
        for (var i = Players.length - 1; i >= 0; i--) {
            Players[i].render()

        }
        healthMeter.value = player.health;
        manaMeter.value = player.mana;

        baseEXP = 150 * (Math.exp(player.lvl) - 1);
        maxEXP = 150 * (Math.exp(player.lvl + 1) - 1) - baseEXP;
        currentEXP = player.exp - baseEXP;
        expMeter.max = maxEXP;
        expMeter.value = currentEXP;
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

        for (var i in biasMeters) {
            biasMeters[i].value = player.bias[i];
            biasMeters[i].sprite.x = WIDTH - biasMeters[i].sprite.width;
        }

        if (player.skillpoints > 0) {
            skillDisplay.text = "Skill Points: " + player.skillpoints.toString() + "\n1. Health\n2. Mana\n3. EXP";
        } else {
            skillDisplay.text = "";
        }
    };
    var thisFrameTime = (thisLoop = new Date) - lastLoop;
    frameTime += (thisFrameTime - frameTime) / filterStrength;
    lastLoop = thisLoop;

    if (screens[1]) {
        console.log("show ded screen");
        return;
    }

    requestAnimationFrame(gameLoop);
    renderer.render(stage);
}
