//COMPONENTS
import PokemonList from "./components/PokemonList.js";

//APIS
import { getPokemonList } from "./modules/api.js";

export default function App($app) {
  const getSearchWord = () => {
    if (window.location.search.includes("search=")) {
      return window.location.search.split("search=")[1];
    }
    return "";
  };

  this.state = {
    type: "",
    pokemonList: [],
    searchWord: getSearchWord(),
    currentPage: window.location.pathname,
  };

  const pokemonList = new PokemonList({
    // 코드 작성
    $app,
    initialState: this.state.pokemonList,
    handleItemClick: (id) => {
      history.pushState(null, null, `/detail/${id}`);
      this.setState({
        ...this.state,
        currentPage: `/detail/${id}`,
      });
    },
    handleTypeClick: async (type) => {
      history.pushState(null, null, `/${type}`);
      const pokemonList = await getPokemonList(type);
      this.setState({
        ...this.state,
        pokemonList: pokemonList,
        searchWord: getSearchWord(),
        type: type,
        currentPage: `/${type}`,
      });
    },
  });

  this.setState = (newState) => {
    this.state = newState;
    // 코드 작성
    pokemonList.setState(this.state.pokemonList);
  };

  const init = async () => {
    try {
      const initialPokemonList = await getPokemonList(
        this.state.type,
        this.state.searchWord
      );
      this.setState({
        ...this.state,
        pokemonList: initialPokemonList,
      });
    } catch (err) {
      console.log(err);
    }
  };

  init();
}
