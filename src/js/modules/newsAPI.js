const axios = require("axios").default;

const instance = axios.create({
  baseURL: "https://newsapi.org/v2",
  headers: { "X-Api-Key": "c8747511a2c34730a83caaff4f3693e7" },
});

export class NewsApi {
  static page = 1;
  static pageSize = 10;
  static query;
  static totalResults;

  static getNews(q) {
    if (q !== undefined) NewsApi.query = q;
    else q = NewsApi.query;

    const endPoint = "/everything";
    const config = {
      params: {
        q,
        page: NewsApi.page,
        pageSize: NewsApi.pageSize,
      },
    };

    return instance.get(endPoint, config).then((resp) => {
      NewsApi.totalResults = resp.data.totalResults;
      console.log(resp.data);
      return resp.data;
    });
  }

  static incrementPage() {
    const maxPage = Math.ceil(NewsApi.totalResults / NewsApi.pageSize);
    if (NewsApi.page < maxPage) {
      NewsApi.page += 1;
    }
  }

  static decrementPage() {
    if (NewsApi.page > 1) NewsApi.page -= 1;
  }

  static setPage(page) {
    const maxPage = Math.ceil(NewsApi.totalResults / NewsApi.pageSize);
    if (page >= 1 && page <= maxPage) NewsApi.page = page;
  }
}
