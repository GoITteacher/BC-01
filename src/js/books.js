import "../css/common";
import { BooksAPI } from "./modules/booksAPI";
import cardBook from "../templates/card-books";
function callback() {
  console.log("CALLBACK");
}

const booksApi = new BooksAPI(0, 5);

const refs = {
  createForm: document.querySelector(".js-create-form"),
  updateForm: document.querySelector(".js-update-form"),
  resetForm: document.querySelector(".js-reset-form"),
  btnLoadMore: document.querySelector(".js-btn-load"),
  bookList: document.querySelector(".js-articl-list"),
  deleteForm: document.querySelector(".js-delete-form"),
};

refs.btnLoadMore.addEventListener("click", onBtnLoadClick);
refs.createForm.addEventListener("submit", onCreateForm);
refs.resetForm.addEventListener("submit", onResetForm);
refs.updateForm.addEventListener("submit", onUpdateForm);
refs.deleteForm.addEventListener("submit", onDeleteForm);

function onCreateForm(event) {
  event.preventDefault();

  let formData = new FormData(refs.createForm);

  let book = {};
  formData.forEach((value, key) => {
    book[key.replace("book", "").toLowerCase()] = value;
  });

  booksApi.createBook(book);
  refs.createForm.reset();
}

function onResetForm(event) {
  event.preventDefault();

  let formData = new FormData(refs.resetForm);

  let book = {};
  formData.forEach((value, key) => {
    book[key.replace("book", "").toLowerCase()] = value;
  });
  let id = book.id;
  delete book.id;

  booksApi.replaceBook(book, id).then(() => {
    booksApi.getBooks().then(renderBooks);
  });

  refs.resetForm.reset();
}

function onUpdateForm(event) {
  event.preventDefault();
  let book = {};
  let formData = new FormData(refs.updateForm);
  formData.forEach((value, key) => {
    if (value.trim().length > 0)
      book[key.replace("book", "").toLowerCase()] = value;
  });
  let id = book.id;
  delete book.id;

  booksApi.updateBook(book, id).then(() => {
    booksApi.getBooks().then(renderBooks);
  });
}

function onDeleteForm(event) {
  event.preventDefault();
  let id = refs.deleteForm.elements.bookId.value;
  booksApi.deleteBook(id).then(() => {
    booksApi.getBooks().then(renderBooks);
  });
}

function onBtnLoadClick(event) {
  booksApi.getBooks().then((books) => renderBooks(books));
}

function renderBooks(books) {
  refs.bookList.innerHTML = cardBook(books);
}
