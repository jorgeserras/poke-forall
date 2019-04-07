import { pokeActionTypes } from '../actions/pokeconstants';

const initialState = { error: null };

const pokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case pokeActionTypes.GET_POKEMON:
    //console.log("GET_POKEMON_REQUEST");
    return {
      ...state,
      error: null
    };
  case pokeActionTypes.GET_POKEMON_SUCCESS:
    //console.log("GET_POKEMON_SUCCESS");
    const pokemonData = action.pokemonData;
    const pokemonName = action.pokemonData.name;
    return {
      ...state,
      [pokemonName]: pokemonData,
      error: null
    };
  case pokeActionTypes.GET_POKEMON_FAILURE:
    //console.log("GET_POKEMON_FAILURE");
    return {
      ...state,
      error: action.error.response.data.message
    };
    default:
      return state;
  }
};

export default pokemonReducer;


