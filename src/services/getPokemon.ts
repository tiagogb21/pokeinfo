import axios from 'axios';
import {
  MAX_NUMBER,
  URL_POKEMON,
  URL_POKEMON_IMAGE,
} from '../utils/constants';

export const getAllPokemons = async () => await axios.get(
  `${ URL_POKEMON }/pokemon/?limit=${ MAX_NUMBER }`
  ).then((res: any) => {

    const { results } = res.data;

    return results;
  }).catch((err) => err)

export const pokemonDataType = async (id: number) => await axios.get(
`${ URL_POKEMON }/pokemon/${ id }`
  ).then((res) => {
    const { data } = res;
    const { types } = data;
    const pokeTypes = {
      types: types.map(({type}:{type: any}) => type.name),
    };
    return pokeTypes;
  }).catch((err) => err)

export const pokemonData = async (name: string) => await axios.get(
    `${ URL_POKEMON }/pokemon/${ name }`
  ).then((res) => {
    const { data } = res;
    const {
      abilities,
      height,
      id,
      stats,
      sprites,
      types,
      weight,
    } = data;
    const pokeInfo = {
      abilities: abilities.map(({ ability } : { ability : any }) => ability.name),
      height,
      id,
      stats: stats.map(({ base_stat, stat } : { base_stat : string, stat: any }) => {
        return {
          statName: stat.name,
          statValue: base_stat,
        }
      }),
      sprites: `${ URL_POKEMON_IMAGE }${ id }.png`,
      types: types.map(({type}:{type: any}) => type.name),
      weight,
    }
    return pokeInfo;
  }).catch((err) => err)

export const pokemonSpeciesData = async (name: string) => await axios.get(
    `{${ URL_POKEMON }/pokemon-species/${ name }`
  ).then((res) => {
    return res;
}).catch((err) => err)
