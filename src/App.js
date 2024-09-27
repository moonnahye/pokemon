//COMPONENTS
import PokemonList from "./components/PokemonList.js";
import Header from "./components/Header.js";
import PokemonDetail from "./components/PokemonDetail.js";

//APIS
import { getPokemonList, getPokemonDetail } from "./modules/api.js";

export default function App($app) {
  const getSearchWord = () => {
    if (window.location.search.includes("search=")) {
      return window.location.search.split("search=")[1];
    }
    return "";
  };


  this.state = {
    type: window.location.pathname.replace("/", ""),
    pokemonList: [],
    searchWord: getSearchWord(),
    currentPage: window.location.pathname,
  };

  const renderHeader = () =>{
    new Header({
      $app,
      initialState: {
        searchWord: this.state.searchWord,
        currentPage: this.state.currentPage,
      },
      //'포켓몬 도감'을 클릭하면 "/" 홈으로 돌아갈 수 있도록 함수를 완성하세요.
      handleClick: async () => {
        history.pushState(null,null,`/`);
        const pokemonList = await getPokemonList();
        this.setState({
          ...this.state,
          pokemonList: pokemonList,
          type: '',
          searchWord: getSearchWord(),
          currentPage: '/',
        })
      },
      //'돋보기 모양'을 누르면 검색 결과를 나타내고, "(기존 url)/?search=searchWord"로 url을 변경하세요.
      handleSearch: async (searchWord) => {
        history.pushState(null, null, `/?search=${searchWord}`);
        const pokemonList = await getPokemonList(this.state.type, searchWord);
        this.setState({
          ...this.state,
          pokemonList: pokemonList,
          searchWord: searchWord,
          currentPage: `/?search=${searchWord}`,
        })
      },
  });
  }

  const renderPokemonList = () => {
    new PokemonList({
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
  }

  const renderPokemonDetail = async (id) =>{
    try{
      const pokemonDetail = await getPokemonDetail(id);
      new PokemonDetail({
        $app, 
        initialState : {
          ...this.state,
          pokemonDetail: pokemonDetail,
        },
      });
    }catch(err){
      console.log(err);
    }
  }

  const render = async () => {
    const path = this.state.currentPage;
    const pokemonId = path.split('/detail/')[1];
    $app.innerHTML = '';
    if(path.startsWith('/detail/')){
      renderHeader();
      renderPokemonDetail(pokemonId);
    }else{
      renderHeader();
      renderPokemonList();
    }
    
};

  this.setState = (newState) => {
    this.state = newState;
    render();
  };

  const init = async () => {
    const path = this.state.currentPage;
    if(path.startsWith('/detail/')){
      render();
    }else{
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
    }
  };

  // 뒤로 가기, 앞으로 가기 기능 완성
  window.addEventListener('popstate', async () => {
    const urlPath = window.location.pathname;
    const prevType = urlPath.replace('/','');
    const prevSearchWord = getSearchWord();
    const prevPokemonList = await getPokemonList(prevType,prevSearchWord)

    this.setState({
      ...this.state,
      type: prevType,
      pokemonList: prevPokemonList,
      searchWord: prevSearchWord,
      currentPage: urlPath,
  });
});

  init();
}
