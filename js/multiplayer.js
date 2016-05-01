function Multiplayer(ip) {
    var ref = new Firebase("https://sweltering-fire-9048.firebaseio.com/");
    var playerRef = ref.child("players")
    var spellRef = ref.child("spells")
    this.id;
    this.item;
    this.start = function(client) {
        obj = {
            x: client.x,
            y: client.y,
        }
        this.item = playerRef.push()
        this.item.set(obj);
        this.id = this.item.key()
        this.item.onDisconnect().remove()
    }
    this.update = function(client) {
        if (obj.x != client.x || obj.y != client.y) {
            obj = {
                x: client.x,
                y: client.y,
                dx: client.dx,
                dy: client.dy
            }
            this.item.set(obj);
        }
        if (player.dead) {
            this.item.remove()
        }
    }
    this.spell = function(x, y, dx, dy, spellID, rotation) {
        obj = {
            x: x,
            y: y,
            dx: dx,
            dy: dy,
            spellID: spellID,
            rotation: rotation
        }
        spellRef.push(obj)
    }
    this.spellRemove = function(id) {
        spellRef.child(id).remove()
    }
    spellRef.on("child_added", function(snapshot) {
        Spells.push(new Spell(snapshot.val().x, snapshot.val().y, snapshot.val().dx, snapshot.val().dy, snapshot.val().spellID, snapshot.val().rotation, snapshot.key()));
    });
    spellRef.on('child_removed', function(snapshot) {
        for (var i = Spells.length - 1; i >= 0; i--) {
            if (Spells[i].id == snapshot.key()) {
                Spells[i].kill(i)

            }
        }
    });
    playerRef.once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            if (childSnapshot.key() != this.id) {
                Players.push(new playermulti(childSnapshot.val().x, childSnapshot.val().y, snapshot.val().dx, snapshot.val().dy, childSnapshot.key()))
            }
        });
    });
    playerRef.on("child_added", function(snapshot) {
        if (snapshot.key() != this.id) {
            Players.push(new playermulti(snapshot.val().x, snapshot.val().y, snapshot.val().dx, snapshot.val().dy, snapshot.key()))
        }
    });
    playerRef.on("child_changed", function(snapshot) {
        for (var i = Players.length - 1; i >= 0; i--) {
            if (snapshot.key() != this.id) {
                if (Players[i].id == snapshot.key()) {
                    Players[i].x = snapshot.val().x;
                    Players[i].y = snapshot.val().y;
                    Players[i].dx = snapshot.val().dx;
                    Players[i].dy = snapshot.val().dy;
                }
            }
        }
    });
    playerRef.on('child_removed', function(snapshot) {
        for (var i = Players.length - 1; i >= 0; i--) {
            if (snapshot.key() != this.id) {
                if (Players[i].id == snapshot.key()) {
                    Players[i].death()
                }
            }
        }
    });
}
