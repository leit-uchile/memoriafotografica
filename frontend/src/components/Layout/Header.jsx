import React, { useState, Fragment, useEffect } from "react";
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
  NavbarBrand,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {
  faImage,
  faHome,
  faSmileWink,
} from "@fortawesome/free-solid-svg-icons";

const Header = ({ isAuth, currentRoute }) => {
  const [toggle, setToggle] = useState(false);

  var doLoginNav = isAuth ? (
    <NavLink tag={UserModal}></NavLink>
  ) : currentRoute === "/login" ? (
    <NavLink tag={Link} to="/login" active>
      <FontAwesomeIcon icon={faUser} /> Ingresar
    </NavLink>
  ) : (
    <NavLink tag={Link} to="/login">
      <FontAwesomeIcon icon={faUser} /> Ingresar
    </NavLink>
  );

  // Change the style of the search bar as we scroll
  const [display, setDisplay] = useState(true);
  const yourElement = React.useRef();
  const isInViewport = (offset = 0) => {
    if (!yourElement) return false;
    const bottom = yourElement.current.getBoundingClientRect().bottom;
    setDisplay(bottom + offset >= 0 && bottom - offset <= window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener("scroll", () => isInViewport());
  }, []);

  const [redirect, setRedirect] = useState(false);
  return (
    <Fragment>
      <header
        ref={yourElement}
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
                    Facultad de Ciencias Fisicas y Matematicas - Universidad de
                    Chile
                  </p>
                </NavbarBrand>
                <NavbarToggler onClick={() => setToggle(!toggle)} />
                <Collapse isOpen={toggle} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      {currentRoute === "/Inicio" ? (
                        <NavLink tag={Link} to={"/"} active>
                          <FontAwesomeIcon icon={faHome} /> Inicio
                        </NavLink>
                      ) : (
                        <NavLink tag={Link} to={"/"}>
                          <FontAwesomeIcon icon={faHome} /> Inicio
                        </NavLink>
                      )}
                    </NavItem>
                    <NavItem>
                      {currentRoute === "/gallery/" ? (
                        <NavLink tag={Link} to={"/gallery"} active>
                          <FontAwesomeIcon icon={faImage} /> Galer&iacute;a
                        </NavLink>
                      ) : (
                        <NavLink tag={Link} to={"/gallery"}>
                          <FontAwesomeIcon icon={faImage} /> Galer&iacute;a
                        </NavLink>
                      )}
                    </NavItem>
                    <NavItem>
                      {currentRoute === "/upload" ? (
                        <NavLink tag={Link} to={"/upload"} active>
                          <FontAwesomeIcon icon={faSmileWink} /> Participa
                        </NavLink>
                      ) : (
                        <NavLink tag={Link} to={"/upload"}>
                          <FontAwesomeIcon icon={faSmileWink} /> Participa
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
      <SearchBar stickyClass={!display} />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.user.isAuthenticated,
    currentRoute: state.site_misc.currentRoute,
  };
};

export default connect(mapStateToProps, null)(Header);
