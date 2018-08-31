import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import header from '../css/header.css';

class Header extends Component{

    constructor(){
        super();
    }

    render(){

        return(
            <header className='header'>
                <div>
                    <img style={{width: '100px', height: 'auto', float: 'left'}} src={'/fcfm_header.png'} alt={'logo'}/>
                    <h1 style={{fontSize:'20px',position:'relative', top:'18px', left:'10px'}}>Memoria Fotográfica</h1>
                </div>
                <div className='header-menu'>
                    <ul>
                        <il><Link to={"/"}>Home</Link></il>
                        <il><Link to={"/app"}>Testing App</Link></il>
                        <li><Link to={"/login"}>Login</Link></li>
                    </ul>
                </div>
            </header>
        );
    }

}

export default Header;