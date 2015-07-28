function isCollide(a, b) {
    return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    ); //I copied this collide code for my game, hope ya don't mind -Jackson
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
function killPlayer(id){
	for (var i = Players.length - 1; i >= 0; i--) {
		if(Players[i].id == id){
			array.splice(i, 1);
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