import React, { useState, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import UserModal from "../UserModal";
import "../../css/header.css";
import SearchBar from "./SearchBar";
import {
  Navbar,
  NavbarToggler,
  Container,
  Col,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Row,
  NavbarBrand
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Header = ({ isAuth, currentRoute }) => {
  const [toggle, setToggle] = useState(false);

  var doLoginNav = isAuth ? (
    <NavLink tag={UserModal}></NavLink>
  ) : currentRoute === "/login" ? (
    <NavLink tag={Link} to="/login" active style={styles.activeLink}>
      <FontAwesomeIcon icon={faUser} />
      {" "}Ingresar
    </NavLink>
  ) : (
    <NavLink tag={Link} to="/login">
      <FontAwesomeIcon icon={faUser} />
      {" "}Ingresar
    </NavLink>
  );

  const [redirect, setRedirect] = useState(false);

  return (
    <Fragment>
      <header
        className="jumbotron"
        style={{ marginBottom: "0", paddingBottom: "1rem", paddingTop: "1rem" }}
      >
        <Container>
          {redirect ? <Redirect to="/" /> : null}
          <Row>
            <Col>
              <Navbar expand={"sm"} light>
                <NavbarBrand
                  onClick={() => {
                    setRedirect(true);
                    setTimeout(() => setRedirect(false), 1000);
                  }}
                  tag={"div"}
                  style={{ maxWidth: "50%" }}
                >
                  <h1>Memoria fotográfica</h1>
                  <p style={{ fontSize: "0.8em", whiteSpace: "normal" }}>
                    Facultad de Ciencias Fisicas y Matematicas <br></br> Universidad de
                    Chile
                  </p>
                </NavbarBrand>
                <NavbarToggler onClick={() => setToggle(!toggle)} />
                <Collapse isOpen={toggle} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      {currentRoute === "/Inicio" ? (
                        <NavLink
                          tag={Link}
                          to={"/"}
                          active
                          style={styles.activeLink}
                        >
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
            </Col>
          </Row>
        </Container>
      </header>
      <div
        style={
          currentRoute === "/gallery/"
            ? {
                position: "sticky",
                top: "0",
                backgroundColor: "#e9ecef",
                height: "4em",
                padding: "1em 0",
                borderBottom: "1px solid rgb(210,214,218)",
                zIndex: "4"
              }
            : {
                backgroundColor: "#e9ecef",
                borderBottom: "1px solid rgb(210,214,218)",
                height: "4em",
                padding: "1em 0"
              }
        }
      >
        <SearchBar />
      </div>
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
