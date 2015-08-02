var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.createElement('div'),
    requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;
var hasSentId = false;
var VERSION = "Alpha 0.1",
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
    Speed = 4;
var socket;
var manaTimer = setInterval(function () { player.regen() }, 1000);

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

var spellTimer = 0;
function gameLoop() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    if (screens[0]) { //Starting Screen
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.font = "70px LCD";
        ctx.fillStyle = "#FFF";
        ctx.fillText("Spell", (WIDTH / 2) - 100, (HEIGHT / 2) - 100);
        ctx.font = "30px LCD";
        ctx.fillStyle = "#FFF";
        ctx.fillText("[Enter to start]", (WIDTH / 2) - 150, (HEIGHT / 2) + 100);
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
        //ctx.fillText("You", 320, 100);
        ctx.fillText(player.mana + ' / ' + player.maxMana + ' Mana', 200, 150);
        ctx.fillText(player.health + ' Hearts', 200, 100);
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

    if (spellTimer > 0) {
        spellTimer--;
    } else {
        spellString = "";
        //player.spellKeyDown = false;
        lastSpellKey = 0;
    }

    if (screens[1]) {
        ctx.fillStyle = "#19232D";
        ctx.fillRect(1000, 100, 150, 20);
        ctx.fillStyle = "#DDD";
        ctx.fillRect(1000, 100, spellTimer * 3, 20);
        ctx.fillStyle = "#DDD";
        ctx.fillText(spellString, 1000, 150);
        ctx.fillStyle = "#C0392b";
        ctx.fillText(spellID, 600, 200);
    }
    
    requestAnimationFrame(gameLoop);
}

//NEW INPUT CODE
var spellString = "";
var lastSpellKey = 0;
var spellID = 0;
var keyUp = [];
var map = []; //{ w: false, a: false, s: false, d: false, enter: false };
onkeydown = onkeyup = function (e) {
    e = e || event; //IE
    map[e.keyCode] = e.type == 'keydown';
    keyUp[e.keyCode] = e.type == 'keyup';
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
            player.g = false;
            player.dy = 10;
        } else if (map[83] && !player.inShot && map[87] && map[65] && player.g) { //Shoot + Jump + Left
            player.shoot();
            player.inShot = true;
            player.dx = -5;
            player.right = false;
            player.dy = 10;
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
            player.dy = 10;
            player.g = false;
            player.inShot = false;
        } else if (map[87] && map[65] && player.g) { //Jump + Left
            player.dx = -5;
            player.right = false;
            player.dy = 10;
            player.g = false;
            player.inShot = false;
        } else if (map[83] && !player.inShot && map[87] && player.g) { //Shoot + Jump
            player.shoot();
            player.inShot = true;
            player.dy = 10;
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
            player.dy = 10;
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
    
    if (screens[1]) {
        //var eLength = 0;
        if (spellString.length >= 6) {
            spellID = getSpell(spellString);
            
            spellTimer = 0;
            spellString = "";
            lastSpellKey = 0;
        } else {
            if (keyUp[85] && lastSpellKey == 1) {
                lastSpellKey = 0;
            } else if (keyUp[73] && lastSpellKey == 2) {
                lastSpellKey = 0;
            } else if (keyUp[79] && lastSpellKey == 3) {
                lastSpellKey = 0;
            } else if (keyUp[80] && lastSpellKey == 4) {
                lastSpellKey = 0;
            }
            //if (!player.spellKeyDown) {
                if (map[85] && (lastSpellKey != 1)) {
                    spellString += "U ";
                    lastSpellKey = 1;
                    spellTimer = 50;
                } else if (map[73] && (lastSpellKey != 2)) {
                    spellString += "I ";
                    lastSpellKey = 2;
                    spellTimer = 50;
                } else if (map[79] && (lastSpellKey != 3)) {
                    spellString += "O ";
                    lastSpellKey = 3;
                    spellTimer = 50;
                } else if (map[80] && (lastSpellKey != 4)) {
                    spellString += "P ";
                    lastSpellKey = 4;
                    spellTimer = 50;
                } //else {
                    //player.spellKeyDown = false;
                //}
            //}
        }
        
        //if (map[85] || map[73] || map[79] || map[80]) {
        //    spellTimer = 60;
        //    player.spellKeyDown = true;
        //} else {
        //    player.spellKeyDown = false;
        //}
    }
}
