const formContainer = document.getElementById("book-form");
const formContent = document.getElementById("form-content");
const submitBtn = document.getElementById("submit-btn");
const addBtn = document.getElementById("add-button");

const overlay = document.getElementById("overlay");

let myLibrary = [];

function Book(title, author, synopsis, read) {
    this.title = title;
    this.author = author;
    this.synopsis = synopsis;
    this.read = read;
}

// Saving new book when submit clicked
submitBtn.addEventListener("click", function(e) {
    e.preventDefault();

    // get form data
    // const title = document.getElementById("title").value;
    // const author = document.getElementById("author").value;
    // const synopsis = document.getElementById("synopsis").value;
    // const read = document.getElementById("read").value;
    let title = formContent.elements['title'].value;
    let author = formContent.elements['author'].value;
    let synopsis = formContent.elements['synopsis'].value;
    let read = formContent.elements['read'].value;
    // let read = document.getElementById("completed").value;

    console.log(title + " " + author + " " + synopsis + " " + read);
    // new book object
    let book = new Book(title, author, synopsis, read);
    console.log(JSON.stringify(book));

    addBookToLibrary(book, myLibrary);
});


function addBookToLibrary(book, myLibrary) {
    myLibrary.push(book);
    displayLibrary(myLibrary);
    closeForm();
}

function displayLibrary(myLibrary) {
    // the div where the cards will be displayed
    const cardsDiv = document.getElementById("cards");

    // clear the existing cards
    cardsDiv.innerHTML = "";

    // add each book to div as card

    myLibrary.forEach((book, index) => {
        console.log(book.title);
        const card = document.createElement("div");
        card.classList.add("card");

        const cardTitle = document.createElement("div");
        cardTitle.classList.add("title");

        // Card Title and Author 
        const cardHeadingTitle = document.createElement("h2");
        cardHeadingTitle.innerHTML = book.title;

        const cardAuthor = document.createElement("p");
        cardAuthor.innerHTML = book.author;

        const titleBreak = document.createElement("hr");
        cardTitle.appendChild(cardHeadingTitle);
        cardTitle.appendChild(cardAuthor);
        cardTitle.appendChild(titleBreak);
        card.appendChild(cardTitle);
        
        // adding card synopsis
        const cardContent = document.createElement("div");
        cardContent.innerHTML = book.synopsis;
        cardContent.classList.add("book-content");
        card.appendChild(cardContent);

        // adding card footer
        const cardFooter = document.createElement("div");
        cardFooter.classList.add("card-footer");

        const cardReadDiv = document.createElement("div");
        cardReadDiv.classList.add("card-read");

        const cardRead = document.createElement("p");
        cardRead.innerHTML = book.read;
        cardReadDiv.appendChild(cardRead);

        const cardButtons = document.createElement("div");
        cardButtons.classList.add("button-block");

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.classList.add("delete");
        deleteButton.addEventListener("click", () => {
            deleteBook(index);
        });

        const updateButton = document.createElement("button");
        updateButton.innerHTML = "Edit";
        updateButton.classList.add("update");
        updateButton.addEventListener("click", () => {
            editBook(index);
        });

        cardButtons.appendChild(deleteButton);
        cardButtons.appendChild(updateButton);

        cardFooter.appendChild(cardReadDiv);
        cardFooter.appendChild(cardButtons);

        card.appendChild(cardFooter);
        
        cardsDiv.appendChild(card);
    });
}

// Open popup when button is clicked
addBtn.addEventListener("click", function() {
    formContainer.style.display = "block";
    overlay.style.display = "block";
});

// Close popup form when cancel button is clicked
overlay.addEventListener("click", function() {
    closeForm();
});

function closeForm() {
    formContent.reset();
    formContainer.style.display = "none";
    overlay.style.display = "none";
}

// edit Book value
function editBook(index) {
    const book = myLibrary[index];

    // Populate the form with the message data
    formContent.elements['title'].value = book.title;
    formContent.elements['author'].value = book.author;
    formContent.elements['synopsis'].value = book.synopsis;
    formContent.elements['read'].value = book.read;

    myLibrary.splice(index, 1);

    formContainer.style.display = "block";
    overlay.style.display = "block";

}

// delete book value
function deleteBook(index) {
    myLibrary.splice(index, 1);
    displayLibrary(myLibrary);
}
