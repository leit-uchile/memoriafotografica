import React from "react";
import Filter from "./Filter";
import Publish_Photos from "./Publish_Photos";
import Categories from "./Categories";
import Reported_Photos from "./Reported_Photos";
import Category_New from "./Category_New";
import Category_Photos from "./Category_Photos";
import Landing from "./Landing";
import { Container, Row, Button, Col } from "reactstrap";
import { Route, Link } from "react-router-dom";
import "./styles.css";
// Important for ReactVis
import "../../../node_modules/react-vis/dist/style.css";
import "../../css/semantic-ui-min-custom.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArchive,
  faFilter,
  faFlag,
  faUserTimes,
  faTags,
  faChartBar
} from "@fortawesome/free-solid-svg-icons";

/**
 * TODO:
 * arreglar estilo de nav
 * Agregar pega sin terminar con pelotita roja
 * Agregar estilo active a boton
 * Breadcrumbs a interfaces (no hay nada que indique donde estas parado)
 */
const availableRoutes = [
  {
    to: "categories",
    display: "Categorías",
    icon: <FontAwesomeIcon icon={faArchive} />
  },
  {
    to: "filter",
    display: "Curación",
    icon: <FontAwesomeIcon icon={faFilter} />
  },
  {
    to: "flagged",
    display: "Denuncias",
    icon: <FontAwesomeIcon icon={faUserTimes} />
  },
  {
    to: "reported",
    display: "Reportes",
    icon: <FontAwesomeIcon icon={faFlag} />
  },
  { to: "tags", display: "Etiquetas", icon: <FontAwesomeIcon icon={faTags} /> }
];

const Dashboard = ({ match, location }) => (
  <Container
    style={{ marginBottom: "-2em", borderTop: "1px solid rgb(210, 214, 218)" }}
  >
    <Row>
      <Col xs="2" className="leftcol">
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
        {availableRoutes.map(el => (
          <Button
            tag={Link}
            to={match.path + "/" + el.to}
            className={
              "navButton" +
              (location.pathname.includes(`/curador/dashboard/${el.to}`)
                ? " active"
                : "")
            }
          >
            {el.icon}
            {"  "}
            {el.display}
          </Button>
        ))}
        <div className="navEnding"></div>
      </Col>
      <Col
        xs="10"
        style={{ marginTop: "2em", marginBottom: "2em", minHeight: "75vh" }}
      >
        <Route path={match.path + "/filter"} component={Filter} />
        <Route
          exact
          path={match.path + "/categories/new-category"}
          component={Category_New}
        />
        <Route
          exact
          path={match.path + "/categories/:id/add-photos"}
          component={Category_Photos}
        />
        <Route exact path={match.path + "/categories"} component={Categories} />
        <Route
          exact
          path={match.path + "/flagged"}
          component={Publish_Photos}
        />
        <Route
          exact
          path={match.path + "/reported"}
          component={Reported_Photos}
        />
        <Route exact path={match.path + "/"} component={Landing} />
      </Col>
    </Row>
  </Container>
);

const classes = {
  leftcol: {
    marginLeft: 0
  }
};

export default Dashboard;
