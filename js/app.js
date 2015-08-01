var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.createElement('div'),
    requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;
var hasSentId = false;
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
    //loadRandomMusic();
    document.body.appendChild(container);
    container.appendChild(canvas);
    canvas.style.cssText = "border: 1px solid black; width: " + WIDTH + "px; height: " + HEIGHT + "px;";
    container.style.cssText = "text-align: center;";
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    //player.id = guid();
    socket.on("spell", function(msg) {
        obj = JSON.parse(msg);
        if (player.id == obj.id) {

        } else {
            Spells.push(new Spell(obj.x, obj.y, obj.speed, 1, obj.damage));
        }

    });
    socket.on("death", function(msg) {
        killPlayer(msg);
    });
    socket.on("id", function(msg){
        if (!hasSentId) {
        player.id = msg;
        hasSentId = true;
    }

    })
    socket.on("player", function(msg) {
        obj = JSON.parse(msg);
        if (player.id != obj.id) {
            if (!checkForPlayers(obj)) {
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
        if (player.health < 1) {
            socket.emit("death", player.id)
            player.die();
        }
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

//NEW INPUT CODE
var map = [] //{ w: false, a: false, s: false, d: false, enter: false };
onkeydown = onkeyup = function (e) {
    e = e || event;
    map[e.keyCode] = e.type == 'keydown';
    if (screens[0]) {
        if (map[13]) {
            screens[0] = false;
            screens[1] = true;
        }
    } else {
        if (map[83] && !player.inShot && map[87] && map[68] && player.g) { //Shoot + Jump + Right
            player.shoot();
            player.inShot = true;
            player.dx = 5;
            player.right = true;
            player.velocity = 10;
            player.g = false;
        } else if (map[83] && !player.inShot && map[87] && map[65] && player.g) { //Shoot + Jump + Left
            player.shoot();
            player.inShot = true;
            player.dx = -5;
            player.right = false;
            player.velocity = 10;
            player.g = false;
        } else if (map[83] && !player.inShot && map[68]) { //Shoot + Right
            player.shoot();
            player.inShot = true;
            player.dx = 5;
            player.right = true;
        } else if (map[83] && !player.inShot && map[65]) { //Shoot + Left
            player.shoot();
            player.inShot = true;
            player.dx = -5;
            player.right = false;
        } else if (map[87] && map[68] && player.g) { //Jump + Right
            player.dx = 5;
            player.right = true;
            player.velocity = 10;
            player.g = false;
            player.inShot = false;
        } else if (map[87] && map[65] && player.g) { //Jump + Left
            player.dx = -5;
            player.right = false;
            player.velocity = 10;
            player.g = false;
            player.inShot = false;
        } else if (map[83] && !player.inShot && map[87] && player.g) { //Shoot + Jump
            player.shoot();
            player.inShot = true;
            player.velocity = 10;
            player.g = false;
            player.dx = 0;
        } else if (map[68]) { //Right
            player.dx = 5;
            player.right = true;
            player.inShot = false;
        } else if (map[65]) { //Left
            player.dx = -5;
            player.right = false;
            player.inShot = false;
        } else if (map[87] && player.g) { //Jump
            player.velocity = 10;
            player.g = false;
            player.dx = 0;
            player.inShot = false;
        } else if (map[83] && !player.inShot) { //Shoot
            player.shoot();
            player.inShot = true;
            player.dx = 0;
        } else {
            player.dx = 0;
            player.inShot = false;
        }
    }
}