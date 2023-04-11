import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import { UserContext } from '../contexts/UserContext';
import PokemonCard from '../components/PokemonCard';
import { usePagination } from '../hooks/usePage';
import { Form } from 'react-router-dom';
import '../index.css';

const Pokedex = () => {
  const { user } = useContext(UserContext);
  const { pokemons, types, name, type } = useLoaderData();
  const [pokemonName, setPokemonName] = useState(name ?? '');
  const [pokemonType, setPokemonType] = useState(type ?? '');
  const pokemonsPagination = usePagination(pokemons, 55);

  const handleNameChange = (e) => {
    setPokemonName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setPokemonType(e.target.value);
  };

  useEffect(() => {
    setPokemonName(name ?? '');
  }, [name]);

  useEffect(() => {
    setPokemonType(type ?? '');
  }, [type]);

  return (
    <div className="pokedex-container w-full p-5 bg-gradient-to-r from-black via-red-900 to-red-700">
      <p className='text-gray-300'>
        <span className="title-welcome text-red-500 font-semibold">Welcome {user}</span>
        here you can find your favorite pokemon.
      </p>
      <div className="paginacion text-gray-200 bg-black flex flex-row gap-4">
        {pokemonsPagination.pages.map((page) => (
          <button
            key={page}
            onClick={() => pokemonsPagination.changePageTo(page)}
            className={pokemonsPagination.currentPage === page ? 'text-red-500 rounded rounded-lg' : ''}
          >
            {page}
          </button>
        ))}
      </div>
      <div>
        <Form className='filter-buton'>
          <h3 className="title-filter text-red-500">Filter for search</h3>
          <div className="buton-container flex flex-row justify-between">
            <div className="flex flex-row gap-3">
              <input
                type="text"
                name="pokemon_name"
                className="filter"
                value={pokemonName}
                onChange={handleNameChange}
              />
              <select className="selector" name="pokemon_type" value={pokemonType} onChange={handleTypeChange}>
                <option value="">All</option>
                {types.map((type) => (
                  <option key={type.url} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <button className="selector-buton p-2"type="submit"> Search

            </button>
          </div>
        </Form>
      </div>
      <section className="detail-pagination">
        <div className="">
          {pokemonsPagination.listSlice.length ? (
            pokemonsPagination.listSlice.map((pokemon) => (
              <PokemonCard key={pokemon.url} pokemonData={pokemon} />
            ))
          ) : (
            <p>
              There are no pokemon of this type "{pokemonType}" and with the name "{pokemonName}".
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Pokedex;
