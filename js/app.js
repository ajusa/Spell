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
function init() {
    var socket = new WebSocket("ws:/localhost:5000/ws");
    // When the connection is open, send some data to the server
    socket.onopen = function() {
        blob = {
            type: "player",
            x: player.x,
            y: player.y,
            id: player.id,
        }
        socket.send(JSON.stringify(blob));
    };

    socket.onerror = function(error) {
        //Implement some error handling code here
    };

    // Log messages from the server
    socket.onmessage = function(e) {
        obj = JSON.parse(e);
        if (obj.type == "player") {
            playerHandler();
        } else if (obj.type == "spell") {
            spellHandler();
        }
    };
    document.body.appendChild(container);
    container.appendChild(canvas);
    canvas.style.cssText = "border: 1px solid black; width: " + 64 + "%; height: " + 36 + "%;";
    container.style.cssText = "text-align: center;";
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    player.id = guid();
    requestAnimationFrame(gameLoop);
}

setInterval(function() {
    player.regen()
}, 1000);


function gameLoop() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    if (screens[0]) { //Starting Screen
        fillRect("#000",0, 0, WIDTH, HEIGHT);
        ctx.font = "70px LCD";
        ctx.fillStyle = "#ECF0F1";
        ctx.fillText("Spell", (WIDTH / 2) - 100, (HEIGHT / 2) - 100);
        ctx.font = "30px LCD";
        ctx.fillText("[Enter to start]", (WIDTH / 2) - 150, (HEIGHT / 2) + 100);
        ctx.font = "15px LCD";
        ctx.fillText(VERSION, 10, 20);
    } else if (screens[1]) { //Main Game
        //Background
        fillRect("#34495e",0, 0, WIDTH, HEIGHT);
        //Stats
        ctx.font = "30px LCD";
        ctx.fillStyle = "#FFF";
        //Spells
        fillRect("#BDC3C7", 1000, 100, 150, 20);
        fillRect("#ECF0F1", 1000, 100, spellTimer * 3, 20);
        ctx.fillText(spellString, 1000, 150);
        ctx.fillStyle = "#E67E22";
        ctx.fillText("Spell " + spellID, 600, 200);
        ctx.fillStyle = "#ECF0F1";
        ctx.fillText(player.health + ' / ' + player.maxHealth + ' Hearts', 100, 100);
        ctx.fillText(player.mana + ' / ' + player.maxMana + ' Mana', 100, 200);
        fillRect("#C0392B", 100, 110, 250, 20);
        fillRect("#8E44Ad", 100, 210, 250, 20);
        fillRect("#E74C3C", 100, 110, (player.health / player.maxHealth) * 250, 20);
        fillRect("#9B59B6", 100, 210, (player.mana / player.maxMana) * 250, 20);
        //Updates the players
        player.update();
        for (var i = Players.length - 1; i >= 0; i--) {
            Players[i].update();
        };
        for (var i = Spells.length - 1; i >= 0; i--)
            Spells[i].update(i);
        //Ground
        fillRect("#95a5a6",GROUND.x, GROUND.y, GROUND.width, GROUND.height);
    } else if (screens[2]) { //Game Over
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.font = "70px LCD";
        ctx.fillStyle = "#E74C3C";
        ctx.fillText("Game Over", 150, 200);
        pauseMusic();
    }

    if (spellTimer > 0) {
        spellTimer--;
    } else {
        spellString = "";
        //player.spellKeyDown = false;
        lastSpellKey = 0;
    }
    requestAnimationFrame(gameLoop);
}