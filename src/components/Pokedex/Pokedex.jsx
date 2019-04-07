import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { generationsRequest, allPokemonRequest, generationDataRequest, getPokemonData } from '../../store/actions/pokeactions';
//import PokemonList from './PokemonList';
import PokemonInfo from './PokemonInfo';

import { createLoadingSelector } from '../../store/api/selectors';

import { List, Avatar, Spin, Input } from 'antd';
const Search = Input.Search;

class Pokedex extends Component {
  state = { 
      showAllPokemon: false,
      flag: false,
      searchedPokemon: null
  }; 

  componentDidMount() {
    console.log("Fetch generations");
    this.setState({
      flag: true
    }); 
    this.props.getGenerations();
  }

  pokemonHandler = () => {
    console.log("Show them all!");
    this.props.getAllPokemon();
    const toggle = !this.state.showAllPokemon
    this.setState({
      showAllPokemon: toggle
    });
  }

  pokemonInfoHandler = (name) => { // Fetchs the pokemon data to display
    this.setState({
      searchedPokemon: name
    }); 
    this.props.getPokemonData(name);
  }

  render() {
    let style = {
      textAlign: 'center'
    };
    const searchStyle = {
      width: "50%",
      marginTop: "10px"
    };
    const styleCard = {
      maxWidth: "50%",
      marginLeft: "25%",
      marginTop: "20px"
    };

    //let showAllContent =  <h2 style={{textAlign: 'center', marginTop: '30px'}}>Show all pokemons from every Generation:</h2>;
    let content = <div className="loading-div" style={style}><Spin size="large" style={ style } tip="Loading..." /></div>;
    if(!this.props.loading && this.state.flag){
      let style = {
        textTransform: 'uppercase'
      };
      /* let pokemons_array = [];
      let buttonText = <div>Show them all!</div>
      if(this.state.showAllPokemon){
        pokemons_array = this.props.allPokemons.results;
        buttonText = <div>Hide them all!</div>
      } */
      content =
        <div>
          <h2 style={{marginTop: '20px', marginBottom: '10px'}}>Find pokemons by Generation:</h2>
          <List
            itemLayout="horizontal"
            dataSource={this.props.generations.results}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={`https://veekun.com/static/pokedex/images/versions/generation-${index+1}.png`} />} // uses images from the web
                  title={
                    <Link to={`/dex/pokemon/search/${index+1}`} onClick={() => this.props.keyFocus("2")} className="btn btn-primary" style = {style}>{item.name}</Link>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      /* showAllContent =
        <div style={{textAlign: 'center'}}>        
          <h2 style={{marginTop: '30px'}}>Show all pokemons from every Generation:</h2>
          <Button style={{marginTop: '10px', marginBottom: '20px'}} onClick={this.pokemonHandler}><strong>{ buttonText }</strong></Button>
          <PokemonList pokemons_array={pokemons_array} generation_id={1} styling={style}/>
        </div>   */
    }
    const pokemonSearchContent = <div style={style}><h2>Find a pokemon by name:</h2>
      <Search style={searchStyle}
        placeholder="Input pokemon name"
        enterButton="Search"
        size="large"
        onSearch={value => this.pokemonInfoHandler(value)}
      />
    </div>
    let pokemonCard = null
    if(!this.props.loading){
      pokemonCard = 
      <List 
        grid={{
        gutter: 1, xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1,
        }}
        dataSource={["1"]}
        renderItem={item => (
        <List.Item style={styleCard}>
          <PokemonInfo loading={this.props.loading} data={this.props.pokemons[this.state.searchedPokemon]}></PokemonInfo>
        </List.Item>
        )}
      />
    window.sprites(); // to update the pokemon sprites
    }
    
    return (
      <div>
        { content }
        { pokemonSearchContent }
        { pokemonCard }
        {/* showAllContent */}
      </div>
    )
  }
}

// Show loading on GET_GENERATIONS_REQUEST, GET_GENERATIONDATA_REQUEST and GET_POKEMONDATA_REQUEST
const loadingSelector = createLoadingSelector(['GET_GENERATIONS', 'GET_GENERATIONDATA', 'GET_POKEMONDATA']);

const mapStateToProps = state => {
    return {
        //loading: state.render.isFetching,
        loading: loadingSelector(state),
        generations: state.pokedexReducer.pokedex.generations,
        allPokemons: state.pokedexReducer.pokedex.allPokemon,
        pokemons: state.pokedexReducer.pokemon,
        error: state.pokedexReducer.pokedex.error
    };
}; 

const mapDispatchToProps = dispatch => {
    return {
        getPokemonData: (name) => {dispatch(getPokemonData(name))},
        getGenerations: () => {dispatch(generationsRequest())},
        getAllPokemon: () => {dispatch(allPokemonRequest())},
        getGenerationData: (id) => {dispatch(generationDataRequest(id))}
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pokedex);