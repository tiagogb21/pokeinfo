import React, { useMemo } from "react";
import Image from "next/image";
import useSWRImmutable from 'swr/immutable'

import styles from '../../styles/Home.module.css';
import { colors } from "../../utils/colors";
import { URL_POKEMON_IMAGE } from "../../utils/constants";
import { addZeroes, normalizePokemonLite } from "../../utils/functions";
import { fetcher } from "../../services/fetcher";
import Link from "next/link";
import { IColors } from "../../types/IColors";

interface IProps {
  name: string;
  id: number;
  types: string[]
}

const PokeCard = ({ url, index, ...props } : { url: string, index: number }) => {
  const { data, error } = useSWRImmutable(url, fetcher)

  const pokemon = useMemo(() => {
    if (!data) return null

    return normalizePokemonLite({ pokemon: data })
  }, [data])

  if (error) return null;
  if (!pokemon) return null;

  const { name, id, types } = pokemon;

  return (
    <Link
      className={styles.box}
      href={`/pokedex/${ name }`}
    >
      <article
        className={styles.boxImg}
      >
        <Image
          src={`${ URL_POKEMON_IMAGE }${ id }.png`}
          alt={ name }
          width={ 120 }
          height={ 120 }
        />
      </article>
      <article className={styles.boxText}>
        <p>{ addZeroes(id + 1) }</p>
        <h3>{ name }</h3>
        <article className={ styles.boxTypes }>
          {
            types.map((type: string) => (
              <p
                key={ type }
                className={ styles.types }
                style={{ background: colors[type as keyof IColors] }}
              >
                { type }
              </p>
            ))
          }
        </article>
      </article>
    </Link>
  );
};

export default PokeCard;
