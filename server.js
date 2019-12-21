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
  if (req == null){
    database_.collection('books').find({"name" : req.body.name}).toArray((err, items) => {
      res.render('../views/pages/main.ejs', {
        books: items
      });
    });
  } else {
    database_.collection('books').find({}).toArray((err, items) => {
      res.render('../views/pages/main.ejs', {
        books: items
      });
    });
  }
});
//var myCursor = db.inventory.find();
//var myDoc = myCursor.hasNext() ? myCursor.next() : null;

app.post('/', function(req, res){
  var books = database_.collection('books');
  var user = database_.collection('user');
  if (
    books.findOne({"id" : req.body.bookId}).count >= 1
    // && 
  ) {
    
    books.findOneAndUpdate({"id" : req.body.bookId}, {$inc : {"count": -1}},(err, res) => {
      err ? console.log('err books') : console.log('book minus')
    });
    user.insertOne(books.findOne({"id" : req.body.bookId}), (err, res) => {
      err ? console.log('err user') : console.log('user plus')
    });

    var d = new Date();
    var date = new Date().setFullYear(d.getYear(), d.getMonth() + 1, d.getDate() + 20).toDateString();
    console.log(date);
    user.aggregate(user.findOne({"id" : req.body.bookId}), { $addFields: {"date" : date}})

    res.redirect('/');
  } else {
    console.log('book count less then 1 or user already had');
    res.redirect('/');
  }
})

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

MongoClient.connect('mongodb+srv://artem:h0Sw19XgFppbsf3X@test-cmnmp.mongodb.net/test?retryWrites=true&w=majority', 
                    {useNewUrlParser: true,
                    useUnifiedTopology: true}, 
                    function(err, database
){
    if(err){
         return console.log(err);
    }

    database_ = database.db('database');
    if(database_.collection('user'))
      database_.collection('user').drop();
    database_.collection('user');

    app.listen(3000, function() {
        console.log(`Работаем: http://localhost:3000`);
    });
});
