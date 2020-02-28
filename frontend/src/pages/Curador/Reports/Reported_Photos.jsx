import React, { useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Container,
  Card,
  CardBody,
  CardFooter
} from "reactstrap";
import { connect } from "react-redux";
import { curador } from "../../../actions";
import LeitSpinner from "../../../components/LeitSpinner";

const Reported_Photos = ({ reports, getReports, loading }) => {
  useEffect(() => {
    getReports();
  }, [getReports]);

  let photolist = reports
    .filter(el => el.type === 2) // Only pictures
    .map(e => (
      <Card style={{ width: "100%", margin: "10px 0px" }}>
        <CardBody>
          <Row>
            <Col>
              <img src={e.thumbnail} width="200px" alt={e.title}/>
            </Col>
            <Col xs="9">
              <h5>
                <b>{e.content}</b>
              </h5>
              <h6>Creado el {new Date(e.created_at).toLocaleString()}</h6>
            </Col>
          </Row>
          {
            // <CardTitle>Special Title Treatment</CardTitle>
            // <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
          }
        </CardBody>
        <CardFooter>
          <Col xs="2" style={{ display: "inline" }}>
            <a href="#">Editar Foto</a>
          </Col>
          <Col xs="6" style={{ display: "inline" }}>
            {e.resolved ? (
              <div style={{ display: "inline" }}>
                Aprobada{" "}
                <Button
                  onClick={() =>
                    this.approvePhoto(this.props.token, e.id, e.approved)
                  }
                  color="danger"
                >
                  Quitar Aprobación
                </Button>
              </div>
            ) : (
              <div style={{ display: "inline" }}>
                No Aprobada{" "}
                <Button
                  onClick={() =>
                    this.approvePhoto(this.props.token, e.id, e.approved)
                  }
                  color="success"
                >
                  Aprobar
                </Button>
              </div>
            )}
          </Col>
          <Col xs="4" style={{ display: "inline" }}>
            <div style={{ display: "inline" }}>
              <Button color="primary">Ver fotografia</Button>
            </div>
          </Col>
        </CardFooter>
      </Card>
    ));

  return (
    <Container>
      <Row>
        <Col>
          <h2>Resolver Reportes de fotograf&iacute;as</h2>
        </Col>
      </Row>
      <Row>
        {loading ? (
          <Col style={{ textAlign: "center" }}>
            <LeitSpinner />
          </Col>
        ) : (
          <Col>{photolist}</Col>
        )}
      </Row>
    </Container>
  );
};

const mapStateToProps = state => ({
  loading: state.curador.loading,
  reports: state.curador.reports
});

const mapActionsToProps = dispatch => ({
  getReports: () => dispatch(curador.getReportes())
});

export default connect(mapStateToProps, mapActionsToProps)(Reported_Photos);
