export class Jobs {
  static baseUrl =
    "https://arbeitnow-free-job-board.p.rapidapi.com/api/job-board-api";
  options = {
    headers: {
      "X-RapidAPI-Key": "9b3ff61931msh1b42d77d34e33dap1c29cajsn3d3169e0e2f4",
      "X-RapidAPI-Host": "arbeitnow-free-job-board.p.rapidapi.com",
    },
  };
  links = {};

  getJobs() {
    return fetch(`${Jobs.baseUrl}`, this.options).then((response) =>
      response.json()
    );
  }
  getNextPage() {
    return fetch(`${this.links.next}`, this.options).then((response) =>
      response.json()
    );
  }
  getPrevPage() {
    return fetch(`${this.links.prev}`, this.options).then((response) =>
      response.json()
    );
  }
}
