import React from 'react';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';

import { getAllPokemons, pokemonData } from '../../services/getPokemon';
import { MINUTES } from '../../utils/constants';
import { useRouter } from 'next/router';
import style from '../../styles/Pokemon.module.css';
import { colors } from '../../utils/colors';
import Link from 'next/link';

interface IPoke {
  name: string;
  url: string;
}

interface IColors {
  normal: string;
  fire: string;
}

const PokemonInfo: React.FC = ({ pokemon } : IParams) => {
  return (
    <section className={ style.container }>
      <Link href="/">Home</Link>
      {
        pokemon && (
          <section className={ style.pokeContainerInfo }>
            <section className={ style.pokeContainer }>
              <article className={ style.boxTypes }>
                {
                  pokemon.types.map((type: string) => (
                    <p
                      key={ type }
                      className={ style.types }
                      style={{ background: colors[type as keyof IColors] }}
                    >
                      { type }
                    </p>
                  ))
                }
              </article>
              <article className={ style.boxImage }>
                <Image
                  src={ pokemon.sprites }
                  alt=""
                  width={200}
                  height={200}
                />
              </article>
              <article className={ style.smallBox }>
                <article className={ style.boxTxt }>
                  <p><span className={style.colorTxt}>Habilidades:</span></p>
                  {
                    pokemon.abilities.map((abilitie: string) => (
                      <p key={ abilitie }>{ abilitie }</p>
                    ))
                  }
                </article>
                <article className={ style.boxTxt }>
                  <p><span className={style.colorTxt}>Altura</span>: { pokemon.height/10 } m</p>
                  <p><span className={style.colorTxt}>Peso</span>: { pokemon.weight/10 } kg</p>
                </article>
              </article>
            </section>
            <article>
              {
                pokemon.stats.map(({ statName, statValue} : {statName: string, statValue: string }) => (
                  <p key={ statName }>{statName} : {statValue}</p>
                ))
              }
            </article>
          </section>
        )
      }
    </section>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pokemonsData = await getAllPokemons();

  const paths = pokemonsData.map((poke: IPoke) => (
    { params: { pokemon: poke.name } }
  ))

  return {
    paths,
    fallback: true,
  }
}

type IParams = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps: GetStaticProps = async (context) => {
  const { pokemon } = context.params as IParams;

  const pokeData = await pokemonData(pokemon);

  return {
    props: {
      pokemon: JSON.parse(JSON.stringify(pokeData)),
    },
    revalidate: 2 * MINUTES * MINUTES
  }
}

export default PokemonInfo;
