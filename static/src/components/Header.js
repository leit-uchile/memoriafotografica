import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import header from '../css/header.css';

class Header extends Component{
    render(){
        var doLoginNav;
        if(this.props.auth.isAuthenticated === true){
            doLoginNav = <Link className='nav-link' to={"/dashboard"}><span>{this.props.auth.user.id}</span></Link>
        }else{
            doLoginNav = <Link className='nav-link' to={"/login"}><span>Login</span></Link>
      
        }
        return(
            <header className='container-fluid'>
                <div>
                    <nav className='navbar navbar-dark bg-dark navbar-expand-md fixed-top'>
                        <a href='/'className='navbar-brand'>
                            <img src={'/fcfm_header.png'} alt={'logo'} style={{height: '85px'}}/>
                        </a>
                        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbar-content' aria-controls='navbar-content' aria-expanded='false' aria-label='Toggle navigation'>
                            <span className='navbar-toggler-icon'></span>
                        </button>
                        <div className='collapse navbar-collapse' id='navbar-content'>
                        
                            <ul className='navbar-nav ml-auto'>
                                <li className='nav-item'><Link className='nav-link' to={"/"}>Home</Link></li>
                                <li className='nav-item'><Link className='nav-link' to={"/upload"}><span>Sube tu foto</span></Link></li>
                                <li className='nav-item'>{doLoginNav}</li>
                            </ul>
                        </div>
                    </nav>
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
