import React, { Component } from 'react';

class NoMatch extends Component{

    constructor(){
        super();
    }

    render(){
        return(
            <div style={{marginTop: '10%'}}>
                <h1>404 - Not Found</h1>
            </div>            
        );
    }

}

export default NoMatch;