import React, { useState, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import UserModal from "./UserModal";
import { misc } from "../actions";
import "../css/header.css";
import SearchBar from "./SearchBar";
import {
  Navbar,
  NavbarToggler,
  Container,
  Col,
  Collapse,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

const Header = ({ isAuth, currentRoute }) => {
  const [toggle, setToggle] = useState(false);

  var doLoginNav = isAuth ? (
    <NavLink tag={UserModal}></NavLink>
  ) : currentRoute === "/login" ? (
    <NavLink tag={Link} to="/login" active style={styles.activeLink}>
      <i class="glyphicon glyphicon-user"></i>Ingresar
    </NavLink>
  ) : (
    <NavLink tag={Link} to="/login">
      <i class="glyphicon glyphicon-user"></i>Ingresar
    </NavLink>
  );

  const [redirect, setRedirect] = useState(false);

  return (
    <Fragment>
      <header className="jumbotron" style={currentRoute ==='/gallery/' ? {marginBottom: "0", width:'100%', position: 'fixed', zIndex: '2'}: {marginBottom: "0" }}>
        <Container>
          {redirect ? 
            <Redirect to="/" />
            : null
          }
          <Col sm={6} className="left" onClick={() => {
            setRedirect(true);
            setTimeout(() => setRedirect(false), 1000)
          }}>
            <h1>Memoria fotográfica</h1>
            <p>
              Facultad de Ciencias Fisicas y Matematicas - Universidad de Chile
            </p>
          </Col>
          <Navbar
            expand={"sm"}
            className="justify-content-center"
            light
            style={{ float: "right" }}
          >
            <NavbarToggler onClick={() => setToggle(!toggle)} />
            <Collapse isOpen={toggle} navbar>
              <Nav className="barra">
                <NavItem>
                  {currentRoute === "/Inicio" ? (
                    <NavLink tag={Link} to={"/"} active style={styles.activeLink}>
                      Inicio
                    </NavLink>
                  ) : (
                    <NavLink tag={Link} to={"/"}>
                      Inicio
                    </NavLink>
                  )}
                </NavItem>
                <NavItem>
                  {currentRoute === "/gallery/" ? (
                    <NavLink
                      tag={Link}
                      to={"/gallery"}
                      active
                      style={styles.activeLink}
                    >
                      Galer&iacute;a
                    </NavLink>
                  ) : (
                    <NavLink tag={Link} to={"/gallery"}>
                      Galer&iacute;a
                    </NavLink>
                  )}
                </NavItem>
                <NavItem>
                  {currentRoute === "/upload" ? (
                    <NavLink
                      tag={Link}
                      to={"/upload"}
                      active
                      style={styles.activeLink}
                    >
                      Participa
                    </NavLink>
                  ) : (
                    <NavLink tag={Link} to={"/upload"}>
                      Participa
                    </NavLink>
                  )}{" "}
                </NavItem>
                <NavItem>{doLoginNav}</NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </Container>
        <SearchBar />
      </header>
      {currentRoute==='/gallery/' ? <div style={{width:'100%',height:'228px'}}></div>: null}
    </Fragment>
  );
};

const styles = {
  activeLink: {
    color: "#FF5A60"
  }
};

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuthenticated,
    currentRoute: state.misc.currentRoute
  };
};

export default connect(mapStateToProps, null)(Header);
