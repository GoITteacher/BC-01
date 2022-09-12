import "./css/common.css";
import cardBook from "../templates/card-books.hbs";

const refs = {
  createForm: document.querySelector(".js-create-form"),
  updateForm: document.querySelector(".js-update-form"),
  resetForm: document.querySelector(".js-reset-form"),
  btnLoadMore: document.querySelector(".js-btn-load"),
  bookList: document.querySelector(".js-articl-list"),
  deleteForm: document.querySelector(".js-delete-form"),
};

function renderBooks(books) {
  refs.bookList.innerHTML = cardBook(books);
}
