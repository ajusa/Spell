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
    marmottajax("/js/spelldata.json").then(function(content) {
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
        player.regen()
    }, 1000);
    var multi;
    function gameStart() {
        multi = new Multiplayer();
        player = new Player(WIDTH / 2 - 25, 450, 80, 232)
        stage.removeChildren();
        screens = [false, true, false]
        bg = new PIXI.Graphics();
        bg.beginFill(0x34495e); 
        bg.drawRect(0, 0, WIDTH, HEIGHT);
        bg.endFill();
        bg.beginFill(0x95a5a6); 
        bg.drawRect(GROUND.x, GROUND.y, GROUND.width, GROUND.height);
        bg.endFill();
        bg.beginFill(0x660000);
        bg.drawRect(20, 35, 300, 15);
        bg.endFill();
        bg.beginFill(0x141452);
        bg.drawRect(20, 65, 300, 15);
        bg.endFill();
        bg.cacheAsBitmap = true; // temporary for less resource usage
        stage.addChild(bg);
        stage.addChild(player.sprite)
        hpBar = new PIXI.Graphics();
        hpBar.beginFill(0xff0000);
        hpBar.drawRect(20, 35, 300, 15);
        hpBar.endFill();
        stage.addChild(hpBar);
        manaMeter = new PIXI.Sprite(manaBar);
        manaMeter.x = 20;
        manaMeter.y = 65;
        stage.addChild(manaMeter);
    }

    function gameLoop() {
        if (screens[1]) {
            //gamelogic
           // console.log(player.exp + " " + player.lvl)
            player.update();
            hpBar.width = 300 * (player.health / player.maxHealth);
            manaMeter.width = 300 * (player.mana / player.maxMana);
        };
        requestAnimationFrame(gameLoop);
        renderer.render(stage);
    }
