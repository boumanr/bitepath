var express = require('express');
var venue = require('./routes/venue');
var dish = require('./routes/dish');
var app = express();
 
app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.methodOverride());
    app.use(app.router);
});
 
/*venue*/
app.get('/venue', venue.findAll);
app.get('/venue/:id', venue.findById);
app.post('/venue', venue.addVenue);
app.put('/venue/:id', venue.updateVenue);
app.get('/venue/delete/:id', venue.deleteVenue);

/*dish*/
app.get('/dish', dish.findAll);
app.get('/dish/:id', dish.findById);
app.post('/dish', dish.addDish);
app.put('/dish/:id', dish.updateDish);
app.get('/dish/delete/:id', dish.deleteDish);

/*views*/
app.get('/index.html', function (req, res){ res.render('index.ejs'); });

app.listen(process.env.PORT);