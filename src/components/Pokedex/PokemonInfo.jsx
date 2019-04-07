import React from 'react';
import { Avatar } from 'antd';
import { List, Card, Tag } from 'antd';

const { Meta } = Card;

const style = {
  textTransform: 'capitalize'
};

const stylePokeCard = {
  textAlign: 'center'
};

  const abilityList = (data, topText) => {
    return <List
                size="small"
                //bordered
                header={<div>{topText}</div>}
                dataSource={data}
                renderItem={(item, index) => (<List.Item>{index+1}: {item.ability.name}</List.Item>)}
            />
           
  }

  const typeTag = (type) => {
    switch (type) {
      case "fairy":
        return <Tag color="magenta">{type}</Tag>
      case "dragon":
      case "fire":
        return <Tag color="volcano">{type}</Tag>
      case "grass":
      case "bug":
        return <Tag color="green">{type}</Tag>
      case "water":
      case "ice":
      case "flying":
        return <Tag color="blue">{type}</Tag>
      case "psychic":
      case "shadow":
      case "poison":
        return <Tag color="purple">{type}</Tag>
      case "rock":
      case "steel":
      case "ghost":
      case "dark":
      case "ground":
        return <Tag color="grey">{type}</Tag>
      default:
        return <Tag color="gold">{type}</Tag>
    }
  }

  const typeList = (data, topText) => {
    return <List
                size="small"
                header={<div>{topText}</div>}
                dataSource={data}
                renderItem={(item) => (typeTag(item.type.name))}
            />
           
  }

const PokemonInfo  = (props) => {
    const pokeData = props.data;
    //console.log("INSIDE PokemonInfo: ", pokeData);

    let pokeAvatar = null;
    let content = null;
    if(typeof pokeData != "undefined"){
      pokeAvatar = pokeData.sprites.front_default; // avatar image

      const abilities = abilityList(pokeData.abilities,"Abilities:"); 
      const types = typeList(pokeData.types, "Types:");


      content = <div>
                  <div style={stylePokeCard}>
                    #{pokeData.id}<br/>
                    Base exp: {pokeData.base_experience}<br/>
                    Height: {pokeData.height}<br/>
                    Weight: {pokeData.weight}<br/>
                  </div>
                  <div style={style}>
                    {abilities}
                    {types}
                  </div>
                </div>
    }
    return(
      <Card loading={props.loading}>
        <Meta
          avatar={<Avatar size={80} src={pokeAvatar} />}
          description = {content}
        />
      </Card>
    )
}


export default PokemonInfo;