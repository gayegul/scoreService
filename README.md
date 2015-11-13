# scoreService
A simple RESTful API to keep game scores that utilizes Node, Express, and MongoDB.

`\api\users`
GET: shows all game creators aka users
POST: website and game info on request body creates a new user
`\api\users\:id`
GET: shows the specified user
DELETE: deletes the specified user
PUT: new website or game info updates existing user

`\api\games`
GET: shows all games
POST: name, website and user id info on request body creates a new game
`\api\games\:id`
GET: shows the specified game
DELETE: deletes the specified game
PUT: new name info on request body updates existing game

`\api\scores\:game`
GET: shows all scores of a game
<!-- POST: game, player and user id info on request body creates a new game -->

<!-- `\api\scores\:player` -->

`/scores/:id`
GET: shows all scores of a player
