const axios = require("axios").default;

const instance = axios.create({
  baseURL: "https://free-news.p.rapidapi.com/v1",
  headers: {
    "X-RapidAPI-Key": "9b3ff61931msh1b42d77d34e33dap1c29cajsn3d3169e0e2f4",
    "X-RapidAPI-Host": "free-news.p.rapidapi.com",
  },
});

export class NewsApi {
  static page = 1;
  static pageSize = 10;
  static query;
  static totalPages;

  static getNews(q) {
    if (q !== undefined) NewsApi.query = q;
    else q = NewsApi.query;

    const endPoint = "/search";
    const config = {
      params: {
        q,
        page: NewsApi.page,
        page_size: NewsApi.pageSize,
      },
    };

    return instance.get(endPoint, config).then((resp) => {
      NewsApi.totalPages = resp.data.total_pages;
      console.log(resp.data);
      return resp.data;
    });
  }

  static incrementPage() {
    const maxPage = NewsApi.totalPages;
    if (NewsApi.page < maxPage) {
      NewsApi.page += 1;
    }
  }

  static decrementPage() {
    if (NewsApi.page > 1) NewsApi.page -= 1;
  }

  static setPage(page) {
    const maxPage = NewsApi.totalPages;
    if (page >= 1 && page <= maxPage) NewsApi.page = page;
  }
}
