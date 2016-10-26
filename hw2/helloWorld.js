/*  Homework 1, for CS336, Fall 2016,
*   Author: Cotter Koopman, cjk45
*/

const express = require("express")
const app = express();
const http_status = require("http-status-codes");
const bodyParser = require("body-parser");
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
  "cjk45": new Person("Cotter", "Koopman", "1996-08-12"),
  "mjd85": new Person("Mark", "Davis", "1986-02-21")
}

//Function for localhost:3000/people
//Returns JSON-formatted version of peopl/peoplee dictionary
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

//Update a person by their ID, and pass new values as JSON-formatted curl data
app.put('/person/:id', function (req, res) {
  var message;
  if (req.params.id in people) {
			people[req.params.id].firstName = req.body.firstName
			people[req.params.id].lastName = req.body.lastName
			people[req.params.id].startDate = req.body.startDate
			message = "Updated " + req.params.id;
	} else {
    message = "Could not update person : not found."
  }
  res.send(message);
})

//Delete a person by their ID (tested using curl)
app.delete('/person/:id', function (req, res) {
  var message;
  if (req.params.id in people) {
			delete people[req.params.id];
      message = req.params.id + " deleted."
	} else {
    message = "Could not delete person : not found."
  }
  res.send(message);
})

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

//Based off getAge by Navereen Jose, in lab 2
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

//Function responds to submission from new person form
//Submitting form displays person's info, and adds to data structure
app.post('/newperson', function(req, res) {
    //Adds user-inputted person to People dictionary
    people[req.body.input_id] =
      new Person(req.body.input_fname, req.body.input_lname, req.body.input_date);
    //Display the person
    res.send('Submitted form info<br>ID: <code>' + req.body.input_id
    + '</code><br>First name: <code>' + req.body.input_fname
    + '</code><br>Last name: <code>' + req.body.input_lname
    + '</code><br>Here since: <code>'+ req.body.input_date + '</code>');
});

//Displays a person object, searched by their ID, passed from the form at search/index.html through $ajax()
app.post("/search", function(req, res) {
    var resultinfo;
    if (req.body.name in people) {
        resultinfo = "Person id: " + req.body.name +
        "<br> First name: " + people[req.body.name].firstName +
        "<br> Last name: " + people[req.body.name].lastName +
        "<br> Here since: " + people[req.body.name].startDate;
    } else {
        resultinfo = "Person ID does not exist, sorry";
    }
    res.send({"content" : resultinfo});
});

//Log to console when listener set
app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});
