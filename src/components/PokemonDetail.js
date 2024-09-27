import { setPokemonType } from '../modules/typeTag.js';

export default function PokemonDetail({$app, initialState}){
    this.state=initialState;
    this.$target = document.createElement('div');
    this.$target.className ='pokemon-detail';

    $app.appendChild(this.$target);

    this.template = () => {
        console.log(this.state);
        let pokemonDetail = this.state.pokemonDetail;
        
        
        // html 코드는 아래와 같이 제공드립니다.
        // 필요한 코드를 추가적으로 작성해 웹 사이트를 완성하세요.
        let temp = 
        `<div class="detail-wrapper">
            <div class="left-wrapper">
                <img src="${pokemonDetail.img}"></img>
            </div>
            <div class="right-wrapper">
                <div class="pokemon-info">
                    <div class="index">No.${pokemonDetail.id}</div>
                    <div class="name">${pokemonDetail.name}</div>                 
                    <div class="type">${setPokemonType(pokemonDetail.type)}</div>
                    <div class="description">${pokemonDetail.description}</div>
                </div>
                <div class="detail-info">
                    <div>
                        <div class="label">키</div>
                        <div class="info">${pokemonDetail.height}m</div>
                    </div>
                    <div>
                        <div class="label">분류</div>
                        <div class="info">${pokemonDetail.info}</div>
                    </div>
                    <div>
                        <div class="label">몸무게</div>
                        <div class="info">${pokemonDetail.weight}kg</div>
                    </div>
                </div>
            </div>
        </div>`;
        return temp;
    };

    this.render = () => {
        this.$target.innerHTML = this.template();
    };

    this.setState = (newState) => {
        this.state = newState;
        this.render();
    };

    this.render();

}