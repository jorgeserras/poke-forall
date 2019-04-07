import React from 'react';

const style = {
    textAlign: 'center'
};

const NoMatchPage = ({location}) => (
    <div style={style}>
        <h2>Looks like we didn't catch them all :(</h2>
        <h3>Error 404: No match for <strong>{location.pathname}</strong></h3>
    </div>
);

export default NoMatchPage;