const library = document.getElementById("library");

const booksArray = [];

function Book(title, author, pages, genre, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
    this.status = status;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, genre, status) {
    const newBook = new Book(title, author, pages, genre, status);
    booksArray.push(newBook);
}
