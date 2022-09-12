import "./css/common.css";
import cardBook from "../templates/card-books.hbs";
import { BooksApi } from "./modules/booksAPI";
import { Notify } from "notiflix";

const newBooks = new BooksApi({ limit: 8 });
const refs = {
  createForm: document.querySelector(".js-create-form"),
  updateForm: document.querySelector(".js-update-form"),
  resetForm: document.querySelector(".js-reset-form"),
  btnLoadMore: document.querySelector(".js-btn-load"),
  bookList: document.querySelector(".js-articl-list"),
  deleteForm: document.querySelector(".js-delete-form"),
};

refs.btnLoadMore.addEventListener("click", onLoadClick);
refs.createForm.addEventListener("submit", onCreateClick);
refs.resetForm.addEventListener("submit", onResetClick);
refs.updateForm.addEventListener("submit", onUpdateClick);
refs.deleteForm.addEventListener("submit", onDeleteClick);

function onDeleteClick(e) {
  e.preventDefault();
  const id = e.currentTarget.elements.bookId.value;
  newBooks.deleteBook(id).then(() => {
    Notify.failure("BOOK DELETED");
  });
  e.currentTarget.reset();
}

function onUpdateClick(e) {
  e.preventDefault();
  const { bookTitle, bookAuthor, bookDesc, bookId } = e.currentTarget.elements;
  const book = {
    title: bookTitle.value.trim(),
    author: bookAuthor.value.trim(),
    desc: bookDesc.value.trim(),
    id: bookId.value,
  };

  newBooks.updateBook(book).then(() => {
    Notify.warning("Book updated");
  });
  refs.bookList.innerHTML = "";
  e.currentTarget.reset();
}

function onResetClick(e) {
  e.preventDefault();
  const { bookTitle, bookAuthor, bookDesc, bookId } = e.currentTarget.elements;
  const book = {
    title: bookTitle.value.trim(),
    author: bookAuthor.value.trim(),
    desc: bookDesc.value.trim(),
    id: bookId.value,
  };

  newBooks.resetBook(book).then(() => {
    Notify.info("Book reseted");
  });
  refs.bookList.innerHTML = "";
  e.currentTarget.reset();
}

function onLoadClick(e) {
  newBooks.getAllBooks().then((books) => {
    renderBooks(books);
    //newBooks.page += 1;
  });
}

function renderBooks(books) {
  //refs.bookList.insertAdjacentHTML("beforeend", cardBook(books));
  refs.bookList.innerHTML = cardBook(books);
}

function onCreateClick(e) {
  e.preventDefault();
  const { bookTitle, bookAuthor, bookDesc } = e.currentTarget.elements;
  const book = {
    title: bookTitle.value.trim(),
    author: bookAuthor.value.trim(),
    desc: bookDesc.value.trim(),
  };
  if (book.title && book.author && book.desc)
    newBooks.createBook(book).then(() => {
      Notify.success("Ok");
    });
  else {
    Notify.failure("Error");
  }
  e.currentTarget.reset();
}
