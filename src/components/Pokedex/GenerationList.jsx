import React from 'react';
import PokemonList from './PokemonList';

const style = {
    textTransform: 'uppercase'
};

const GenerationList  = (props) => {
    const pokemons = props.pokemons[0][props.generationId-1][0].pokemon_species;

    const poke = [...pokemons].reverse(); // we dont want to afect the original. reverse is needed to show pokemons in ascending order (of their id)
    return(
        <div>
            <h2>GENERATION {props.generationId} - {poke.length} pokemon species!</h2>
            <PokemonList pokemons_array={poke} generation_id={props.generationId} styling={style} keyFocus={props.keyFocus}/>
        </div>
    )
}

export default GenerationList;