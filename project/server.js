/* Server code for CS336 Final Project
 * Adapted from React Tutorial provided by Facebook. Legal stuff at the bottom of the page
 *
 * Created and adapted by jbu2 and cjk45 for CS336, Fall 2016
 */

//Usual imports...
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient

var db;
var APP_PATH = path.join(__dirname, 'dist');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//Pulls all coordinates from MongoDB
app.get('/api/coordinates', function(req, res) {
    db.collection("coordinates").find({}).toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
    });
});

//Post coordinates to the database collection as a document containing an x and a y
app.post('/api/coordinates', function(req, res) {
    var newCoordinate = {
        x: req.body.x,
        y: req.body.y,
    };
    db.collection("coordinates").insertOne(newCoordinate, function(err, result) {
        if (err) throw err;
        db.collection("coordinates").find({}).toArray(function(err, docs) {
            if (err) throw err;
            res.json(docs);
        });
    });
});


// Send all routes/methods not specified above to the app root.
app.use('*', express.static(APP_PATH));

app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});

/* Variable for storing URL of database connection
* NOTE: must export MONGO_PASSWORD=b***** (the usual class password) before npm start
*/
var mongoURL = 'mongodb://cs336:' +
               process.env.MONGO_PASSWORD +
               '@ds011495.mlab.com:11495/jbu2-cs336';
MongoClient.connect(mongoURL, function(err, dbConnection) {
    if (err) throw err;
    db = dbConnection;
});

/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
