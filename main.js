const booksArray = [
    {
    title: "Pride & Prejudice",
    author: "Jane Austen",
    pages: 430,
    genre: "Fiction",
    status: "Read",
    }
];

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
  libraryContainer.innerHTML = ""; // clear existing content

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
    status.innerHTML = `<span class="bold">Status:</span> ${book.status}`;

    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.dataset.id = book.id; 

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", (event) => {
        const idToRemove = event.target.parentElement.dataset.id;
        console.log("Removing book with ID:", idToRemove);
    });

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(genre);
    bookCard.appendChild(status);
    bookCard.appendChild(removeBtn);

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
