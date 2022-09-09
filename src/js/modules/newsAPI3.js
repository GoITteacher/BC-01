export class NewsAPI {
  totalPage = 1;
  config = {
    baseURL: "https://free-news.p.rapidapi.com/v1/search",
    headers: {
      "X-RapidAPI-Key": "9b3ff61931msh1b42d77d34e33dap1c29cajsn3d3169e0e2f4",
      "X-RapidAPI-Host": "free-news.p.rapidapi.com",
    },
    data: {
      page: 1,
      page_size: 8,
      q: "",
    },
  };

  getNews(query) {
    if (query === undefined) query = this.config.data.q;
    else this.config.data.q = query;

    let serchParams = new URLSearchParams(this.config.data);
    return fetch(`${this.config.baseURL}?${serchParams}`, this.config)
      .then((resp) => resp.json())
      .then((data) => {
        this.totalPage = data.total_pages;
        return data;
      });
  }

  setPage(page) {
    this.config.data.page = page;
  }
}
