import { useMemo, useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';

import { useInView } from 'react-cool-inview';

import styles from '../styles/Home.module.css';
import { getAllPokemons, pokemonDataType } from '../services/getPokemon';
import { HOURS, MAX_NUMBER, MINUTES, rootMargin } from '../utils/constants';
import PokeCard from '../components/PokeCard';
import useInfiniteQuery from '../hooks/useInfiniteQuery';
import { useRouter } from 'next/router';

interface IProps {
  name: string;
  url: string;
  types: string[]
}

export default function Home() {
  const router = useRouter();

  const { data, next } = useInfiniteQuery()

  const [searchInput, setSearchInput] = useState('');

  const [min, setMin] = useState(16);

  const handleClick = () => setMin((prev) => prev + 16);

  const handleClickSearch = () => {
    let findPokemon = pokemons
      .find(({name}: {name:string}) => name.toLowerCase().includes(searchInput.toLowerCase()));
    findPokemon && router.push(`pokedex/${ findPokemon.name }`)
  }

  const pokemons: any = useMemo(
    () => data?.flatMap((page: any) => {
      return page
    }) ?? [],
    [data]
  )

  const { observe } = useInView({
    // Podemos aumentar a margem raiz para que os dados sejam carregados mais cedo
    rootMargin: rootMargin,

    // Quando o último item chega à janela de visualização
    onEnter: ({ unobserve }) => {

      // Pausa o observe ao carregar os dados
      unobserve()

      // Carrega mais dados
      next()
    },
  });

  return (
    <section>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Get information about all Pokemons" />
        <link rel="icon" href="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1200px-Pok%C3%A9_Ball_icon.svg.png" />
      </Head>

      <main
        className={ styles.main }
      >
        <article className={ styles.header }></article>
        <article>
          <input
            type="text"
            placeholder="Digite o nome de um pokemon"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            type="button"
            onClick={handleClickSearch}
          >
            Pesquisar
          </button>
        </article>
        <section
          className={styles.container}
        >
          {
            pokemons?.slice(0, min).map(({name, url} : {name: string, url: string}, index: number) => {
              const isLast = index === pokemons.length - 1;
              return (
                <article ref={isLast ? observe : null} key={ name }>
                  <PokeCard url={url} index={++index} />
                </article>
              )
            })
          }
        </section>
        {
          min < MAX_NUMBER &&
          <button
            type="button"
            onClick={ handleClick }
            className={ styles.btn }
          >
            Veja mais pokemons
          </button>
        }
      </main>

      <footer className={styles.footer}>

      </footer>
    </section>
  )
}
