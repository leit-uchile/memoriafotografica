import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import header from '../css/header.css';

class Header extends Component{
    render(){
        var doLoginNav;
        if(this.props.auth.isAuthenticated === true){
            doLoginNav = <Link className='nav-link' to={"/dashboard"}>
            <span>{`${this.props.auth.user.id} ${ this.props.auth.user.name? this.props.auth.user.name : "Nombre"}`}</span></Link>
        }else{
            doLoginNav = <Link className='nav-link' to={"/login"}><span>Login</span></Link>
      
        }
        return(
            <header className='header mb-2'>
                <div className='container'>
                    <img src={'/fcfm_header.png'} alt={'logo'}/>
                    <h1>Memoria Fotográfica</h1>
                </div>
                <div className='container'>
                    <ul className='nav justify-content-end'>
                        <li className='nav-item'><Link className='nav-link' to={"/"}>Home</Link></li>
			            <li className='nav-item'><Link className='nav-link' to={"/upload"}><span>Sube tu foto</span></Link></li>
                        <li className='nav-item'>{doLoginNav}</li>
                    </ul>
                </div>
            </header>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth : state.auth
    }
}

export default connect(mapStateToProps)(Header);
