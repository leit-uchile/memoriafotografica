import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import UserModal from './UserModal'
import header from '../css/header.css';
import {Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink} from 'reactstrap';

class Header extends Component{
    constructor(props){
        super(props)
        this.state = {
            toggle: false
        }
        this.toggleNav = this.toggleNav.bind(this)
    }

    toggleNav(){
        this.setState({toggle: !this.state.toggle})
    }

    render(){
        var doLoginNav;
        if(this.props.isAuth === true){
            doLoginNav = <NavLink tag={UserModal}></NavLink>
        }else{
            doLoginNav = <NavLink tag={Link} to="/login"><i class="glyphicon glyphicon-user"></i>Ingresar</NavLink>
        }
        return(
            <header>
                <Navbar color="light" light expand="md">
                    <NavbarBrand className="mf-navbar"> 
                        <span id="mf-title">
                        <b>Memoria</b> fotogr&aacute;fica 
                        </span>
                        <span>
                            Facultad de Ciencias Fisicas y Matematicas - Universidad de Chile
                        </span>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggleNav} />
                    <Collapse isOpen={this.state.toggle} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem><NavLink tag={Link} to={"/"}>Inicio</NavLink></NavItem>
                            <NavItem><NavLink tag={Link} to={"/gallery"}>Galer&iacute;a</NavLink></NavItem>
                            <NavItem><NavLink tag={Link} to={"/upload"}>Participa</NavLink></NavItem>
                            <NavItem>{doLoginNav}</NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>{/* 
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
                </div> */}
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
