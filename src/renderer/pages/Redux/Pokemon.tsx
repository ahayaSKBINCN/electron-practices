import React from "react";
import { useGetPokemonByNameQuery } from "../../models/pokemon";

const Pokemon = function () {
  const { data, error, isLoading, refetch } = useGetPokemonByNameQuery("butterfree");
  console.log(data)


  return (
    <div className="App">
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>{data.species.name}</h3>
          {/*<img src={data.sprites.front_shiny} alt={data.species.name}/>*/}
          {Object.keys(data.sprites).map((name) => (
              ( typeof data.sprites[name] === "string" ) &&
              <img src={data.sprites[name]} key={data.species.name + name} alt={name}/>
            )
          )}
        </>
      ) : null}
    </div>
  )
}

Pokemon.menu = {
  name: "Pokemon",
  sort: 3,
  icon: "dashboard",
}

export default Pokemon;
