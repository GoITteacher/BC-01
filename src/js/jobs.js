import "../css/common.css";
import { Jobs } from "./modules/jobsAPI";

const listJobsRef = document.querySelector(".js-jobs-list");
const btnPrev = document.querySelector(".js-btn-prev");
const btnNext = document.querySelector(".js-btn-next");

const jobsAPI = new Jobs();

jobsAPI.getJobs().then((data) => {
  renderJobs(data.data);
  jobsAPI.links = data.links;
  updateStatusBtn(data.links);
});

function createMarkup(arr) {
  return arr
    .map(({ url, title, company_name, created_at, description, location }) => {
      return `
       <li class="list-item">
        <h2><a href="${url}">${title}</a></h2>
        <h3>${company_name}</h3>
        <p>${new Date(created_at)}</p>
        <hr>
        ${description}
        <hr>
        ${location}
    </li>`;
    })
    .join("");
}
function renderJobs(arr) {
  listJobsRef.innerHTML = createMarkup(arr);
}

btnPrev.addEventListener("click", onBtnPrevClick);
btnNext.addEventListener("click", onBtnNextClick);

function onBtnPrevClick() {
  jobsAPI.getPrevPage().then((data) => {
    renderJobs(data.data);
    jobsAPI.links = data.links;
    updateStatusBtn(data.links);
  });
}

function onBtnNextClick() {
  jobsAPI.getNextPage().then((data) => {
    renderJobs(data.data);
    jobsAPI.links = data.links;
    updateStatusBtn(data.links);
  });
}

function updateStatusBtn(links) {
  if (links.next) {
    btnNext.disabled = false;
  } else {
    btnNext.disabled = true;
  }

  if (links.prev) {
    btnPrev.disabled = false;
  } else {
    btnPrev.disabled = true;
  }
}

function updateStatusBtn1(links) {
  if (links.next) {
    btnNext.disabled = false;
  } else {
    btnNext.disabled = true;
  }
}
