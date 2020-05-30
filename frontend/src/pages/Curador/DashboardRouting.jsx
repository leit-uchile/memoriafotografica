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
import Category_New from "./Category/Category_New";
import Category_Photos from "./Category/Category_Photos";
import Landing from "./Landing";
import Reports from "./Reports/Reports";
import Metadata from "./Metadata";
import EmailRequest from "./EmailRequests/EmailRequests";

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
<<<<<<< HEAD
    display: "Bandeja de Mensajes",
    icon: <FontAwesomeIcon icon={faEnvelope} />
  }
=======
    display: "Bandeja de Correo",
    icon: <FontAwesomeIcon icon={faEnvelope} />,
  },
>>>>>>> bafc526f00c9e0c298c452e0c917287240cd4658
];

const Dashboard = ({ match, location }) => (
  <Container
    style={{ borderTop: "1px solid rgb(210, 214, 218)" }}
    className="disable-css-transitions"
    fluid
  >
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
        style={{ marginTop: "2em", marginBottom: "2em", minHeight: "75vh" }}
      >
        <Switch>
          <BoundedRoute exact path={match.path + "/"} component={Landing} />
          <BoundedRoute path={match.path + "/filter"} component={Filter} />
          <BoundedRoute
            exact
            path={match.path + "/categories/new-category"}
            component={Category_New}
          />
          <BoundedRoute
            exact
            path={match.path + "/categories/:id/add-photos"}
            component={Category_Photos}
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
          <Route component={NoMatch} />
        </Switch>
      </Col>
    </Row>
  </Container>
);

export default Dashboard;
