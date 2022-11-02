import { useCallback } from 'react';
import useSWRInfinite from 'swr/infinite';

import fetchData from '../services/fetcher';
import { MAX_NUMBER, URL_POKEMON_PAGE } from '../utils/constants';

const getKey = (pageIndex: any, previousPageData: any) => {
  // Chega ao fim
  if (previousPageData && !previousPageData.next) return null

  // Na primeira página, nós não temos `previousPageData`
  if (pageIndex === 0)
    return `${ URL_POKEMON_PAGE }${ MAX_NUMBER }`

  // add the cursor to the API endpoint
  return previousPageData.next
}

const useInfiniteQuery = () => {
  const { data, error, size, setSize } = useSWRInfinite(
    getKey,
    fetchData,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  const pokemons = data ? [].concat(...data) : [];

  const isLoadingInitialData = !data && !error

  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined')

  const isEmpty = data?.[0]?.length === 0

  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < MAX_NUMBER)

  const next = useCallback(() => setSize((size) => size + 1), [])

  return {
    data: pokemons,
    isLoadingMore,
    isReachingEnd,
    next,
  }
}

export default useInfiniteQuery;
