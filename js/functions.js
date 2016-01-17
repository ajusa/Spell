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

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

var spellMap = ["UUU", "UUI", "UUO", "UUP", "UII", "UIO", "UIP", "UOO", "UOP", "UPP",
        "III", "IIO", "IIP", "IOO", "IOP", "IPP",
        "OOO", "OOP", "OPP",
        "PPP"
];
function getSpell(inS) {
    var inA = inS.trim().split(" ");
    var u = 0,
        i = 0,
        o = 0,
        p = 0;
    for (k = 0; k < inA.length; k++) {
        if (inA[k] == "U") { u++; }
        else if (inA[k] == "I") { i++; }
        else if (inA[k] == "O") { o++; }
        else if (inA[k] == "P") { p++; }
    }

    var outS = "";
    for (k = 0; k < u; k++) { outS += "U"; }
    for (k = 0; k < i; k++) { outS += "I"; }
    for (k = 0; k < o; k++) { outS += "O"; }
    for (k = 0; k < p; k++) { outS += "P"; }

    for (k = 0; k < spellMap.length; k++) {
        if (outS == spellMap[k].toString()) return k;
    }
}

function fillRect(color, x, y, width, height) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}
