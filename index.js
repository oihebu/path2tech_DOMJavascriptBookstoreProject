// pt 1 - creating new books from form
const createBookForm = document.querySelector("#create-book"); //gets form from html
const booksContainer = document.querySelector("#books-container"); //gets container from html
const apiUrl = "https://bookstore-api-six.vercel.app/api/books"; //api endpoint
const headers = {
    "Content-Type" : "application/json", //expected data type being exchanged
}
async function createBook(event){ // a submit function to create new book
    try {
        event.preventDefault(); //prevents defauly behavior of form submission
        const payload = { //data being sent to API
            title: event.target.title.value, // value of target input
            author: event.target.author.value,
            isbn: event.target.isbn.value,
        };
        const response = await fetch (apiUrl, { // creating new (todo) with this method
            method: "POST", //http type
            body: JSON.stringify(payload), //converting the data to json
            headers

        });
        const data = await response.json(); //need to convert the response to json 
        const newElement = document.createElement ("tr");
        newElement.innerHTML = `
        <td id="title-row">${data.title}</td>
        <td id="author-row">${data.author}</td>
        <td id="isbn-row">${data.isbn}</td>
        <td><button id="${data.id}"class="delete-book">delete</button></td>
        `;
        booksContainer.appendChild(newElement);
        event.target.reset();

    } catch(error) {
        console.log(error.message);
    }
}

createBookForm.addEventListener("submit", createBook);

//pt 2 - deleting book from html
async function deleteBook (id){ // function to delete book from server
    try {
        const response = await fetch (`${api}/${id}`, { //sending DELETE request
            method: "DELETE", //using delete HTTP methof
            headers, //setting the headers
        });
        const data = await response.json();
        console.log(data);

    } catch (error) {
        console.log(error);
    }

}

document.addEventListener("click", async function (event) {
    if (event.target.classList.contains("delete-book")){
        await deleteBook(event.target.id);
        event.target.parentElement.remove();
    }
});

//pt 3 - load in books from api

async function fetchBooks(){
  try {
    const response = await fetch(apiUrl); //gets books from api
    const data = await response.json();
    const filteredData = data.filter((_, idx) => idx < 5); // limiting books to first 5
    for (const item of filteredData) {
        const newElement = document.createElement ("tr");
        newElement.innerHTML = `
        <td id="title-row">${item.title}</td>
        <td id="author-row">${item.author}</td>
        <td id="isbn-row">${item.isbn}</td>
        <td id ="delete-row"><button id="${item.id}"class="delete-book">delete</button></td>
        `;
        booksContainer.appendChild(newElement);

    }

  } catch (error) {
    console.log(error);
  }
 
}

fetchBooks();



