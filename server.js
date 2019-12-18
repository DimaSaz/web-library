const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();
var MongoClient      = require('mongodb').MongoClient;
var http             = require('http').Server(app);
var database_;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('../views/pages/main.ejs', {
      books : database_.collection('books').find()
    }
    );
    console.log(database_.collection('books').find());
});
 
app.get('/user', function(req, res){
    res.render('../views/pages/user.ejs');
});

app.get('/addBook', function(req, res){
  res.render('../views/pages/addBook.ejs');
});

app.post('/addBook', (req, res) => {
  console.log(req.body.id);
  
  var book = { id: req.body.id, name: req.body.name, count: req.body.count};

  database_.collection('books').insertOne(book, (err, result) => {
    if (err) { 
      res.send({ 'error': 'An error has occurred' }); 
    } else {
      res.redirect('/');
    }
  });
});

MongoClient.connect('mongodb://localhost:27017/', {useNewUrlParser: true}, function(err, database){
    if(err){
         return console.log(err);
    }

    database_ = database.db('database');
    //if(database_.collection('books'))
    //    database_.collection('books').drop();

    app.listen(3000, function() {
        console.log(`Работаем: http://localhost:3000`);
    });
});
