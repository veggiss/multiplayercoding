const Room = require('colyseus').Room
const util = require('./util');
const vm = require('vm');
const Mocha = require('mocha');
let mocha = new Mocha({ui:'bdd'});

const questions = [{
  text: 'Write a function called add that returns the addition of two parameters.',
  answer: `it('correctly calculates the sum of 1 and 3', () => {
            assert.equal(add(1, 3), 4);
          });

          it('correctly calculates the sum of 1000 and 5', () => {
            assert.equal(add(1000, 5), 1005);
          });`,
  startCode: `function add(a, b) {
  }`
}, {
  text: 'What operating system was founded by Linus Torvalds? Pass it as a string variable called torvalds',
  answer:  `it('correctly outputs a string', () => {
            assert.equal(torvalds, 'linux');
          });`,
  startCode: ``
}, {
  text: 'Create a function called oddCount, given a number n, return the number of positive odd numbers below n.',
  answer:  `it('correctly filters list', () => {
            assert.deepEqual(oddCount(7), [1, 3, 5]);
          });

          it('correctly filters list', () => {
            assert.equal(oddCount(15), [1, 3, 5, 7, 9, 11, 13]);
          });`,
  startCode: `function oddCount(n) {
    return n;
  }`
}];

class Game extends Room {
  onInit() {
    this.setPatchRate(1000 / 20);
    this.maxClients = 2;

    this.setState({
        started: false,
        players: {}
    });

    this.leaderboard = 0;
  }

  onJoin (client) {
    this.state.players[client.id] = {
      progress: 0,
      index: 0
    };

    if (this.clients.length == 2) {
      this.startGame();
      this.lock();
    }
  }

  onMessage (client, data) {
    if (this.state.started) {
      if (data.checkAnswer) this.checkAnswer(client, data);

      if (data.getQuestion) {
        let i = this.state.players[client.id].index;
        this.send(client, {question: questions[i].text});
      }
    }
  }

  pseudoFile(mocha, context, fileContent) {
    mocha.suite.emit("pre-require", context, ":memory:", mocha)
    mocha.suite.emit("require", vm.runInNewContext(fileContent, context, {displayErrors: false}), ":memory:", mocha)
    mocha.suite.emit("post-require", context, ":memory:", mocha)
  }

  updateAnswer(client, data) {
    if (this.state.players[client.id].index < questions.length - 1) {
      this.state.players[client.id].index++;
      this.state.players[client.id].progress = (this.state.players[client.id].index / questions.length) * 100;
      this.send(client, {answer: true});
      this.nextQuestion(client);
    } else if (questions.length >= this.state.players[client.id].index) {
      if (this.state.players[client.id].progress < 100) {
        this.state.players[client.id].progress = 100;
        this.leaderboard++;

        let str = '';
        if (this.leaderboard == 1) str = 'Good work! You won!'
        else str = 'Good work! You placed second!';
        this.send(client, {question: str});
      }
    } else {
      this.send(client, {answer: false});
    }
  }

  checkAnswer(client, data) {
    let self = this;
    try {
      mocha = new Mocha({ui:"bdd", reporter: 'json', enableTimeouts: true, timeout: 10});
      this.pseudoFile(mocha, {assert:require("assert")}, `${data.checkAnswer} ${questions[this.state.players[client.id].index].answer}`);
      mocha.run()
        .on('end', function(e) {
          if (this.testResults.stats.failures == 0) {
            self.updateAnswer(client, data);
          }
        });
    } catch (err) {
      this.send(client, {answer: false});
    }
  }

  nextQuestion(client) {
    let self = this;
    setTimeout((function() {
      let obj = questions[self.state.players[client.id].index];
      self.send(client, {question: obj.text, startCode: obj.startCode});
    }), 3000)
  }

  onLeave (client) {
    console.log(client.id, "left ChatRoom");
  }

  startGame() {
    this.state.started = true;

    this.clients.forEach(client => {
      let i = this.state.players[client.id].index;
      this.send(client, {question: questions[i].text, startCode: questions[i].startCode});
    });
  }
}

module.exports = Game