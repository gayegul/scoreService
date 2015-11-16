# scoreService
A simple RESTful API to keep game scores that utilizes Node, Express, and MongoDB.

`/api/users`  
POST: website and game info on request body creates a new user  
`/api/users/:id`  
GET: shows the specified user  
DELETE: deletes the specified user  
PUT: new website or game info updates existing user

`/api/games`  
POST: name, website and userId info on request body creates a new game  
`/api/games/:id`  
GET: shows the specified game  
DELETE: deletes the specified game  
PUT: new name info on request body updates existing game

`/api/games/:game/scores`  
GET: returns the top ten scores for this game  
`/api/games/:game/scores/:player`  
GET: returns the top ten scores for this particular player  
POST: posts a score for that game for this player
<!-- : req.params.game and req.params.player parameters, rest is literal words -->

`/api/players`  
POST: creates a player  
`/api/players/:player`  
GET: return the player  
DELETE: deletes the player  
PUT: updates the player info  
`/api/players/:player/games`  
GET: shows games that are played by player  `/api/players/:player/scores/:game`  
GET: shows a player's score for a specific game
