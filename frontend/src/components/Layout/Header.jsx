import React, { useState, Fragment, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import UserModal from "../UserModal";
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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import {
  faImage,
  faHome,
  faSmileWink,
} from "@fortawesome/free-solid-svg-icons";
import "./header.css";
import { selectUserIsAuthenticated,
          selectSiteMiscCurrentRoute } from "../../reducers";

const Header = ({ isAuth, currentRoute }) => {
  const [toggle, setToggle] = useState(false);

  var doLoginNav = isAuth ? (
    <NavLink tag={UserModal}></NavLink>
  ) : (
    <NavLink tag={Link} to="/login" active={currentRoute === "/login"}>
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
      <header ref={yourElement}>
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
                >
                  <h1>Memoria fotográfica</h1>
                  <p>
                    Facultad de Ciencias Fisicas y Matematicas - Universidad de
                    Chile
                  </p>
                </NavbarBrand>
                <NavbarToggler onClick={() => setToggle(!toggle)} />
                <Collapse isOpen={toggle} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink
                        tag={Link}
                        to={"/"}
                        active={currentRoute === "/Inicio"}
                      >
                        <FontAwesomeIcon icon={faHome} /> Inicio
                      </NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle
                        nav
                        className={
                          currentRoute === "/gallery" ||
                          currentRoute === "/photo" ||
                          currentRoute === "/collections" ||
                          currentRoute === "/news"
                            ? "active"
                            : ""
                        }
                      >
                        <FontAwesomeIcon icon={faImage} /> Explorar
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem tag={Link} to={"/gallery"}>
                          Galer&iacute;a
                        </DropdownItem>
                        <DropdownItem tag={Link} to={"/collections"}>
                          Colecciones
                        </DropdownItem>
                        <DropdownItem tag={Link} to={"/news"}>
                          Noticias
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                    <NavItem>
                      <NavLink
                        tag={Link}
                        to={"/upload"}
                        active={currentRoute === "/upload"}
                      >
                        <FontAwesomeIcon icon={faSmileWink} /> Participa
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        tag={Link}
                        to={"/misc/about"}
                        active={currentRoute.includes("/misc/")}
                      >
                        <FontAwesomeIcon icon={faInfoCircle} /> Sobre Nosotros
                      </NavLink>
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
    isAuth: selectUserIsAuthenticated(state),
    currentRoute: selectSiteMiscCurrentRoute(state),
  };
};

export default connect(mapStateToProps, null)(Header);
