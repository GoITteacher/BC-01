import "../css/common.css";
import { Jobs } from "./modules/jobsAPI";
import jobsTemplate from "../templates/jobs-template.hbs";

const listJobsRef = document.querySelector(".js-jobs-list");
const btnPrev = document.querySelector(".js-btn-prev");
const btnNext = document.querySelector(".js-btn-next");

const jobsAPI = new Jobs();

jobsAPI.getJobs().then((data) => {
  renderJobs(data.data);
  jobsAPI.links = data.links;
  console.log(jobsAPI.links);
});

function renderJobs(arr) {
  listJobsRef.innerHTML = jobsTemplate(arr);
}

btnPrev.addEventListener("click", onBtnPrevClick);
btnNext.addEventListener("click", onBtnNextClick);

function onBtnPrevClick() {
  jobsAPI.page -= 1;
  jobsAPI.getPrevPage().then((data) => {
    renderJobs(data.data);
    jobsAPI.links = data.links;
  });
}

function onBtnNextClick() {
  jobsAPI.page += 1;
  jobsAPI.getNextPage().then((data) => {
    renderJobs(data.data);
    jobsAPI.links = data.links;
  });
}
