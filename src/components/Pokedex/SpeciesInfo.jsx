import React, { Component } from 'react';
import PokemonInfo from './PokemonInfo';
import { List, Card } from 'antd';
import { connect } from 'react-redux';

import { createLoadingSelector } from '../../store/api/selectors';
import { getPokemonData } from '../../store/actions/pokeactions';

const style = {
    textTransform: 'capitalize'
};

const list = (data, topText) => {
    return <List
                size="small"
                //bordered
                header={<div>{topText}</div>}
                dataSource={data}
                renderItem={(item, index) => (<List.Item>{index+1}: {item.name}</List.Item>)}
            />
           
}

class SpeciesInfo extends Component {

    state = {
        isFetching: true
    }

    pokemonHandler = (name) => { // Fetchs the pokemon data to display
        //console.log("Fetch pokemon data (pokemonHandler) ", name);
        this.setState({
            isFetching: true
        }); 
        this.props.getPokemonData(name).then(() => {
            //console.log("DID IT POKEMON!");
            this.setState({ 
                isFetching: false
            }); 
        });
    }

    retrievePokeNames = (evolutionData) => {
        let data = evolutionData.chain;
        let names = [];
        names.push(data.species.name)
        while(true) {
            if(data.evolves_to.length !== 0){ // something there
                names.push(data.evolves_to[0].species.name)
            }else{
                break
            }
            data = data.evolves_to[0];
        }
        return names;
    }
    
    render() {

        const name = this.props.species_name; 
        const speciesData = this.props.species[name].species; // Species Data
        const evolutionData = this.props.species[name].evolution; // Evolution Data
        let gender_differences = null;
        speciesData.has_gender_differences ? gender_differences = <div>Has gender differences!</div> : gender_differences = <div>Does not have gender differences!</div>
        const generation_name = <div style={style}>{speciesData.generation.name}</div>
        const shape = <div style={style}>{speciesData.shape.name}</div>
        const egg_groups = list(speciesData.egg_groups,"Egg groups:"); 
        const pokeNames = this.retrievePokeNames(evolutionData);
        let habitat = "No info :("; // For Generations IV and above pokeapi.co does not have info about pokemons habitat (they should fix this)
        if(speciesData.habitat){
            habitat = speciesData.habitat.name;
        }
        const speciesDataCards = [
            {
                title: 'General Info',
                content: <div>
                {generation_name}<br/>
                Base happiness: {speciesData.base_happiness}<br/>
                Capture rate: {speciesData.capture_rate}<br/>
                Habitat: {habitat}<br/>
                {gender_differences}</div>
            },
            {
            title: 'Shape',
            content: shape
            },
            {
            title: 'Growth',
            content: <div>Growth rate: {speciesData.growth_rate.name}{egg_groups}<br/>
            Hatch counter: {speciesData.hatch_counter}</div>
            }
        ];

            return(
                <div>
                    <h2 style={style}>Species {speciesData.name} #{speciesData.id}</h2>
                    <List
                        grid={{
                        gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 3,
                        }}
                        dataSource={speciesDataCards}
                        renderItem={item => (
                        <List.Item>
                            <Card title={item.title}>{item.content}</Card>
                        </List.Item>
                        )}
                    />
                    <h2 style={style}> Evolution Chain ({speciesData.name})</h2>
                    <h4 style={{marginTop: '10px', marginBottom: '20px'}}>Click on the cards below to uncover each evolution stage!</h4>
                    <List
                        grid={{
                        gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 3,
                        }}
                        dataSource={pokeNames}
                        renderItem={item => (
                        <List.Item>
                            <h2 style={style}>{item}</h2>
                            <div onClick={() => this.pokemonHandler(item)}>
                                <PokemonInfo loading={this.props.loading} data={this.props.evolution_pokemons[item]}></PokemonInfo>
                            </div>
                        </List.Item>
                        )}
                    />
                </div>
            )
        }
}
// Show loading on GET_POKEMONDATA_REQUEST
const loadingSelector = createLoadingSelector(['GET_POKEMONDATA']);

const mapStateToProps = (state) => {
    return {
        loading: loadingSelector(state),
        evolution_pokemons: state.pokedexReducer.pokemon
    };
}; 

export default connect(mapStateToProps, {getPokemonData})(SpeciesInfo);