import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSpeciesData } from '../../store/actions/pokeactions';
import { createLoadingSelector } from '../../store/api/selectors';
import SpeciesInfo from './SpeciesInfo';
import { Spin } from 'antd';


class PokemonSpecies extends Component {

  state = {
    species_name: this.props.match.params.name,// name (the identification)
    isFetching: true
  };

  static getDerivedStateFromProps(props, state) {
    // Store prevId in state so we can compare when props change.
    // Clear out previously-loaded data (so we don't render stale stuff).
    if (!props.loading && (props.match.params.name !== state.prevName)) {
      return {
        prevName: props.match.params.name,
        isFetching: true
      };
    }
    // No state update necessary
    return null;
  }

  componentDidUpdate(prevProps, prevState) { // not for initial render
    if (this.props.match.params.name !== prevProps.match.params.name) {
      this.setState({ 
        species_name: this.props.match.params.name,
        isFetching: true
      }); 
      const speciesName = this.props.match.params.name;
      this.props.getSpeciesData(speciesName).then(() => {
        this.setState({ 
          isFetching: false
        }); 
      });

    }
  }
  
  componentDidMount() { // Happens after render()
    if ( this.props.match.params.name ) {
      this.setState({ 
        species_name: this.props.match.params.name,
        isFetching: true
      });
      const speciesName = this.props.match.params.name;
      console.log("Fetch species data (componentDidMount) ", speciesName);
      this.props.getSpeciesData(speciesName).then(() => {
        //console.log("DID IT SPECIES!");
        this.setState({ 
          isFetching: false
        }); 
      });

    }
  }

  render() {
    let style = {
      textAlign: 'center'
    };
    let species_table = <div className="loading-div" style={style}><Spin size="large" style={ style } tip="Loading..." /></div>;
    if(this.props.error){
      console.log("ERROR");
      species_table = <div style={style}>This data does not exist or the server is not responding. Please try again.</div>;
    }else{
      if(!this.props.loading && !this.state.isFetching){ 
        species_table = <SpeciesInfo species={this.props.species} species_name={this.state.species_name} ></SpeciesInfo>;
      }
    }
    return (
      <div>
        { species_table }
      </div>
    )
  }
}

// Show loading on GET_SPECIESDATA_REQUEST
const loadingSelector = createLoadingSelector(['GET_SPECIESDATA']);

const mapStateToProps = (state) => {
    return {
        loading: loadingSelector(state),
        species: state.pokedexReducer.species,
        error: state.pokedexReducer.species.error
    };
}; 



export default connect(mapStateToProps, {getSpeciesData})(PokemonSpecies);
