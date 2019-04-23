import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import UserModal from './UserModal'
import header from '../css/header.css';

class Header extends Component{
    render(){
        var doLoginNav;
        if(this.props.isAuth === true){
            doLoginNav = <UserModal />
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
        isAuth : state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(Header);
