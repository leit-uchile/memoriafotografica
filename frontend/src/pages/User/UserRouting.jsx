import React, { useState } from "react";
import { Container, Row, Button, Col } from "reactstrap";
import { Route, Link, Switch, Redirect } from "react-router-dom";
// Important for ReactVis
import "../../../node_modules/react-vis/dist/style.css";
import "../../css/semantic-ui-min-custom.css";
import { NoMatch, BoundedRoute, PrivateComponent } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faChartBar,
  faImages,
  faBookOpen,
  faSuitcase,
  faCameraRetro,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { site_misc } from "../../actions";
import { useEffect } from "react";
import EditProfile from "./Profile/EditProfile";
import Landing from "./Landing";
import PublicProfile from "./Profile/PublicProfile";
import UserPhotos from "./PhotoCollection/UserPhotos";
import UserAlbums from "./AlbumCollection/UserAlbums";
import AlbumView from "./AlbumCollection/AlbumView";
import PublicAlbums from "./AlbumCollection/PublicAlbums";
import { UserPicture } from "../../components";
import { userRolTranslation, userTypeTranslation } from "./utils";
import "./userRouting.css";
import CollectionView from "../Collections/CollectionView";
/**
 * TODO:
 * arreglar estilo de nav
 * Agregar pega sin terminar con pelotita roja (notificaciones)
 */
const availableRoutes = [
  {
    to: "photos",
    display: "Mis fotos",
    icon: <FontAwesomeIcon icon={faImages} />,
  },
  {
    to: "albums",
    display: "Mis albumes",
    icon: <FontAwesomeIcon icon={faBookOpen} />,
  },
];

const makeIcons = (rol_id) => {
  switch (rol_id) {
    case 1:
      return <FontAwesomeIcon icon={faCameraRetro} />;
    case 2:
      return <FontAwesomeIcon icon={faAddressCard} />;
    case 3:
      return <FontAwesomeIcon icon={faSuitcase} />;
    default:
      return "Failed";
  }
};

const Dashboard = ({ match, location, setRoute, user, props }) => {
  const [redirect, setRedirect] = useState(false);
  const isPublic = location.pathname.includes("public");

  useEffect(() => {
    setRoute(location.pathname);
    // eslint-disable-next-line
  }, [setRoute]);

  if (redirect !== false) {
    return <Redirect push to={redirect} />;
  }
  return (
    <Container className="disable-css-transitions" fluid>
      <Helmet>
        <title>Interfaz de usuario</title>
      </Helmet>
      <Row>
        {!isPublic ? (
          <Col sm="2" className="leftcol">
            <Row>
              <Container fluid>
                <Row className="user-dashboard-block">
                  <Col>
                    <UserPicture
                      user={user}
                      dims={100}
                      render={(user) => <img height="100" width="100" style={{borderRadius:"50%"}} src={user.avatar} />}
                    />
                  </Col>
                  <Col>
                    <Container className="info">
                      <h2>
                        {`${user.first_name} ${user.last_name}`}{" "}
                        <FontAwesomeIcon
                          icon={faEdit}
                          title="Editar perfil"
                          onClick={() => setRedirect("/user/dashboard/editProfile")}
                        />
                      </h2>
                    </Container>
                    <Container fluid>
                      <p>
                        {userTypeTranslation(user.user_type)}{" "}
                        {makeIcons(user.user_type)}
                      </p>
                      <p>{userRolTranslation(user.rol_type)}</p>
                    </Container>
                  </Col>
                </Row>
              </Container>
            </Row>
            <Row>
              <Col>
                <Button
                  tag={Link}
                  to={match.path + "dashboard/"}
                  className={
                    "navButton" +
                    (location.pathname === "/user/dashboard/" ? " active" : "")
                  }
                >
                  <FontAwesomeIcon icon={faChartBar} /> Dashboard
                </Button>
                {availableRoutes.map((el, k) => (
                  <Button
                    tag={Link}
                    to={match.path + "dashboard/" + el.to}
                    className={
                      "navButton" +
                      (location.pathname.includes(`/user/dashboard/${el.to}`)
                        ? " active"
                        : "")
                    }
                    key={k}
                  >
                    {el.icon}
                    {"  "}
                    {el.display}
                  </Button>
                ))}
              </Col>
            </Row>
            <div className="navEnding"></div>
          </Col>
        ) : null}
        <Col
          sm={!isPublic ? "10" : "12"}
          style={{
            backgroundColor: "#f4f6f8",
            minHeight: "75vh",
            borderLeft: "1px solid rgb(210, 214, 218)",
            paddingTop: "2em",
            paddingLeft: "20px",
          }}
        >
          <Switch>
            <BoundedRoute
              exact
              path={"/user/public/:id"}
              component={PublicProfile}
              location={location}
              {...props}
            />
            <BoundedRoute
              exact
              path={"/user/public/:id/albums"}
              component={PublicAlbums}
              location={location}
              {...props}
            />
            <PrivateComponent
              exact
              path={"/user/public/:id/photos"}
              component={UserPhotos}
              location={location}
              {...props}
            />
            <BoundedRoute
              exact
              path={"/user/public/albums/:id"}
              component={AlbumView}
              location={location}
              {...props}
            />
            <BoundedRoute
              exact
              path={"/user/public/collections/:id"}
              component={CollectionView}
              location={location}
              {...props}
            />
            <PrivateComponent
              exact
              path={"/user/dashboard/"}
              component={Landing}
              location={location}
              {...props}
            />
            <PrivateComponent
              path={"/user/dashboard/editProfile"}
              component={EditProfile}
              location={location}
              {...props}
            />
            <PrivateComponent
              exact
              path={"/user/dashboard/photos"}
              component={UserPhotos}
              location={location}
              {...props}
            />
            <PrivateComponent
              exact
              path={"/user/dashboard/albums"}
              component={UserAlbums}
              location={location}
              {...props}
            />
            <PrivateComponent
              exact
              path={"/user/albums/:id"}
              component={AlbumView}
              location={location}
              {...props}
            />
            <Route component={NoMatch} />
          </Switch>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.userData,
});

const mapActionsToProps = (dispatch) => ({
  setRoute: (route) => dispatch(site_misc.setCurrentRoute(route)),
});

export default connect(mapStateToProps, mapActionsToProps)(Dashboard);
