function findBooks(name) {
  name = name.toLowerCase();
  var books = Array.from(document.getElementById('album').children);
  if (name != '') {
    var res = books.filter(book =>
      !book.getAttribute('name').toLowerCase().match(name) ||
      !book.getAttribute('id').toLowerCase().match(name)
    );
    res.map(book => {
      var card = document.getElementById(book.getAttribute('id'));
      card.setAttribute("hidden", "true");
    });
    res = books.filter(book =>
      book.getAttribute('name').toLowerCase().match(name) ||
      book.getAttribute('id').toLowerCase().match(name)
    );
    res.map(book => {
      var card = document.getElementById(book.getAttribute('id'));
      card.removeAttribute("hidden");
    });
  } else {
    books.map(card => card.removeAttribute("hidden"));
  }
}
