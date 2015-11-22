# scoreService
A simple RESTful API to keep game scores that utilizes Node, Express, and MongoDB.

All routes start with:  
`/api`

Routes:  
`/users`  
POST: creates a new user  
`/users/:userId`  
GET: returns specified user  
DELETE: deletes specified user  
PUT: updates existing user  

`/games`  
POST: creates new game  
`/games/:gameId`  
GET: returns specified game  
DELETE: deletes specified game  
PUT: updates existing game  

<!-- next one needs fixing -->  
`/games/:game/scores`  
GET: returns top ten scores for specified game  

<!-- Isn't this POST '/scores' route?  -->
POST: creates a score for specified game for particular player  

`/games/:game/players/:player/score`  
GET: returns a player's score for a specific game  
<!-- add this -->
POST: creates or updates a score

<!-- remove this  -->
`/scores`  
POST: creates or updates a score
<!-- is this GET necessary? -->
GET: returns an array of score objects/all scores for all games

`/players`  
POST: creates a player  
`/players/:player`  
GET: returns specified player  
DELETE: deletes specified player  
PUT: updates specified player's info  
`/players/:player/games`  
GET: returns games that are played by specified player  
