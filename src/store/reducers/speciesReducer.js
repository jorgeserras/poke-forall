import { pokeActionTypes } from '../actions/pokeconstants';

const initialState = { error: null };

const speciesReducer = (state = initialState, action) => {
  switch (action.type) {
    case pokeActionTypes.GET_SPECIES:
      //console.log("GET_SPECIES_REQUEST");
      return {
        ...state,
        error: null
    };
    case pokeActionTypes.GET_SPECIES_SUCCESS:
      //console.log("GET_SPECIES_SUCCESS");
      const speciesName = action.speciesData.name;
      return {
        ...state,
        [speciesName]: {
            species: action.speciesData,
            evolution: action.evolutionData
        },
        error: null
      };
    case pokeActionTypes.GET_SPECIES_FAILURE:
      //console.log("GET_SPECIES_FAILURE");
      return {
        ...state,
        error: action.error.response.data.message
      };
    default:
      return state;
  }
};

export default speciesReducer;