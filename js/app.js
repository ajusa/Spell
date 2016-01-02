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
        player = new Player(WIDTH / 2 - 25, 450, 50, 100, "#e67e22"),
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
    player.id = guid();
    stage.addChild(splashscreen);
    stage.addChild(text);

    function gameStart() {
        stage.removeChildren();
        screens = [false, true, false]
        bg = new PIXI.Graphics();
        bg.beginFill(0x34495e); 
        bg.drawRect(0, 0, WIDTH, HEIGHT);
        bg.endFill();
        bg.beginFill(0x95a5a6); 
        bg.drawRect(GROUND.x, GROUND.y, GROUND.width, GROUND.height);
        bg.endFill();
        stage.addChild(bg);
    }

    function gameLoop() {
        if (screens[1]) {
            //gamelogic
            console.log("Hey!")

        };
        requestAnimationFrame(gameLoop);
        renderer.render(stage);
    }
