const Room = require('colyseus').Room

class Game extends Room {
  onInit() {
    this.setPatchRate(1000 / 20);
    this.maxClients = 2;

    this.setState({
        players: 'testings'
    });
  }

  requestJoin (options) {
    return 1 - (this.clients.length / 10);
  }

  onJoin (client) {
    console.log(client.id, "joined!");
  }

  onMessage (client, data) {
    console.log(client.id, "sent a message");
  }

  onLeave (client) {
    console.log(client.id, "left ChatRoom");
  }
}

module.exports = Game