import { URL_POKEMON_IMAGE } from "./constants";

export function addZeroes(num: number) {
  var numberWithZeroes = String(num);
var counter = numberWithZeroes.length;

while(counter < 3) {

    numberWithZeroes = "0" + numberWithZeroes;

  counter++;

  }

return numberWithZeroes;
}

interface NormalizePokemonLite {
  pokemon: any
}

interface IType {
  name: string;
  url: string;
}

export const normalizePokemonLite = ({ pokemon }: NormalizePokemonLite) => {
  const data = {
    id: pokemon.id,
    name: pokemon.name,
    image: `${URL_POKEMON_IMAGE + pokemon.id}.png`,
    types: pokemon.types.map(({ type } : { type: IType }) => type.name),
  }

  return data
}
