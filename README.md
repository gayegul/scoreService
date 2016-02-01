# scoreService
A RESTful web service API to keep game scores that utilizes Node, Express, and MongoDB.

ROUTES  
All routes start with: `/api`

`/users`  
POST: creates a new user  

`/users/:user`  
GET: returns user  
DELETE: deletes user  
PUT: updates existing user  

`/games`  
POST: creates new game  

`/games/:game`  
GET: returns game  
DELETE: deletes game  
PUT: updates existing game  

`/games/:game/scores`  
GET: returns top ten scores for specified game  

`/games/:game/players/:player/score`  
GET: returns a player's score for a specific game  
POST: creates a score  
PUT: updates a score  

`/players`  
POST: creates a player  

`/players/:player`  
GET: returns specified player  
DELETE: deletes specified player  
PUT: updates specified player's info  

`/players/:player/games`  
GET: returns games that are played by specified player  

<!-- Todo
change unique columns instead of _ids where fit
fix scoring type, adjust when low or high is desired
add auth
connect it with a game to make it full-stack
 -->
