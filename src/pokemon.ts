// PokeAPIのベースURL
import * as url from 'url';

const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

// APIのレスポンスで使用するオブジェクトの型定義
interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  type: string;
  species: {
    url: string;
  };
  types: Array<{
    type: {
      name: string;
      url: string;
    };
  }>;
}

// 非同期処理の実行完了後の値を型定義する
type FetchPokemon = (id: number) => Promise<void | null>;

export default class Pokedex {
  // pokemonsプロパティを定義
  pokemons: number;

  // constructorで初期化する
  constructor(pokemons: number) {
    this.pokemons = pokemons;
  }

  fetchData(): void {
    for (let i = 1; i <= this.pokemons; i++) {
      void this.getPokemon(i);
    }
  }

  private getPokemon: FetchPokemon = async (id: number) => {
    const response: Response | null = await fetch(`${baseUrl}${id}`)
      .then((res) => res)
      .catch((error) => {
        console.error(error);
        return null;
      });

    if (!response) {
      return null;
    }

    const json = await response
      .json()
      .then((json: Pokemon) => {
        return json;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });

    if (!json) {
      return null;
    }

    console.log(json);

    const responsePokemon = {
      id: json.id,
      name: json.name,
      image: json.sprites.front_default,
      species: json.species.url,
      types: json.types,
    };

    console.log(responsePokemon);

    const typesUrl: string[] = [];

    responsePokemon.types.forEach((types: { type: { url: string } }) => {
      Object.keys(types).forEach((category: string) => {
        if (category === 'type') {
          typesUrl.push(types[category]['url']);
        }
      });
    });

    console.log(typesUrl);

    // const pokemon = await data.json();
    // const pokemonType: string = pokemon.types
    //   .map((poke: any) => poke.type.name)
    //   .join(', ');
  };
}
