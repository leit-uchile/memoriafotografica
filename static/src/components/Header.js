import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import header from '../css/header.css';

class Header extends Component{
    render(){
        var doLoginNav;
        if(this.props.auth.isAuthenticated === true){
            doLoginNav = <Link className="nav-item" to={"/dashboard"}><span className="nav-link">{this.props.auth.user.id}</span></Link>
        }else{
            doLoginNav = <Link className="nav-item" to={"/login"}><span className="nav-link">Login</span></Link>
      
        }
        return(
            <header className='header'>
                <div>
                    <img style={{width: '100px', height: 'auto', float: 'left'}} src={'/fcfm_header.png'} alt={'logo'}/>
                    <h1 style={{fontSize:'20px',position:'relative', top:'18px', left:'10px'}}>Memoria Fotográfica</h1>
                </div>
                <div className='header-menu'>
                    <ul>
                        <il><Link to={"/"}>Home</Link></il>
			<il><Link className="nav-item" to={"/upload"}> <span className="nav-link">Sube tu foto</span></Link></il>
                        <il>{doLoginNav}</il>
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
