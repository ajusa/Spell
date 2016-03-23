function Multiplayer(ip) {
    var test = gun.get('player')
    Gun.time.now = function() {
        return new Date().getTime()
    }
    this.start = function(client) {
        obj = {
            x: client.x,
            y: client.y,
        }
        test.put(obj);
    }
    this.update = function(client) {
        if (obj.x != client.x) {
            obj = {
                x: client.x,
                y: client.y,
            }
            test.put(obj);
        }



    }
}