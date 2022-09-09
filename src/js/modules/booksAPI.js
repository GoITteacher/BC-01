import axios from "axios";
import { faker } from "@faker-js/faker";
faker.seed(0);
faker.locale = "ru";
const baseURL = "http://localhost:4040";

const instance = axios.create({
  baseURL: `${baseURL}/books`,
});

export class BooksAPI {
  constructor(page, limit) {
    this._page = page;
    this._limit = limit;
  }

  getBooks() {
    return instance.get("").then((response) => response.data);
  }

  getLimitBooks() {
    this._page++;
    return instance
      .get(`?_page=${this._page}&_limit=${this._limit}`)
      .then((response) => response.data);
  }

  createBook(book) {
    return instance.post("", book).then((response) => response.data);
  }
  replaceBook(book, id) {
    return instance.put(`/${id}`, book).then((response) => response.data);
  }
  updateBook(book, id) {
    return instance.patch(`/${id}`, book).then((response) => response.data);
  }
  deleteBook(id) {
    return instance
      .delete(`/${id}`)
      .then((response) => response)
      .catch((error) => console.log(error));
  }

  static getRandomBook() {
    return {
      author: faker.name.firstName(),
      desc: faker.lorem.paragraph(),
      title: faker.word.preposition(),
    };
  }
}
