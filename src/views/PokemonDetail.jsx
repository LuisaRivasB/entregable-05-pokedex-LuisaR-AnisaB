import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import '../index.css';

const getPokemonById = async (id) => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const PokemonDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const pokemon = await getPokemonById(id);
      setPokemon(pokemon);
      console.log(pokemon);
    };
    if (state.pokemon) loadData();
    else setPokemon(state.pokemon);
  }, []);

  return (
    <section className="container_details">
      <div className="details-container">
      {pokemon && (
        <>
          <h1 className="name text-4xl font-bold text-center">{pokemon.name}</h1>
          <div className="flex flex-row justify-center">
            <img className='img_detail'
              src={pokemon?.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
            />
          </div>
        </>
      )}
      <p className='description-1'>The id of the selected pokemon is: {id}</p>
    </div>
    </section>
  );
};

export default PokemonDetail;
