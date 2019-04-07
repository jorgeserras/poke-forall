import { pokeActionTypes } from '../actions/pokeconstants';

const initialState = { error: null };

const pokedex = (state = initialState, action) => {
  switch (action.type) {
    case pokeActionTypes.GETALL_GENERATIONS:
      //console.log("GETALL_GENERATIONS_REQUEST");
      return {
        ...state
    };
    case pokeActionTypes.GETALL_GENERATIONS_SUCCESS:
      //console.log("GETALL_GENERATIONS_SUCCESS");
      return {
        ...state,
        generations: action.generations,
        error: null
      };
    case pokeActionTypes.GET_GENERATION:
      //console.log("GET_GENERATION_REQUEST");
      return {
        ...state,
        error: null
      };
    case pokeActionTypes.GET_GENERATION_SUCCESS:
      //console.log("GET_GENERATION_DATA_SUCCESS");
      const data = [action.generationData];
      const name = action.generationData.id-1;
      return {
        ...state,
        [name]: data,
        error: null
      };
    case pokeActionTypes.GET_GENERATION_FAILURE:
      //console.log("GET_GENERATION_FAILURE");
      //history.push('/dex/pokemon');
      return {
        ...state,
        error: action.error.response.data.message
      };
    case pokeActionTypes.GETALL_POKEMON:
      //console.log("GETALL_POKEMON");
      const alldata = action.allPokemonData;
      return {
        ...state,
        allPokemon: alldata
      };
    case pokeActionTypes.GETALL_POKEMON_SPECIES:
      //console.log("GETALL_POKEMON_SPECIES");
      return {
        ...state
      };
    default:
      return state;
  }
};

export default pokedex;