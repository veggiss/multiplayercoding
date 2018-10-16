const port = process.env.PORT || 3030;
const path = require('path');
const express = require('express');
const http = require('http');
const colyseus = require("colyseus");
const game = require("./server/game");
const app = express();
const gameServer = new colyseus.Server({
	server: http.createServer(app)
});

gameServer.register("game", game);
gameServer.listen(port);

app.use(express.static('./build'));

console.log('Server started');

//app.listen(port, () => console.log(`Listening on port ${port}`));
