var spellString = "";
var lastSpellKey = 0;
var spellID = 0;
var keyUp = [];
var map = [];
var lastSkillKey = 0;
var listener = new window.keypress.Listener(); //for keys
listener.register_combo({
    "keys": "a",
    "on_keydown": function() { player.moveLeft() },
    "on_keyup": function() { player.dx = 0 },
});
listener.register_combo({
    "keys": "s",
    "on_keydown": function() { player.moveDown() },
    "on_keyup": function() { player.dy = 0 },
});
listener.register_combo({
    "keys": "d",
    "on_keydown": function() { player.moveRight() },
    "on_keyup": function() { player.dx = 0 },
});
listener.register_combo({
    "keys": "w",
    "on_keydown": function() { player.moveUp() },
    "on_keyup": function() { player.dy = 0 },
});
listener.register_combo({
    "keys": "space",
    "on_keydown": function() { console.log("Shoot")},
});
onkeydown = onkeyup = function(e) {
    e = e || event; //IE
    map[e.keyCode] = e.type == 'keydown';
    keyUp[e.keyCode] = e.type == 'keyup';
    if (screens[0]) {
        if (map[13]) {
            screens[0] = false;
            screens[1] = true;
        }
    }

    if (screens[1]) {
        if (spellString.length >= 6) {
            spellID = getSpell(spellString);
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

            if (map[85] && (lastSpellKey != 1)) {
                spellString += "U ";
                lastSpellKey = 1;
                player.changeBias(1);
            } else if (map[73] && (lastSpellKey != 2)) {
                spellString += "I ";
                lastSpellKey = 2;
                player.changeBias(2);
            } else if (map[79] && (lastSpellKey != 3)) {
                spellString += "O ";
                lastSpellKey = 3;
                player.changeBias(3);
            } else if (map[80] && (lastSpellKey != 4)) {
                spellString += "P ";
                lastSpellKey = 4;
                player.changeBias(4);
            }
        }

        if (map[16]) {
            spellString = "";
            lastSpellKey = 0;
            for (i in icons) { icons[i].texture = PIXI.Texture.EMPTY; }
        }

        if (keyUp[49] && (lastSkillKey = 1)) { lastSkillKey = 0; } else if (keyUp[50] && (lastSkillKey = 2)) { lastSkillKey = 0; } else if (keyUp[51] && (lastSkillKey = 3)) { lastSkillKey = 0; }
        if (player.skillpoints > 0) {
            if (map[49] && (lastSkillKey != 1)) {
                player.maxHealth = Math.ceil(player.maxHealth * 1.10);
                lastSkillKey = 1;
                player.skillpoints--;
            } else if (map[50] && (lastSkillKey != 2)) {
                player.maxMana = Math.ceil(player.maxMana * 1.15);
                lastSkillKey = 2;
                player.skillpoints--;
            } else if (map[51] && (lastSkillKey != 3)) {
                player.expRate = player.expRate * 1.25;
                lastSkillKey = 3;
                player.skillpoints--;
            }
        }
    }
}
