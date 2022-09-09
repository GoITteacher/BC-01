export class Pokemons {
  baseUrl = `https://pokeapi.co/api/v2/pokemon`;
  limit = 20;
  page = 1;
  nextPage;

  getPokemons() {
    return fetch(`${this.baseUrl}?limit=${this.limit}&page=${this.page}`).then(
      (resp) => resp.json()
    );
  }

  getNextPage() {
    return fetch(this.nextPage).then((resp) => resp.json());
  }
}
