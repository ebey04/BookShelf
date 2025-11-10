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

function libraryShow() {
    const libraryContainer = document.getElementById("library");
    libraryContainer.innerHTML = "";

    for (let book of booksArray) {
    const title = document.createElement("h3");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.innerHTML = `<span class="bold">Author:</span> ${book.author}`;

    const pages = document.createElement("p");
    pages.innerHTML = `<span class="bold">Page Count:</span> ${book.pages}`;

    const genre = document.createElement("p");
    genre.innerHTML = `<span class="bold">Genre:</span> ${book.genre}`;


    const status = document.createElement("p");
    const readableStatus = book.status === "read" ? "Read" : "To Be Read";
    status.innerHTML = `<span class="bold">Status:</span> ${readableStatus}`;

    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.dataset.id = book.id;

    
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Toggle Status";
    toggleBtn.classList.add("btn");
    toggleBtn.addEventListener("click", (event) => {
        const idToToggle = event.target.parentElement.dataset.id;
        const book = booksArray.find((b) => b.id === idToToggle);
        if (book) {
            book.status = book.status === "read" ? "tbr" : "read";
            libraryShow(); 
        }
    });

    
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("btn")
    removeBtn.addEventListener("click", (event) => {
        const idToRemove = event.target.parentElement.dataset.id;
        const index = booksArray.findIndex((b) => b.id === idToRemove);
        if (index !== -1) {
            booksArray.splice(index, 1);
            libraryShow();
        }
    });

    
    bookCard.append(title, author, pages, genre, status, toggleBtn, removeBtn);
    libraryContainer.appendChild(bookCard);
    }
}


libraryShow();

const bookBTN = document.getElementById("bookBTN");
const form = document.getElementById("form");


bookBTN.addEventListener("click", () => {
    form.classList.contains("show")
    ? form.classList.remove("show")
    : form.classList.add("show");
    
})

form.addEventListener("submit", (event) => {
    event.preventDefault(); 

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const genre = document.getElementById("genre").value;
    const status = document.querySelector('input[name="status"]:checked')?.value || "unknown";

    addBookToLibrary(title, author, pages, genre, status);

    libraryShow();

    form.reset();
    form.classList.remove("show");
});
