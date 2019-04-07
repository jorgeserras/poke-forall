import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authentication from './authentication';
import registration from './registration';
import users  from './users';
import pokedex from './pokedex';
import loading from './loadingReducer';
import species from './speciesReducer';
import pokemon from './pokemonReducer';

import { composeWithDevTools } from 'redux-devtools-extension';

const pokedexReducer = combineReducers({
  pokedex,
  species,
  pokemon
});

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  pokedexReducer,
  loading
});


const persistConfig = {
  key: 'root',
  storage: storage,
  /* new CookieStorage(Cookies, {
    expiration: {
      'default': 30 * 86400 // Cookies expire after 30 days
    }
  }),
  stateReconciler(inboundState, originalState) {
    // Ignore state from cookies, only use preloadedState from window object
    return originalState
  }, */
  blacklist: ['loading', 'authentication'] // will not be persisted (temporary)
}; 

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));
const persistor = persistStore(store);


const timestamp = JSON.parse(localStorage.getItem('timestamp'));
if(timestamp){
  if((Math.floor(Date.now() / 1000) - timestamp) > 640){ // If 10 minutes elapsed, clear local storage (user must refresh or visit the page)
    localStorage.clear();
  }
}

localStorage.setItem('timestamp', JSON.stringify(Math.floor(Date.now() / 1000)));

export { store, persistor };