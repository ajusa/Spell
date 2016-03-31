function Multiplayer(ip) {
    var ref = new Firebase("https://sweltering-fire-9048.firebaseio.com/");
    this.id;
    this.item;
    this.start = function(client) {

        obj = {
            x: client.x,
            y: client.y,
        }
        this.item = ref.push()
        this.item.set(obj);
        this.id = this.item.key()
        this.item.onDisconnect().remove()
    }
    this.update = function(client) {
        if (obj.x != client.x || obj.y != client.y) {
            obj = {
                x: client.x,
                y: client.y,
            }
            this.item.set(obj);
        }
    }
    ref.once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            if (childSnapshot.key() != this.id) {
                Players.push(new playermulti(childSnapshot.val().x, childSnapshot.val().y, childSnapshot.key()))
            }
        });
    });
    ref.on("child_added", function(snapshot) {
        if (snapshot.key() != this.id) {
            Players.push(new playermulti(snapshot.val().x, snapshot.val().y, snapshot.key()))
        }
    });
    ref.on("child_changed", function(snapshot) {
        for (var i = Players.length - 1; i >= 0; i--) {
            if (snapshot.key() != this.id) {
                if (Players[i].id == snapshot.key()) {
                    Players[i].x = snapshot.val().x;
                    Players[i].y = snapshot.val().y;
                }
            }
        }
    });
}
