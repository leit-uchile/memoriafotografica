import React, { useEffect } from "react";
import About from "./About";
import FAQ from "./FAQ";
import ContactUs from "./ContactUs";
import { Container, Row, Button, Col } from "reactstrap";
import { Route, Link, Switch } from "react-router-dom";

const Index = ({ match, location }) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <Container style={styles.container} className="disable-css-transitions">
      <div>
        {" "}
        {/* Do not remove this div, it allows for sticky behavior*/}
        <Row>
          <Col sm="2" style={styles.leftcol}>
            <Button
              tag={Link}
              style={styles.button}
              color="primary"
              to={match.path + "/about"}
            >
              Acerca de
            </Button>
            <Button
              tag={Link}
              style={styles.button}
              to={match.path + "/resources/faq"}
              color="primary"
            >
              Preguntas Frecuentes
            </Button>
            <Button
              tag={Link}
              style={styles.button}
              to={match.path + "/resources/contact-us"}
              color="primary"
            >
              Contáctenos
            </Button>
            <Button
              tag={Link}
              style={styles.button}
              to={match.path + "/resources/"}
              color="primary"
            >
              Mapa del sitio
            </Button>
            <div className="navEnding"></div>
          </Col>
          <Col sm="10" style={styles.rightcol}>
            <Switch>
              <Route path={match.path + "/about"} component={About} />
              <Route path={match.path + "/resources/faq"} component={FAQ} />
              <Route
                path={match.path + "/resources/contact-us"}
                component={ContactUs}
              />
            </Switch>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

const styles = {
  container: {
    marginBottom: "2em",
  },
  leftcol: {
    position: "sticky",
    zIndex: "4",
    height: "fit-content",
    top: "calc(2em + 64px)",
    marginTop: "2em",
  },
  rightcol: {
    borderLeft: "1px solid rgb(210, 214, 218)",
    marginTop: "2em",
    marginBottom: "2em",
    minHeight: "75vh",
  },
  button: {
    border: "1px solid rgb(210, 214, 218)",
    display: "block",
  },
};
export default Index;
