function isCollide(a, b) {
    return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    );
}

function randomNumber(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function checkForPlayers(obj) {
    exists = false;
    for (var i = Players.length - 1; i >= 0; i--) {
        if (Players[i].id == obj.id) {
            Players[i].x = obj.x;
            Players[i].y = obj.y;
            Players[i].health = obj.health;
            exists = true;
        }
    };
    return exists;
}

function killPlayer(id) {
    for (var i = Players.length - 1; i >= 0; i--) {
        if (Players[i].id == id) {
            Players.splice(i, 1);
        }
    };
}

function calculateSlope(a, b) {
    // rise over run
    var s = (a.y - b.y) / (a.x - b.x);
    // console.log(s)
    /*if (x1==x2) {
        // slope is Infinity or -Infinity
    }*/
    return s;
}
function getDistance(x1, x2, y1, y2) {
    return Math.sqrt(Math.abs((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)));
}

var spellMap = ["UUU", "UUI", "UUO", "UUP", "UII", "UIO", "UIP", "UOO", "UOP", "UPP",
    "III", "IIO", "IIP", "IOO", "IOP", "IPP",
    "OOO", "OOP", "OPP",
    "PPP",
    "UU", "UI", "UO", "UP",
    "II", "IO", "IP",
    "OO", "OP",
    "PP",
    "U", "I", "O", "P"
];

function getSpell() {
    var s = "";
    var elements = ["U", "I", "O", "P"];
    for (i = 0; i < 4; i++) {
        for (k = 0; k < spellCode[i]; k++) {
            s += elements[i];
        }
    }
    for (sp in spellMap) {
        if (s == spellMap[sp]) { return sp; }
    }
    return -1;
}

function updateSpellString(q) {
    var elements = ["U", "I", "O", "P"]; // 1 2 3 4
    var sum = 0;
    for (i = 0; i < 4; i++) { sum += spellCode[i]; }
    if (shotTaken || sum >= 3) {
        spellCode = [0, 0, 0, 0];
        for (k = 0; k < 3; k++) { icons[k].texture = PIXI.Texture.EMPTY; }
    }
    // console.log(shotTaken);
    spellCode[q - 1] += 1;
    player.changeBias(q);
    shotTaken = false;
}