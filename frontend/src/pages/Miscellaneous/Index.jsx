import React, { useEffect } from "react";
import About from "./About";
import FAQ from "./FAQ";
import ContactUs from "./ContactUs";
import { Container, Row, Button, Col } from "reactstrap";
import { Route, Link, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { site_misc } from "../../actions";
import { NoMatch } from "../../components";
import { Helmet } from "react-helmet";
import "./styles.css";

const Index = ({ match, location, setRoute }) => {
  useEffect(() => {
    setRoute(location.pathname);
    // eslint-disable-next-line
  }, [setRoute]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <Container className="disable-css-transitions misc">
      <Helmet>
        <title>Informaci&oacute;n del sitio</title>
      </Helmet>
      <div>
        {" "}
        {/* Do not remove this div, it allows for sticky behavior*/}
        <Row>
          <Col sm="2" className="misc-menu">
            <Button tag={Link} color="primary" to={match.path + "/about"}>
              Acerca de
            </Button>
            <Button
              tag={Link}
              to={match.path + "/resources/faq"}
              color="primary"
            >
              Preguntas Frecuentes
            </Button>
            <Button
              tag={Link}
              to={match.path + "/resources/contact-us"}
              color="primary"
            >
              Contáctenos
            </Button>
            <Button tag={Link} to={match.path + "/resources/"} color="primary">
              Mapa del sitio
            </Button>
            <div className="navEnding"></div>
          </Col>
          <Col sm="10" className="misc-content">
            <Switch>
              <Route path={match.path + "/about"} component={About} />
              <Route path={match.path + "/resources/faq"} component={FAQ} />
              <Route
                path={match.path + "/resources/contact-us"}
                component={ContactUs}
              />
              <Route component={NoMatch} />
            </Switch>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default connect(null, (dispatch) => ({
  setRoute: (route) => dispatch(site_misc.setCurrentRoute(route)),
}))(Index);
