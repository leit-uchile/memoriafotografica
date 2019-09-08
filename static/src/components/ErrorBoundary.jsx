import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons";

/*
  Standard error handling from Docs
  https://reactjs.org/docs/error-boundaries.html
*/
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.log(error)
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Container style={{ padding: "4em", textAlign: "center" }}>
          <Row>
            <Col>
              <h2>
                Hubo un error en el sitio <FontAwesomeIcon icon={faFrown} />
              </h2>
              <p style={{ marginTop: "2em" }}>
                Si esto persiste por favor informanos a{" "}
                <a href="mailto:soporte@leit.cl?Subject=Error%20en%20el%20sitio">
                  soporte&#64;leit.cl
                </a>
              </p>
            </Col>
          </Row>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
