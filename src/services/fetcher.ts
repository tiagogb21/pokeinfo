import axios from "axios";

const fetchData = async (url: string) =>
  await axios.get(url)
    .then((res) => {
      return res.data.results;
    })
    .catch((err) => err);

export const fetcher = async (url: string) =>
  await fetch(url, { cache: 'force-cache' })
    .then((response) => {
      // console.log(response.json())
      return response.json()
    });

export default fetchData;
