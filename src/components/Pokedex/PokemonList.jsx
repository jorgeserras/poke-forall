import React, {Component} from 'react';
import { List, Card } from 'antd';
import { Link } from 'react-router-dom';

const style = {
    textAlign: 'center'
}

export default class PokemonList extends Component {

    componentDidMount() { // Happens after render()
        window.sprites(); // to update the pokemon sprites
    }
    render() {
      return (
        <List
            grid={{
                gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4,
            }}
            dataSource={this.props.pokemons_array}
            renderItem={(item, index) => (
            <List.Item>
                <Card style={style}>
                    <div className={`pkspr pkmn-${item.name}`}/>
                    <Link to={`/dex/pokemon/search/${this.props.generation_id}/${item.name}`} className="btn btn-primary" style = {this.props.styling}>{item.name}</Link>
                </Card>
            </List.Item>
            )}
        />
      )}
};
