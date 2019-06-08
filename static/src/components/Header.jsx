import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import UserModal from './UserModal'
import {misc} from '../actions'
import header from '../css/header.css';
import SearchBar from './SearchBar';
import {Navbar, NavbarBrand, NavbarToggler, Container, Row, Col,
    Collapse, Nav, NavItem, NavLink} from 'reactstrap';

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

        const {isAuth, currentRoute} = this.props;

        doLoginNav = isAuth ? <NavLink tag={UserModal}></NavLink> : 
                    currentRoute == '/login' ? 
                    <NavLink tag={Link} to="/login" active style={styles.activeLink}><i class="glyphicon glyphicon-user"></i>Ingresar</NavLink> :
                    <NavLink tag={Link} to="/login"><i class="glyphicon glyphicon-user"></i>Ingresar</NavLink>

        return(
            <header>
                <Navbar light expand="md">
                    <NavbarBrand className="mf-navbar"> 
                        <span id="mf-title">
                        <b>Memoria</b> fotogr&aacute;fica 
                        </span>
                        <span>
                            Facultad de Ciencias Fisicas y Matematicas - Universidad de Chile
                        </span>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggleNav} />
                    <SearchBar />
                    <Collapse isOpen={this.state.toggle} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>{ currentRoute == '/Inicio' ?
                                <NavLink tag={Link} to={"/"} active style={styles.activeLink}>Inicio</NavLink> :
                                <NavLink tag={Link} to={"/"}>Inicio</NavLink>
                            }</NavItem>
                            <NavItem>{ currentRoute == '/gallery/' ? 
                                <NavLink tag={Link} to={"/gallery"} active style={styles.activeLink}>Galer&iacute;a</NavLink> :
                                <NavLink tag={Link} to={"/gallery"}>Galer&iacute;a</NavLink>
                            }</NavItem>
                            <NavItem>{ currentRoute == '/upload' ? 
                            <NavLink tag={Link} to={"/upload"} active style={styles.activeLink}>Participa</NavLink> :
                            <NavLink tag={Link} to={"/upload"}>Participa</NavLink>} </NavItem>
                            <NavItem>{doLoginNav}</NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </header>
        );
    }
}

const styles = {
    activeLink: {
        color: "#ce846b"
    }
}

const mapStateToProps = state => {
    return {
        isAuth : state.auth.isAuthenticated,
        currentRoute: state.misc.currentRoute,
    }
}

export default connect(mapStateToProps)(Header);
