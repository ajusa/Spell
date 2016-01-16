function Multiplayer(ip){
	var socket = io('http://localhost:3000');
	socket.on('getId', function(id){
		player.id = id;
	});
	this.start = function(client){
		obj = {
			x: client.x,
			y: client.y,
			id: client.id
		}
		socket.emit('newPlayer', obj);
	}
	
}