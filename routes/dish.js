var mongo = require('mongodb');
var Server = mongo.Server, Db = mongo.Db, BSON = mongo.BSONPure;
var db = new Db('bitepathdb', new Server('localhost', 27017), {w:1})

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'bitepath' database");
        db.collection('dish', {strict:true}, function(err, collection) {
            if (err) {
                console.log("Creating db sample data...");
                DBSampleData();
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving dish: ' + id);
    db.collection('dish', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('dish', function(err, collection) {
        collection.find().toArray(function(err, items) {
            //res.send(items);
            res.contentType('json');
            res.send({json: JSON.stringify(items)});
        });
    });
};

exports.addDish = function(req, res) {
    var dish = req.body;
    console.log('Adding dish: ' + JSON.stringify(dish));
    db.collection('dish', function(err, collection) {
        collection.insert(dish, {safe:true}, function(err, result) {
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

exports.updateDish = function(req, res) {
    var id = req.params.id;
    var dish = req.body;
    console.log('Updating dish: ' + id);
    console.log(JSON.stringify(dish));
    db.collection('dish', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, dish, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating dish: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(dish);
            }
        });
    });
}

exports.deleteDish = function(req, res) {
    var id = req.params.id;
    console.log('Deleting dish: ' + id);
    db.collection('dish', function(err, collection) {
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

    var dish = [
    {
        name: "Dish name",
        picture: "picture", 
        description: "description", 
        venue: "Venue name", 
        venue_id: "venue_id fkid"
    }];

    db.collection('dish', function(err, collection) {
        collection.insert(dish, {safe:true}, function(err, result) {});
    });

};