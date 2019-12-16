var app = require('express')();
var http = require('http').Server(app);
var books = require('./json/lib.json');
 
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('../pages/main.ejs', {
    books : books.book});
});
 
app.get('/user', function(req, res){
    res.render('../pages/user.ejs', {
    books : books});
});

http.listen(3000, function(){
    console.log('HTTP server started on port 3000');
});

//app.locals.books = require('./json/lib.json');

console.log(books);