import axios from 'axios';
import { pokeActionTypes } from './pokeconstants';

export const generationsRequest = () => {
    return dispatch => {
      dispatch(requestGenerations()); // For the loading
      axios.get(`/api/v2/generations/`)
        .then(res => {
          dispatch(generationsSuccess(res.data));
          return res;
        })
        .catch(err => {
          return err;
        });
    };
};

export const generationDataRequest = (id) => {
  return dispatch => {
    dispatch(generationRequest()); // For the loading
    axios.get(`/api/v2/generation/${id}`)
      .then(res => {
        dispatch(generationDataSuccess(res.data));
        return res;
      })
      .catch(err => {
        return err;
      });
  };
};

export const allPokemonRequest = () => {
  return dispatch => {
    axios.get(`/api/v2//pokemons`)
      .then(res => {
        dispatch(getAllPokemonDataSuccess(res.data));
        return res;
      })
      .catch(err => {
        //dispatch(failureFetch());
        return err;
      });
  };
};

const requestGenerations = () => ({
  type: pokeActionTypes.GETALL_GENERATIONS
});

const generationsSuccess = (data) => ({
  type: pokeActionTypes.GETALL_GENERATIONS_SUCCESS,
  generations: data
});

const generationRequest = () => ({
  type: pokeActionTypes.GET_GENERATION
});

const generationDataSuccess = (data) => ({
  type: pokeActionTypes.GET_GENERATION_SUCCESS,
  generationData: data
});

const getAllPokemonDataSuccess = (data) => ({
  type: pokeActionTypes.GETALL_POKEMON,
  allPokemonData: data
});

export function getSpeciesData(name) {
  return dispatch => {
    dispatch(speciesDataRequest());
    return axios.get(`/api/v2/pokemon_species/${name}`)
    .then((response) => {

      const species_data = response.data;
      const evolution_url = species_data.evolution_chain.url;

      const numbers = evolution_url.match(/\d+/g).map(Number); // retrieves numbers from the url
      const number = numbers[1];// first number is always 2 because of the v2 in the url, the second number is the id for the evolution chain

      return axios.get(`/api/v2/evolution_chain/${number}`)
      .then((evolution_response) => {

        return dispatch(speciesDataSuccess(species_data,evolution_response.data));

      }, (error) => dispatch(speciesDataFailure(error)))

      //return dispatch(speciesDataSuccess(response.data));
    }, (error) => dispatch(speciesDataFailure(error)))
  }
}

const speciesDataRequest = () => ({
  type: pokeActionTypes.GET_SPECIES
});

const speciesDataSuccess = (species_data, evolution_data) => ({
  type: pokeActionTypes.GET_SPECIES_SUCCESS,
  speciesData: species_data,
  evolutionData: evolution_data
});

const speciesDataFailure = (error) => ({
  type: pokeActionTypes.GET_SPECIES_FAILURE,
  error: error
});

export function getPokemonData(name) {
  return dispatch => {
    dispatch(pokemonDataRequest());
    return axios.get(`/api/v2/pokemon/${name}`)
    .then((response) => {
      return dispatch(pokemonDataSuccess(response.data));
    }, (error) => dispatch(pokemonDataFailure(error)))
  }
}

const pokemonDataRequest = () => ({
  type: pokeActionTypes.GET_POKEMON
});

const pokemonDataSuccess = (pokemon_data) => ({
  type: pokeActionTypes.GET_POKEMON_SUCCESS,
  pokemonData: pokemon_data,
});

const pokemonDataFailure = (error) => ({
    type: pokeActionTypes.GET_POKEMON_FAILURE,
    error: error
});