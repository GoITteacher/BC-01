import "../css/common";
import "../sass/layout/_news2";
import { NewsAPI } from "./modules/newsAPI3";
const news = new NewsAPI();

const form = document.querySelector(".js-search-form");
const listRef = document.querySelector(".js-article-list");
const refBtnPagination = document.querySelector(".js-pagination");

form.addEventListener("submit", onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const query = form.elements.newsQuery.value;
  //document.body.classList.add("show");
  news.getNews(query).then((data) => {
    createPagination(data.total_pages);
    renderNews(data.articles);
    //document.body.classList.remove("show");
  });

  form.reset();
}

function renderNews(arr) {
  if (arr) {
    listRef.innerHTML = arr.reduce(
      (acc, { summary, title, author }) =>
        `${acc}<li class="list-item"><h3>${title}</h3><p>${summary}</p><p>${author}</p></li>`,
      ""
    );
  }
}

function createPagination(totalPages) {
  if (totalPages) {
    totalPages = totalPages > 5 ? 5 : totalPages;
    let markup = '<li class="selected">1</li>';
    for (let i = 2; i <= totalPages; i += 1) {
      markup += `<li>${i}</li>`;
    }
    refBtnPagination.innerHTML = markup;
  } else {
    //TODO
  }
}

refBtnPagination.addEventListener("click", onPaginationClick);
function onPaginationClick(e) {
  if (e.target.nodeName === "LI") {
    selectPage(+e.target.textContent - 1);
    news.setPage(e.target.textContent);
    //document.body.classList.add("show");
    news.getNews().then((data) => {
      renderNews(data.articles);
      //document.body.classList.remove("show");
    });
  }
}

function selectPage(indexPage) {
  refBtnPagination.querySelector(".selected")?.classList.remove("selected");
  refBtnPagination.children[indexPage].classList.add("selected");
}
