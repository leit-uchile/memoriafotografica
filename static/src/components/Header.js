import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';


class Header extends Component{
    render(){
        var doLoginNav;
        if(this.props.auth.isAuthenticated === true){
            doLoginNav = <Link className="nav-item" to={"/dashboard"}><span className="nav-link">{this.props.auth.user.id}</span></Link>
        }else{
            doLoginNav = <Link className="nav-item" to={"/login"}><span className="nav-link">Login</span></Link>
        }
        return(
            <header>
                <nav className="nav nav-pills ">
                    <Link className="nav-item" to={"/"}> <span className="nav-link">Memoria Fotografica</span> </Link>
                    {doLoginNav}
                </nav>
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