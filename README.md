# PokeForAll

This repository possess the Front-End part of an application which displays pokemons fetched from an API. The server caches data from https://pokeapi.co/ and information regarding users registered in the application. The Back-End Node server uses MongoDB.

To make sure users do not miss on any features, please canosider following the **Usage** section below.

## Usage

1. Visit: [PokeForAll](https://poke-forall.herokuapp.com/)

2. After checking the Home Page, press "Register" in the Navbar. Authentication is required to access the Pokedex.

3. Go the login page and sign in. The user is redirected to the Pokedex system and can now perform any action in the application.

4. In the first tab, the user can click on a Generation, loading all pokemons of that generation in the second tab. The user can always press the previous tab without the need to refresh the page. Additionally, pokemons can be searched manually by their name in the first tab.

5. Now, revisit the second tab. You can press a pokemon which will load the third and final tab. The latter possesses information about the pokemon species selected.

6. In the end of the tab, there is a number of cards which are not loaded. Depending on the selected pokemon species, the number varies. These correspond to the several evolution stages ordered. **Now, press a card to reveal the pokemon and its details.**

7. Its worth noting that the interaction with the suer flow adapts the browser's url, which determines what is rendered in each tab without refreshes.

8. After exploring the interface, you can visit the "User Page" button in the Navbar where you can delete the account if wanted. Users can also logout by pressing "Sign Out" in the Navbar.

9. Please read the **NOTICE** section in the current markdown.

## Features

- Pokedex user flow without refreshing! When exploring the tab system to find each pokemon, all components render automatically when needed, adapting to the user's actions.

- Developed using [ReactJs](https://reactjs.org/) and [Redux](https://redux.js.org/).

- Responsive web design using [Ant Design](https://ant.design/).

- Back-End caching with authentication built using NodeJs and MongoDB. Any pokedex request to the server requires a valid JWT.

- Front-End local storage cache with [Redux-Persist](https://github.com/rt2zz/redux-persist). Data is cleared when the user revisits or refreshes the application when remaining atleast 10 minutes in the app. This value can be changed.

## NOTICE

Data is retrieved from a server when visiting each page and cached in the browser's local storage. After 10 minutes since the application has been visited, the user is advised to refresh or revisit the app. An automatic storage clear is performed. Users can also clear the local storage manually. 

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The Back-End server url can be changed.
