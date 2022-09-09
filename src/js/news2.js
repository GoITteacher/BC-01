import { NewsApi } from "./modules/newsAPI2";
import newsTemplate from "../templates/newsTemplate2";
const formRef = document.querySelector(".js-search-form");
const refBtnLoad = document.querySelector(".js-btn-load");
const containerNewsRef = document.querySelector(".js-article-list");

formRef.addEventListener("submit", onFormSubmit);
refBtnLoad.addEventListener("click", onBtnLoadClick);

function onFormSubmit(e) {
  e.preventDefault();
  const query = e.target.elements.newsQuery.value;
  NewsApi.setPage(1);
  NewsApi.getNews(query).then(({ articles }) => renderNews(articles));
}

function onBtnLoadClick(e) {
  NewsApi.incrementPage();
  NewsApi.getNews().then(({ articles }) => renderNews(articles));
}

function renderNews(news) {
  containerNewsRef.insertAdjacentHTML("beforeend", newsTemplate(news));
}
