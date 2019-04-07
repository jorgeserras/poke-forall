import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Tabs, Icon } from 'antd';
import Pokedex from './Pokedex';
import Generation from './Generation';
import PokemonSpecies from './PokemonSpecies';
import Banner from '../Banner';

const TabPane = Tabs.TabPane;

const operations = <div>Navigate through each tab to find your pokemons</div>;

export default class PokeTabs extends Component {

    state = {
        focus_key: "3"
    }
    static getDerivedStateFromProps(props, state) { // Happens before render()
        /* The code below allows the interface to focus on the appropriate tab */
        if(props.location.pathname !== state.prevPath){
            const pathname = props.location.pathname;
            let focus_key = "3";
            let generation_id = pathname.match(/\d+/g); // retrieves numbers from the url
            if(generation_id){
                generation_id = generation_id.map(Number)[0]; // first number
            }
            switch(pathname){
                case `/dex/pokemon/search/${generation_id}/`:
                case `/dex/pokemon/search/${generation_id}`:
                    focus_key = "2";
                    break
                case "/dex/pokemon":
                    focus_key = "1";
                    break
                default:
                    break
            }
            console.log(focus_key);
            return{
                focus_key: focus_key,
                prevPath: props.location.pathname,
            };
        }
        return null
    }

    onChange = (focus_key) => {
        this.setState({
            focus_key: focus_key
        });
    }

    getFocus = (key) => {
        this.setState({
            focus_key: key
        });
    }

  render() {
    return (
        <div>
            <Banner />
            <Tabs onChange={this.onChange} activeKey={this.state.focus_key} tabBarExtraContent={operations}>
                <TabPane tab={<span><Icon type="ordered-list" />Generations</span>} key="1">
                    <Route path="/dex/pokemon" render={(props) => <Pokedex {...props} keyFocus={this.getFocus}/>} />
                </TabPane>
                <TabPane tab={<span><Icon type="sort-ascending" />Generation Pokemons</span>} disabled={false} key="2">
                    <Route path="/dex/pokemon/search/:id" render={(props) => <Generation {...props} keyFocus={this.getFocus}/>} />
                </TabPane>
                <TabPane tab={<span><Icon type="file-search" />Pokemon Species</span>} disabled={false} key="3">
                    <Route path="/dex/pokemon/search/:id/:name" render={(props) => <PokemonSpecies {...props} keyFocus={this.getFocus}/>} />
                </TabPane>
            </Tabs>
        </div>
    )
  }
}
