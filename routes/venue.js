var mongo = require('mongodb');
var Server = mongo.Server, Db = mongo.Db, BSON = mongo.BSONPure;
var host = 'mongodb://@ds049858.mongolab.com:49858/heroku_app18705300';

//var db = new Db('bitepathdb', new Server('localhost', 27017), {w:1}) //localhost
var db = new Db('heroku_app18705300', new Server(host, 49858), {w:1})

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'bitepath' database");
        db.collection('venue', {strict:true}, function(err, collection) {
            if (err) {
                console.log("Creating db sample data...");
                DBSampleData();
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving venue: ' + id);
    db.collection('venue', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('venue', function(err, collection) {
        collection.find().toArray(function(err, items) {
            //res.send(items);
            res.contentType('json');
            res.send({json: JSON.stringify(items)});
        });
    });
};

exports.addVenue = function(req, res) {
    var venue = req.body;
    console.log('Adding venue: ' + JSON.stringify(venue));
    db.collection('venue', function(err, collection) {
        collection.insert(venue, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            }
            else 
            {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateVenue = function(req, res) {
    var id = req.params.id;
    var venue = req.body;
    console.log('Updating venue: ' + id);
    console.log(JSON.stringify(venue));
    db.collection('venue', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, venue, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating venue: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(venue);
            }
        });
    });
}

exports.deleteVenue = function(req, res) {
    var id = req.params.id;
    console.log('Deleting venue: ' + id);
    db.collection('venue', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var DBSampleData = function() {

    var venue = [
    {
        name: "Venue name",
        description: "Venue name", 
        street: "Venue name", 
        zip: "Venue name",
        city: "Venue name",
        country: "Venue name",
        latitude: "Venue name",
        longitude: "Venue name"
    }];

    db.collection('venue', function(err, collection) {
        collection.insert(venue, {safe:true}, function(err, result) {});
    });

};