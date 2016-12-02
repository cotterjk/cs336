/* Server code for CS336 Final Project
 * Adapted from React Tutorial provided by Facebook. Legal stuff at the bottom of the page
 *
 * Created and adapted by jbu2 and cjk45 for CS336, Fall 2016
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var COORDINATES_FILE = path.join(__dirname, 'coordinates.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/cooridnates', function(req, res) {
    fs.readFile(COORDINATES_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(JSON.parse(data));
    });
});

app.post('/api/coordinates', function(req, res) {
    fs.readFile(COORDINATES_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var coordinates = JSON.parse(data); //remove this when mongo integrated
        var newCoordinate = {
            x: 10,
            y: 50
        };
        coordinate.push(newCoordinate);
        fs.writeFile(COORDINATES_FILE, JSON.stringify(coordinates, null, 4), function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json(coordinates);
        });
    });
});


app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
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