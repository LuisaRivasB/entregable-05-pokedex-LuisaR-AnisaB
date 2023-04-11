import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import '../index.css';

const getPokemonById = async (url) => {
  try {
    const res = await axios.get(url);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const PokemonCard = ({ pokemonData }) => {
  const [pokemon, setPokemon] = useState(null);
  const navigate = useNavigate();

  const handleClickNavigate = () => {
    navigate(`/pokedex/${pokemon.id}`, { state: { pokemon } });
  };

  useEffect(() => {
    const loadPokemon = async () => {
      const pokemonInfo = await getPokemonById(pokemonData.url);

      setPokemon(pokemonInfo);
    };

    loadPokemon();
  }, []);

  return (
    <>
      {pokemon && (
        <article onClick={handleClickNavigate} className="cars-container p-2 border rounded rounded-lg shadow-lg  hover:cursor-pointer">
          <div clasName="cars">
            <header>
              <div style={{ width: 150 }}>
                <img className='img-tipos p-1 ' src={pokemon.sprites.front_default} alt={pokemon.name} />
              </div>
            </header>
            <section className='clases p-2 border rounded rounded-lg shadow-lg bg-gradient-to-r from-white to-yellow-200'>
              <section>
                <h2 className="clasification text-2xl font-semibold">{pokemon.name}</h2>
                <div className="guys" >
                  <p className='guys-1'> Tipo</p>
                  <p  className='guys-2'>{pokemon.types[0].type.name}</p>
                </div>
              </section>;
              <section className='detail'>
                {pokemon.stats.map((stat) => (
                  <section className="characteristics-container" key={stat.stat.name}>
                    <h3 className="characteristics">{stat.stat.name.toUpperCase()}</h3>
                    <p className='description'>{stat.base_stat}</p>
                  </section>
                ))}
              </section>
            </section>
          </div>
        </article>
      )}
    </>
  );
}

export default PokemonCard;
