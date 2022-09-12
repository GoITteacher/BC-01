import { faker } from "@faker-js/faker";
faker.seed(0);
faker.locale = "ru";

const axios = require("axios");

export class BooksApi {
  BASE_URL = "http://localhost:4040";

  constructor({ page = 1, limit = 5 } = {}) {
    this.page = page;
    this.limit = limit;
  }

  deleteBook(id) {
    return axios.delete(`${this.BASE_URL}/books/${id}`);
  }

  createBook(book) {
    return axios.post(`${this.BASE_URL}/books`, book);
  }

  resetBook({ id, ...book }) {
    return axios.put(`${this.BASE_URL}/books/${id}`, book);
  }

  updateBook({ id, ...book }) {
    for (let key of Object.keys(book)) {
      if (!book[key].trim()) delete book[key];
    }
    return axios.patch(`${this.BASE_URL}/books/${id}`, book);
  }

  getBooks() {
    return axios
      .get(`${this.BASE_URL}/books`, {
        params: {
          _page: this.page,
          _limit: this.limit,
        },
      })
      .then((response) => response.data);
  }

  getAllBooks() {
    return axios
      .get(`${this.BASE_URL}/books`)
      .then((response) => response.data);
  }
}

/* 
static getRandomBook() {
    return {
      author: faker.name.firstName(),
      desc: faker.lorem.paragraph(),
      title: faker.word.preposition(),
    };
  }
*/
