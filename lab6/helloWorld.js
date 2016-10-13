/*  Lab06, for CS336, Fall 2016,
*   Author: Cotter Koopman, cjk45
*/

/*ANSWERS TO 6.1
  a.  GET can be easily seen using Chrome. curl --head localhost:3000/request tests HEAD, but I can't see res.send send "Hello head", because HEAD only sends the head and not the body of the res.send message. curl -X <METHOD> localhost:3000/request/  -d '{"arg" : "value"}' allows me to test the PUT, POST, and DELETE methods, and they send the corresponding strings to the console. They can't be seen on the browser because they are communicating with the server instead. They can be called and send a response using res.send, but DELETE, POST, and PUT can't actually perform their functions yet, like DELETE actually deleting something from the server.

  b.  The most accurate response code is probably 404 Not Found, since the URL entered doesn't have a defined route. However, in this lab we're overriding that. (I used 403 Forbidden)

  ANSWERS TO 6.2
  a.  Forms support the GET and POST methods
  b.  The form passes the text from the text fields name, email, and message as request arguments (i.e. req.body.user_name). The form knows which fields belong to which ID through the HTML div tags. These are used in the res.send function on /forms page and are concatenated and sent. Without the json bodyParser, the req values are undefined.
  */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/request', function (req, res) {
  res.send('Hello Lab 6!\n');
});

app.head('/request', function (req, res) {
  res.send("Hello head");
});

//PUT returns data, so return "value" from '{"arg" : "value"}'
app.put('/request', function (req, res) {
  res.send("PUT request tested : " + req.body.arg);
});

//POST returns data, so return "value" from '{"arg" : "value"}'
app.post('/request', function (req, res) {
  res.send('POST request tested : ' + req.body.arg);
});

//DELETE returns data, so return "value" from '{"arg" : "value"}'
app.delete('/request', function (req, res) {
  res.send("DELETE request tested " + req.body.arg);
});

//EXERCISE 6.2
app.post('/forms', function(req, res) {
    res.send('Submitted form info<br>User name: <code>' + req.body.user_name
    + '</code><br>User email: <code>' + req.body.user_mail
    + '</code><br>Posted message: <code>'+ req.body.user_message + '</code>');
});

app.all('*', function (req, res) {
  res.sendStatus(403);
});

//Log to console when listener set
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
