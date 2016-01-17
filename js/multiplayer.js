function Multiplayer(ip) {
    var socket = io('http://localhost:3000');
    socket.on('getId', function(id) {
        this.id = id;
        player.id = id;
    });
    socket.on('dump', function(obj) {
        for (var i = obj.length - 1; i >= 0; i--) {
        	Players.set(obj[i].id, new playermulti(obj[i].x, obj[i].y, obj[i].id))
        };
	

    });
    socket.on('newPlayer', function(obj) {
        Players.set(obj.id, new playermulti(obj.x, obj.y, obj.id))
    });
    socket.on('death', function(id) {
    	Players.get(obj.id)
        Players.delete(id);

    });
    socket.on('update', function(obj) {
        Players.get(obj.id).x = obj.x;
        Players.get(obj.id).y = obj.y;
    })
    this.start = function(client) {
        obj = {
            x: client.x,
            y: client.y,
        }
        console.log(obj);
        socket.emit('newPlayer', obj);
    }
    this.update = function(client) {
        obj = {
            x: client.x,
            y: client.y,
        }
        socket.emit('update', obj);
    }

}
