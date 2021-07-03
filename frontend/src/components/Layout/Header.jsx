import React, { useState, Fragment, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import UserModal from "../UserModal";
import SearchBar from "./SearchBar";
import Notification from "../../pages/User/Notification";
import LeitSpinner from "./LeitSpinner";
import { user } from "../../actions";
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
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faInfoCircle,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import {
  faImage,
  faHome,
  faSmileWink,
} from "@fortawesome/free-solid-svg-icons";
import "./header.css";
import {
  selectUserData,
  selectUserIsAuthenticated,
  selectSiteMiscCurrentRoute,
  selectSiteMiscNotifications,
} from "../../reducers";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

const Header = ({
  user,
  isAuth,
  currentRoute,
  notifications,
  getNotifications,
}) => {
  const [toggle, setToggle] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const [pagNotifications, setPagNotifications] = useState({
    page: 0,
    page_size: 3,
    loading: true,
  });

  useEffect(() => {
    if (popoverOpen) {
      setPagNotifications((pag) => ({ ...pag, loading: true }));
      getNotifications(
        user.id,
        pagNotifications.page + 1,
        pagNotifications.page_size,
        true,
        "&read=false"
      ).then((r) => {
        setPagNotifications((pag) => ({ ...pag, loading: false }));
      });
    }
    // eslint-disable-next-line
  }, [popoverOpen, pagNotifications.page_size]);

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
              <Navbar expand={"md"} light>
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
                    {isAuth ? (
                      <NavItem>
                        <Button
                          id="notifications"
                          color="link"
                          className={popoverOpen ? "active" : ""}
                        >
                          <FontAwesomeIcon icon={faBell} />
                        </Button>
                        <Popover
                          hideArrow
                          trigger="legacy"
                          placement="bottom"
                          isOpen={popoverOpen}
                          target="notifications"
                          toggle={() => setPopoverOpen(!popoverOpen)}
                        >
                          <PopoverHeader>
                            Notificaciones sin leer{" "}
                            <Link to="/user/dashboard">Ver todas</Link>
                          </PopoverHeader>
                          <PopoverBody>
                            {!pagNotifications.loading ? (
                              notifications.results.length !== 0 ? (
                                notifications.results.map((el, key) => (
                                  <Row key={"Notification" + key}>
                                    <Col style={{ padding: "6px" }}>
                                      <Notification
                                        element={{
                                          id: el.id,
                                          type: el.type,
                                          content: el.content,
                                          message: el.message,
                                          created_at: el.created_at,
                                          read: el.read,
                                        }}
                                      />
                                    </Col>
                                  </Row>
                                ))
                              ) : (
                                "No tienes notificaciones"
                              )
                            ) : (
                              <Row>
                                <Col style={{ textAlign: "center" }}>
                                  <LeitSpinner />
                                </Col>
                              </Row>
                            )}
                          </PopoverBody>
                        </Popover>
                      </NavItem>
                    ) : null}
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

Header.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  currentRoute: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  user: selectUserData(state),
  isAuth: selectUserIsAuthenticated(state),
  currentRoute: selectSiteMiscCurrentRoute(state),
  notifications: selectSiteMiscNotifications(state),
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators({ getNotifications: user.getUserNotifications }, dispatch);

export default connect(mapStateToProps, mapActionsToProps)(Header);
