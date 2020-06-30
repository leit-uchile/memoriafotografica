import React from "react";
import { Container, Row, Button, Col } from "reactstrap";
import { Route, Link, Switch } from "react-router-dom";
import "./styles.css";
// Important for ReactVis
import "../../../node_modules/react-vis/dist/style.css";
import "../../css/semantic-ui-min-custom.css";
import { NoMatch, BoundedRoute } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArchive,
  faFilter,
  faFlag,
  faTags,
  faChartBar,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import Filter from "./Filter/Filter";
import Categories from "./Category/Categories";
import Category_Photos from "./Category/Category_Photos";
import Category_Add from "./Category/Category_Add";
import Landing from "./Landing";
import Reports from "./Reports/Reports";
import Metadata from "./Metadata";
import EmailRequest from "./EmailRequests/EmailRequests";
import { Helmet } from "react-helmet";
import PhotoRequestDetails from "./EmailRequests/PhotoRequestDetails";
import { connect } from "react-redux";
import { site_misc } from "../../actions";
import { useEffect } from "react";

/**
 * TODO:
 * arreglar estilo de nav
 * Agregar pega sin terminar con pelotita roja (notificaciones)
 */
const availableRoutes = [
  {
    to: "categories",
    display: "Categorías",
    icon: <FontAwesomeIcon icon={faArchive} />,
  },
  {
    to: "filter",
    display: "Curación",
    icon: <FontAwesomeIcon icon={faFilter} />,
  },
  {
    to: "reported",
    display: "Reportes",
    icon: <FontAwesomeIcon icon={faFlag} />,
  },
  {
    to: "tags",
    display: "Etiquetas",
    icon: <FontAwesomeIcon icon={faTags} />,
  },
  {
    to: "email",
    display: "Bandeja de Mensajes",
    icon: <FontAwesomeIcon icon={faEnvelope} />,
  },
];

const Dashboard = ({ match, location, setRoute }) => {
  useEffect(() => {
    setRoute(location.pathname);
    // eslint-disable-next-line
  }, [setRoute]);

  return (
    <Container
      style={{ borderTop: "1px solid rgb(210, 214, 218)" }}
      className="disable-css-transitions"
      fluid
    >
      <Helmet>
        <title>Interfaz de administracion</title>
      </Helmet>
      <Row>
        <Col sm="2" className="leftcol">
          <Button
            tag={Link}
            to={match.path + "/"}
            className={
              "navButton" +
              (location.pathname === "/curador/dashboard/" ? " active" : "")
            }
          >
            <FontAwesomeIcon icon={faChartBar} /> Dashboard
          </Button>
          {availableRoutes.map((el, k) => (
            <Button
              tag={Link}
              to={match.path + "/" + el.to}
              className={
                "navButton" +
                (location.pathname.includes(`/curador/dashboard/${el.to}`)
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
        <Col
          sm="10"
          style={{
            marginTop: "2em",
            marginBottom: "2em",
            minHeight: "75vh",
            borderLeft: "1px solid rgb(210, 214, 218)",
          }}
        >
          <Switch>
            <BoundedRoute exact path={match.path + "/"} component={Landing} />
            <BoundedRoute path={match.path + "/filter"} component={Filter} />
            <BoundedRoute
              exact
              path={match.path + "/categories/:id/"}
              component={Category_Photos}
            />
            <BoundedRoute
              exact
              path={match.path + "/categories/:id/add"}
              component={Category_Add}
            />
            <BoundedRoute
              exact
              path={match.path + "/categories"}
              component={Categories}
            />
            <BoundedRoute
              exact
              path={match.path + "/reported"}
              component={Reports}
            />
            <BoundedRoute
              exact
              path={match.path + "/tags"}
              component={Metadata}
            />
            <BoundedRoute
              exact
              path={match.path + "/email"}
              component={EmailRequest}
            />
            <BoundedRoute
              exact
              path={match.path + "/email/photos/:id/"}
              component={PhotoRequestDetails}
            />
            <Route component={NoMatch} />
          </Switch>
        </Col>
      </Row>
    </Container>
  );
};

export default connect(null, (dispatch) => ({
  setRoute: (route) => dispatch(site_misc.setCurrentRoute(route)),
}))(Dashboard);
