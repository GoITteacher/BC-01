import "../css/common";
import { NewsApi } from "./modules/newsAPI";
import newsTemplate from "../templates/newsTemplate";
const formRef = document.querySelector(".js-search-form");
const refBtnPrev = document.querySelector(".js-btn-prev");
const refBtnNext = document.querySelector(".js-btn-next");
const containerNewsRef = document.querySelector(".js-article-list");

formRef.addEventListener("submit", onFormSubmit);
refBtnPrev.addEventListener("click", onBtnPrevClick);
refBtnNext.addEventListener("click", onBtnNextClick);

function onFormSubmit(e) {
  e.preventDefault();
  const query = e.target.elements.newsQuery.value;
  NewsApi.setPage(1);
  NewsApi.getNews(query).then(({ articles }) => renderNews(articles));
}

function onBtnPrevClick(e) {
  NewsApi.decrementPage();
  NewsApi.getNews().then(({ articles }) => renderNews(articles));
}

function onBtnNextClick(e) {
  NewsApi.incrementPage();
  NewsApi.getNews().then(({ articles }) => renderNews(articles));
}

function renderNews(news) {
  containerNewsRef.innerHTML = newsTemplate(news);
}
