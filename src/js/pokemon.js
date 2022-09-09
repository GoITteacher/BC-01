import "../css/common.css";
import { Pokemons } from "./modules/pokemonAPI";

const listPokRef = document.querySelector(".js-jobs-list");
const btnUp = document.querySelector(".js-btn-up");
const pokemons = new Pokemons();

pokemons.getPokemons().then((resp) => {
  renderPok(resp.results);
  pokemons.nextPage = resp.next;
});

let flag = true;

function createMarkup(arr) {
  return arr
    .map(({ name }) => {
      return `
       <li class="list-item">
        <h2>${name}</h2>
    </li>`;
    })
    .join("");
}

function renderPok(arr) {
  listPokRef.insertAdjacentHTML("beforeend", createMarkup(arr));
}

function loadNextPage() {
  pokemons.getNextPage().then((resp) => {
    renderPok(resp.results);
    pokemons.nextPage = resp.next;
    flag = true;
  });
}

listPokRef.addEventListener("scroll", () => {
  let height =
    listPokRef.scrollHeight - listPokRef.scrollTop - listPokRef.offsetHeight;
  if (height < 200 && flag) {
    flag = false;
    loadNextPage();
  }

  if (listPokRef.scrollTop > 300) {
    console.log("true");
    document.body.classList.add("show");
  } else {
    document.body.classList.remove("show");
  }
});

btnUp.addEventListener("click", scrollToTop);

function scrollToTop() {
  listPokRef.scrollTop = 0;
}
