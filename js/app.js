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
world.interactive = true;
splashscreen.on('touchstart', gameStart).on('mousedown', gameStart)
    // include the web-font loader script
    /* jshint ignore:start */

function gameStart() {
    multi = new Multiplayer();
    player = new Player(WIDTH / 2 - 25, 450, 128, 128)
        //setInterval(function(){player.interpolate()}, 20); This don't work right now. Pls fix
    multi.start(player);
    world.removeChildren();
    world.addChild(stage);
    screens = [false, true, false];
    bg = new PIXI.Graphics();
    bg.beginFill('0x34495e').drawRect(-5000, 0, 10000, HEIGHT).endFill();
    bg.beginFill('0x95a5a6').drawRect(GROUND.x, GROUND.y, GROUND.width, GROUND.height).endFill();
    stage.addChild(bg);
    bg.cacheAsBitmap = false; // temporary for less resource usage
    world.addChild(bg);
    bg.beginFill('0x95a5a6').drawRect(100, 100, 500, GROUND.height).endFill();
    stage.addChild(bg)
    stage.addChild(player.sprite);
    world.on('mousedown', function() { // This is to shoot spells when the mouse is clicked
        spellID = getSpell();
        player.shoot();
    })
    healthMeter = new PIXI.Sprite(healthBar);
    bg = new PIXI.Graphics();
    bg.beginFill('0x660000').drawRect(0, 10, WIDTH / 2, 15).endFill();
    healthMeter.x = 0;
    healthMeter.y = 10;
    healthMeter.height = 15;
    world.addChild(bg);
    world.addChild(healthMeter);

    bg = new PIXI.Graphics();
    bg.beginFill('0x141452').drawRect(WIDTH / 2, 10, WIDTH / 2, 15).endFill();
    manaMeter = new PIXI.Sprite(manaBar);
    manaMeter.x = WIDTH / 2;
    manaMeter.y = 10;
    manaMeter.height = 15;
    world.addChild(bg);
    world.addChild(manaMeter);

    expMeter = new PIXI.Sprite(expBar);
    bg = new PIXI.Graphics();
    bg.beginFill('0x006600').drawRect(0, 0, WIDTH, 10).endFill();
    expMeter.x = 0;
    expMeter.y = 0;
    expMeter.height = 10;
    world.addChild(expMeter);
    expText = new PIXI.Text("Level 0", {
        font: '24px VT323',
        fill: 0xEEEEEE,
        align: 'left'
    });
    expText.x = 5;
    expText.y = 30;
    world.addChild(bg);
    world.addChild(expText);

    icon1 = new PIXI.Sprite();
    icon1.x = 539;
    world.addChild(icon1);
    icon2 = new PIXI.Sprite();
    icon2.x = 608;
    world.addChild(icon2);
    icon3 = new PIXI.Sprite();
    icon3.x = 677;
    world.addChild(icon3);
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
    world.addChild(fps);
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
    world.addChild(biasText);

    biasMeterEarth = new PIXI.Sprite(earthBar);
    biasMeterEarth.y = 55;
    biasMeterEarth.height = 5;
    world.addChild(biasMeterEarth);

    biasMeterFire = new PIXI.Sprite(fireBar);
    biasMeterFire.y = 60;
    biasMeterFire.height = 5;
    world.addChild(biasMeterFire);

    biasMeterAir = new PIXI.Sprite(airBar);
    biasMeterAir.y = 65;
    biasMeterAir.height = 5;
    world.addChild(biasMeterAir);

    biasMeterWater = new PIXI.Sprite(waterBar);
    biasMeterWater.y = 70;
    biasMeterWater.height = 5;
    world.addChild(biasMeterWater);

    skillDisplay = new PIXI.Text("Skill Points: 0", {
        font: '36px VT323',
        fill: 0xf39c12,
        align: 'center'
    });
    skillDisplay.x = (WIDTH / 2) - (skillDisplay.width / 2);
    skillDisplay.y = 150;
    world.addChild(skillDisplay);

}

function gameLoop() {
    if (screens[1]) {
        for (var i = Spells.length - 1; i >= 0; i--) {
            Spells[i].update(i)
        }
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

        spellIconMap = [earthIcon, fireIcon, airIcon, waterIcon];
        var iconCounter = 0;
        for (i = 0; i < 4; i++) {
            for (k = 0; k < spellCode[i]; k++) {
                icons[iconCounter++].texture = spellIconMap[i];
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
            skillDisplay.text = "Skill Points: " + player.skillpoints.toString() + "\n1. Health\n2. Mana\n3. EXP";
        } else {
            skillDisplay.text = "";
        }
        // if (Math.abs(player.x - camera.x) > 1200) {
        camera.x = player.x;
        camera.y = player.y;
        //}

    };
    if (screens[2]) {
        //Death Screen
    }
    var thisFrameTime = (thisLoop = new Date) - lastLoop;
    frameTime += (thisFrameTime - frameTime) / filterStrength;
    lastLoop = thisLoop;
    requestAnimationFrame(gameLoop);
    stage.update();
    renderer.render(world);
}
