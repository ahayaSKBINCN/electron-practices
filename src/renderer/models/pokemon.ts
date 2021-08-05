import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints(build) {
    return {
      getPokemonByName: build.query<any, string>({
        query: (name: string) => `pokemon/${name}`,
      }),
      getPokemonList: build.query<any, string>({
        query: (page = "0", size = "10") => `pokemon?page=${page}&size=${size}`
      })
    }

  }
})


export const {
  useGetPokemonByNameQuery,
  useLazyGetPokemonByNameQuery,
  usePrefetch,
} = pokemonApi;
