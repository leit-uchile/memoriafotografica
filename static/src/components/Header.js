import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Header extends Component{

    constructor(){
        super();
    }

    render(){
        return(
            <header>
                <h1>Header</h1>
                <Link to={"/"}>Home</Link>
                <Link to={"/app"}>Testing App</Link>
                <Link to={"/login"}>Login</Link>
            </header>
        );
    }

}

export default Header;