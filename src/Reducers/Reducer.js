const initialState = {
    loading: true,
    pokemons: [],
    errorMessage: null
};

const reducer = (state, action) => {

    switch (action.type) {
      case "BUSCAR_POKEMONES_SUCCESS":
        return {
          ...state,
          loading: false,
          pokemons: action.payload
        };
      case "BUSCAR_POKEMONES_FAILURE":
        return {
          ...state,
          loading: false,
          errorMessage: action.error
        };
      default:
        return state;
    }
};

  export {reducer, initialState};