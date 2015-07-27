var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.createElement('div'),
    requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

var VERSION = "Alpha 0.1",
    WIDTH = 800,
    HEIGHT = 600,
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
    Speed = 4;
var socket;

function init() {
    socket = io("http://68.48.163.27:5000");
    //Event listeners
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    //loadRandomMusic();
    document.body.appendChild(container);
    container.appendChild(canvas);
    canvas.style.cssText = "border: 1px solid black; width: " + WIDTH + "px; height: " + HEIGHT + "px;";
    container.style.cssText = "text-align: center;";
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    socket.on("id", function(msg) {
        player.id = msg;
    });
    socket.on("spell", function(msg) {
        obj = JSON.parse(msg);
        if (player.id == obj.id) {

        } else {
            Spells.push(new Spell(obj.x, obj.y, obj.speed, obj.damage));
        }
    });
    socket.on("player", function(msg) {
        obj = JSON.parse(msg);
        thing = true;
        if (player.id != obj.id) {
            if(!checkForPlayers(obj)){
                Players.push(new Player(obj.x, obj.y, 50, 100, getRandomColor(), obj.id))
            }
        }
    });
    requestAnimationFrame(gameLoop);
}

function gameLoop() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    if (screens[0]) { //Starting Screen
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.font = "70px LCD";
        ctx.fillStyle = "#FFF";
        ctx.fillText("Spell", 300, 200);
        ctx.font = "30px LCD";
        ctx.fillStyle = "#FFF";
        ctx.fillText("[Enter to start]", 260, 400);
        ctx.font = "15px LCD";
        ctx.fillText(VERSION, 10, 20);
    } else if (screens[1]) { //Main Game
        socket.emit("player", JSON.stringify({
            x: player.x,
            y: player.y,
            id: player.id,
            health: player.health,
        })); //Multiplayer
        //Background
        ctx.fillStyle = "#34495e";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        //Stats
        ctx.font = "30px LCD";
        ctx.fillStyle = "#FFF";
        ctx.fillText("You", 320, 100);
        ctx.fillText(player.mana + ' Mana', 320, 200);
        ctx.fillText(player.health + ' Hearts', 320, 150);
        //Updates the players
        player.update();
        for (var i = Players.length - 1; i >= 0; i--) {
            Players[i].update();
        };
        for (var i = Spells.length - 1; i >= 0; i--)
            Spells[i].update(i);
        //Ground
        ctx.fillStyle = "#95a5a6";
        ctx.fillRect(GROUND.x, GROUND.y, GROUND.width, GROUND.height);
    } else if (screens[2]) { //Game Over
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.font = "70px LCD";
        ctx.fillStyle = "#F00";
        ctx.fillText("Game Over", 150, 200);
        pauseMusic();
    }

    requestAnimationFrame(gameLoop);
}

function onKeyDown(key) {
    var keyCode = key.keyCode;

    if (screens[0]) {
        if (keyCode == 13) {
            screens[0] = false;
            screens[1] = true;
        }
    }

    if (screens[1]) {
        if (keyCode == 83 && !player.inShot) {
            player.shoot();
            player.inShot = true;
        }
        if (keyCode == 65) {
            player.dx = -5;
            player.right = false;
        }

        if (keyCode == 68) {
            player.dx = 5;
            player.right = true;
        }



    }
}

function onKeyUp(key) {
    var keyCode = key.keyCode;
    if (screens[1]) {
        if (keyCode == 83 && player.inShot)
            player.inShot = false;



        if (keyCode == 65 || keyCode == 68)
            player.dx = 0;
    }
}
