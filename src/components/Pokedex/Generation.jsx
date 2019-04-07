import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pokeActionTypes } from '../../store/actions/pokeconstants';
import axios from 'axios';
import { createLoadingSelector } from '../../store/api/selectors';
import { Spin } from 'antd';
import GenerationList from './GenerationList';
import Swal from 'sweetalert2';
import history from '../../helpers/history';

class Generation extends Component {

    state = {
      generation_id: this.props.match.params.id,
      isFetching: true
    };

    static getDerivedStateFromProps(props, state) {
      // Store prevId in state so we can compare when props change.
      // Clear out previously-loaded data (so we don't render stale stuff).
      if (!props.loading && (props.match.params.id !== state.prevId)) {
        return {
          generation_id: props.match.params.id,
          prevId: props.match.params.id,
          isFetching: true
        };
      }
      // No state update necessary
      return null;
    } 

    componentDidUpdate(prevProps, prevState) { // Not for initial render
      if (this.props.match.params.id !== prevProps.match.params.id) {
        //console.log("DID UPDATE");
        this.props.getGenerationData(this.props.match.params.id).then(() => {
          //console.log("DID IT!");
          this.setState({
            isFetching: false
          }); 
        });

      }
    }

    componentDidMount() { // Happens after render()
      if ( this.props.match.params.id ) {
        this.setState({
          generation_id: this.props.match.params.id,
          isFetching: true
        }); 
        const generationId = this.state.generation_id;
        this.props.getGenerationData(this.props.match.params.id).then(() => {
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
      //let generation_title = null;
      let generation_table = <div className="loading-div" style={style}><Spin size="large" style={ style } tip="Loading..." /></div>;
      if(this.props.error){
        console.log("ERROR DETECTED");
        generation_table = <div style={style}>This data does not exist or the server is not responding. Please try again.</div>;
        Swal.fire({ // Alert
          title: "Error",
          text: "That resource does not exist or is currently unavailable.",
          type: "warning",
          showCancelButton: false,
          confirmButtonColor: "#DC143C",
          confirmButtonText: "Ok"
        }).then((result) => {
          if (result.value) {
            history.push('/dex/pokemon');
          }
        });
      }else{

        if(!this.props.loading && !this.state.isFetching){
          generation_table = <GenerationList pokemons={this.props.pokemons} generationId={this.state.generation_id} keyFocus={this.props.keyFocus}></GenerationList>;
        }
    }

    return (
        <div>
            { generation_table }
      </div>
    )
  }
}

// Show loading on GET_GENERATIONDATA_REQUEST
const loadingSelector = createLoadingSelector(['GET_GENERATIONDATA']);

const mapStateToProps = (state) => {
    return {
        loading: loadingSelector(state),
        pokemons: [state.pokedexReducer.pokedex],
        error: state.pokedexReducer.pokedex.error
    };
}; 

function getGenerationData(id) {
  return dispatch => {
    dispatch(generationDataRequest());
    return axios.get(`/api/v2/generation/${id}`)
    .then((response) => {
      //const json = response.toJSON();
      return dispatch(generationDataSuccess(response.data));
    }, (error) => {
      console.log("ERROR");
      dispatch(generationDataFailure(error));
    })
  }
}

const generationDataRequest = () => ({
  type: pokeActionTypes.GET_GENERATION
});

const generationDataSuccess = (data) => ({
  type: pokeActionTypes.GET_GENERATION_SUCCESS,
  generationData: data
});

 function generationDataFailure(error) {
  return {
    type: pokeActionTypes.GET_GENERATION_FAILURE,
    error: error
  };
} 

export default connect(mapStateToProps, {getGenerationData})(Generation);
