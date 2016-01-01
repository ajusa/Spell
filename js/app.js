    requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;

    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        container = document.createElement('div'),
        requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;
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
    var stage;
    var renderer;
    var titleText;
    var firstScreen = new PIXI.Container();

    function init() {

        stage = new PIXI.Container();

        // create a renderer instance.
        renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT);
        document.body.appendChild(container);
        // add the renderer view element to the DOM
        container.appendChild(renderer.view);
        // When the connection is open, send some data to the server
        renderer.view.style.cssText = "border: 1px solid black; width: " + 64 + "%; height: " + 36 + "%;";
        container.style.cssText = "text-align: center;";
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
        player.id = guid();
        setTimeout( gameLoop, 1000 );
        titleText = new PIXI.Text('Spell', {
        font: '70px VT323',
        fill: 0xff1010,
        align: 'center'
    });
    }

    function gameLoop() {


        titleText.x = (WIDTH / 2) - 100;
        titleText.y = (HEIGHT / 2) - 100;

        stage.addChild(titleText);

        renderer.render(stage);
        requestAnimationFrame(gameLoop);
    }
