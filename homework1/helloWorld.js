/*  Homework 1, for CS336, Fall 2016,
*   Author: Cotter Koopman, cjk45
*/
var express = require('express');
var app = express();

//Person class, acts as value referenced by dictionary key
function Person (firstName, lastName, startDate) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.startDate = startDate;
}

/*Initialize a dictionary of 2 people
* Key: ID     Value: Person object
*/
var people = {
  "cjk45": new Person("Cotter", "Koopman", "08/12/1996"),
  "mjd85": new Person("Mark", "Davis", "02/21/1986")
}

//Function for localhost:3000/people
//Returns JSON-formatted version of people dictionary
app.get('/people', function (req, res) {
  res.json(people);
});

/*  Function for variable path based on person id
*   If the ID exists in the dictionary, return JSON-formatted Person object
*   Otherwise, 404 Not Found
*/
app.get('/person/:id', function (req, res) {
    if (req.params.id in people) {
      res.json(people[req.params.id]);
    } else {
      res.sendStatus(404);
    }
});

/*  Function for variable path based on person id/name
*   If the ID exists in the dictionary, return JSON-formatted first and last names
*   Otherwise, 404 Not Found
*/
app.get('/person/:id/name', function (req, res) {
    if (req.params.id in people) {
      res.json({"First Name": people[req.params.id].firstName,
                "Last Name" : people[req.params.id].lastName});
    } else {
      res.sendStatus(404);
    }
});

/*  Function for variable path based on person id/years
*   If the ID exists in the dictionary, return JSON-formatted number of years,
*   computed using getTime function
*   Otherwise, 404 Not Found
*/
app.get('/person/:id/years', function (req, res) {
    if (req.params.id in people) {
      res.json({ "Years here" : getTime(people[req.params.id].startDate)});
    } else {
      res.sendStatus(404);
    }
});

//Based off getAge by Naveen Jose, in lab 2
function getTime(dateString) {
    var today = new Date();
    var startDate = new Date(dateString);
    var years = today.getFullYear() - startDate.getFullYear();
    var m = today.getMonth() - startDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < startDate.getDate())) {
        years--;
    }
    return years;
}

//Log to console when listener set
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
