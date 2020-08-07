import React, { useState } from "react";
import {
  Container,
  Row,
  Button,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
} from "reactstrap";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import "./style.css";
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
  const isPublic = location.pathname.includes("public")

  useEffect(() => {
    setRoute(location.pathname);
    // eslint-disable-next-line
  }, [setRoute]);

  if (redirect !== false) {
    return <Redirect push to={redirect} />;
  }
  return (
    <Container
      style={{ borderTop: "1px solid rgb(210, 214, 218)" }}
      className="disable-css-transitions"
      fluid
    >
      <Helmet>
        <title>Interfaz de usuario</title>
      </Helmet>
      <Row>
        {!isPublic
        ?(
        <Col sm="2" className="leftcol">
          <Container style={{ backgroundColor: "var(--leit-pink)" }}>
            <Row style={{ padding: "10px" }}>
              <Col sm="4">
                <Card className="user-dashboard-card">
                  <UserPicture
                    user={user}
                    dims={200}
                    render={(user) => (
                      <CardImg top width="100%" src={user.avatar} />
                    )}
                  />
                </Card>
              </Col>
              <Col sm="8">
                <Card className="user-dashboard-card">
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="editProfile"
                    title="Editar"
                    onClick={() => setRedirect("/user/dashboard/editProfile")}
                  />

                  <CardBody>
                    <CardText className="name">
                      {`${user.first_name} ${user.last_name}`}
                    </CardText>
                    <CardText>
                      {userTypeTranslation(user.user_type)}{" "}
                      {makeIcons(user.user_type)}
                    </CardText>
                    <CardText className="rol-card">
                      {userRolTranslation(user.rol_type)}
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
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
          <div className="navEnding"></div>
        </Col>
        ):(
          null
        )
        }
        <Col
          sm={!isPublic ? "10" : "12"}
          style={{
            marginTop: "2em",
            marginBottom: "2em",
            minHeight: "75vh",
            borderLeft: "1px solid rgb(210, 214, 218)",
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
              component={AlbumView}
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
