//'use strict';
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var server;
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
mockgoose(mongoose);

describe('user router testing', function() {
  var id;
  before(function(done) {
    mongoose.connect(null, function(err) {
      if(err) return done(err);
      server = require('../server')();
      server.listen(3000);
      done();
    });
  });

  it('should create a user', function(done) {
    chai.request(server)
    .post('/api/users/')
    .send({ "username": "test", "website": "test" })
    .end(function(err, res) {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('_id');
      expect(res.body.username).to.equal('test');
      id = res.body._id;
      done();
    });
  });

  it('should return a user', function(done) {
    chai.request(server)
    .get('/api/users/' + id)
    .end(function(err, res) {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('username', 'test');
      done();
    });
  });

  it('should update a user with new info', function(done) {
    chai.request(server)
    .put('/api/users/test')
    .send({ "username": "test2", "website": "website2" })
    .end(function(err, res) {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res.body.username).to.be.equal('test2');
      done();
    });
  });

  it('should fail to update user with existing info', function(done) {
    chai.request(server)
    .put('/api/users/test2')
    .send({ "username": "test2", "website": "website2" })
    .end(function(err, res) {
      expect(err).to.equal(null);
      expect(err).to.not.equal(200);
      expect(res.body).to.have.property('error', 'Not new info.');
      done();
    });
  });

  var gamename;
  it('should create a new game', function(done) {
    chai.request(server)
    .post('/api/games')
    .send({ "name": "testgame", "website": "website2", "user": "test2" })
    .end(function(err, res) {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('name', 'testgame');
      gamename = res.body.name;
      done();
    });
  });

  var playerId;
  it('should create a player', function(done) {
    chai.request(server)
    .post('/api/players/')
    .send({ "name": "test", "username": "testplayer", "password": "1234", "email": "test" })
    .end(function(err, res) {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('_id');
      expect(res.body.username).to.equal('testplayer');
      playerUsername = res.body.username;
      playerId = res.body._id;
      done();
    });
  });

  it('should return the player', function(done) {
    chai.request(server)
    .get('/api/players/' + playerUsername)
    .end(function(err, res) {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('username');
      done();
    });
  });

  it('should update player info', function(done) {
    chai.request(server)
    .put('/api/players/' + playerUsername)
    .send({ "name": "test2", "username": "testplayer2" })
    .end(function(err, res) {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res.body.username).to.equal('testplayer2');
      done();
    });
  });

// //add some games first to test this block
//   it('should return games played by the player', function(done) {
//     chai.request(server)
//     .get('/api/players/' + playerId + '/games')
//     .end(function(err, res) {
//       expect(err).to.equal(null);
//       expect(res).to.have.status(200);
//       console.log(res.body);
//       // expect(res.body).to.have.property('game');
//       done();
//     });
//   });

  it('should return an existing game', function(done) {
    chai.request(server)
    .get('/api/games/' + gamename)
    .end(function(err, res) {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('user', id);
      done();
    });
  });

//name does not update but website does, make sure it is bc of 'index: unique'
  it('should update an existing game', function(done) {
    chai.request(server)
    .put('/api/games/' + gamename)
    .send({ "website": "website" })
    .end(function(err, res) {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res.body.website).to.equal('website');
      gamename = res.body.name;
      done();
    });
  });

  it('should create a score', function(done) {
    chai.request(server)
    .post('/api/games/' + gamename + '/players/' + playerUsername + '/score')
    .send({ "game": "testgame", "player": "testplayer", "score": 100 })
    .end(function(err, res) {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('game');
      expect(res.body.score).to.equal(100);
      done();
    });
  });

  it('should fail creating a score with a nonexisting player', function(done) {
    chai.request(server)
    .post('/api/games/' + gamename + '/players/' + playerUsername + '/score')
    .send({ "game": "testgame", "player": "player100", "score": 1000 })
    .end(function(err, res) {
      expect(err).to.equal(null);
      expect(res).to.not.have.status(200);
      console.log(res.body.error);
      expect(res.body).to.have.property('error', 'Player not found.');
      done();
    });
  });

  it('should fail creating a score with a nonexisting game');

  it('should update an existing score', function(done) {
    chai.request(server)
    .put('/api/games/' + gamename + '/players/' + playerUsername + '/score')
    .send({ "game": "testgame", "player": "testplayer", "score": 200 })
    .end(function(err, res) {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res.body.score).to.equal(200);
      done();
    });
  });

  it('should return the score of a player for a specific game', function(done) {
    chai.request(server)
    .get('/api/games/' + gamename + '/players/' + playerUsername + '/score')
    .end(function(err, res) {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('game');
      expect(res.body.score).to.equal(200);
      done();
    });
  });

  it('should return games played by a specific player', function(done) {
    chai.request(server)
    .get('/api/players/' + playerUsername + '/games')
    .end(function(err, res) {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('game');
      expect(res.body).to.have.property('player');
      done();
    });
  });

  it('should return top ten scores for a specified game');

  it('should delete an existing game', function(done) {
    chai.request(server)
    .delete('/api/games/' + gamename)
    .end(function(err, res) {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message', 'Game deleted.');
      done();
    });
  });

  it('should fail deleting a nonexisting game', function(done) {
    chai.request(server)
    .delete('/api/games/' + gamename)
    .end(function(err, res) {
      expect(err).to.equal(null);
      expect(res).to.not.have.status(200);
      //double check when it is 'message' vs 'error'? It is not consistent atm.
      expect(res.body).to.have.property('error', 'Game not found.');
      done();
    });
  });

  it('should delete an existing player', function(done) {
    chai.request(server)
    .delete('/api/players/' + playerUsername)
    .end(function(err, res) {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message', 'Player deleted.');
      done();
    });
  });

  it('should fail deleting a nonexisting player', function(done) {
    chai.request(server)
    .delete('/api/players/' + playerUsername)
    .end(function(err, res) {
      expect(err).to.equal(null);
      expect(res).to.not.have.status(200);
      expect(res.body).to.have.property('error', 'Player not found.');
      done();
    });
  });

  it('should fail returning a nonexisting player', function(done) {
    chai.request(server)
    .get('/api/players/' + playerUsername)
    .end(function(err, res) {
      expect(err).to.equal(null);
      expect(res).to.not.have.status(200);
      expect(res.body).to.have.property('error', 'Player not found.');
      done();
    });
  });

  it('should delete a user', function(done) {
    chai.request(server)
    .delete('/api/users/' + id)
    .end(function(err, res) {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message', 'User deleted.');
      done();
    });
  });

  it('should fail deleting a nonexistent user', function(done) {
    chai.request(server)
    .delete('/api/users/test1')
    .end(function(err, res) {
      expect(err).to.equal(null);
      expect(res).to.not.have.status(200);
      expect(res.body).to.have.property('error', 'User not found.');
      done();
    });
  });

  it('should fail returning a nonexisting user', function(done) {
    chai.request(server)
    .get('/api/users/test1')
    .end(function(err, res) {
      expect(err).to.equal(null);
      expect(err).to.not.equal(200);
      expect(res.body).to.have.property('error', 'User not found.');
      done();
    });
  });

  after(function(done) {
    mongoose.unmock(done);
  });

});
