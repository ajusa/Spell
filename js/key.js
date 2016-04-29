var spellCode = [0, 0, 0, 0];
var spellID = -1;
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
    "keys": "z",
    "on_keydown": function() { updateSpellString(1); },
});
listener.register_combo({
    "keys": "x",
    "on_keydown": function() { updateSpellString(2); },
});
listener.register_combo({
    "keys": "c",
    "on_keydown": function() { updateSpellString(3); },
});
listener.register_combo({
    "keys": "v",
    "on_keydown": function() { updateSpellString(4); },
});
listener.register_combo({
    "keys": "1",
    "on_keydown": function() {
        player.maxHealth = Math.ceil(player.maxHealth * 1.10);
        player.skillpoints--;
    },
});
listener.register_combo({
    "keys": "2",
    "on_keydown": function() {
        player.maxMana = Math.ceil(player.maxMana * 1.15);
        player.skillpoints--;
    },
});
listener.register_combo({
    "keys": "3",
    "on_keydown": function() {
        player.expRate = player.expRate * 1.25;
        player.skillpoints--;
    },
});
