# scoreService
A RESTful web service API to keep game scores that utilizes Node, Express, and MongoDB.

All routes start with:  
`/api`

ROUTES

`/users`  
POST: creates a new user  
`/users/:userId`  
GET: returns user  
DELETE: deletes user  
PUT: updates existing user  

`/games`  
POST: creates new game  
`/games/:gameId`  
GET: returns game  
DELETE: deletes game  
PUT: updates existing game  

<!-- next one needs fixing -->  
`/games/:game/scores`  
GET: returns top ten scores for specified game  

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
