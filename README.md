# PokeForAll

This repository possess the Front-End part of an application which displays pokemons fetched from an API. The server caches data from https://pokeapi.co/ and information regarding users registered in the application. The Back-End Node server uses MongoDB.

## Usage

- Register a new account (needed to explore the pokedex) by pressing the "Register" button in the Navbar.

- After signing in, the user can click on "User Page" where he can delete the account or logout by pressing "Sign Out".

## Features

- Pokedex user flow without refreshing! When exploring the tab system to find each pokemon, all components render automatically when needed, adapting to the user's actions.

- Developed using [ReactJs](https://reactjs.org/) and [Redux](https://redux.js.org/).

- Responsive web design using [Ant Design](https://ant.design/).

- Back-End caching with authentication built using NodeJs and MongoDB. Any pokedex request to the server requires a valid JWT.

- Front-End local storage cache with [Redux-Persist](https://github.com/rt2zz/redux-persist). Data is cleared when the user revisits or refreshes the application when remaining atleast 10 minutes in the app. This value can be changed.

## NOTICE



## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The Back-End server url can be changed.
