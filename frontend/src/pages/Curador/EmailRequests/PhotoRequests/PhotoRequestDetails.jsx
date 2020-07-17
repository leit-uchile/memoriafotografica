import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  CardText,
  CardHeader,
  CardDeck,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import uuid4 from "uuid";
import { webadmin } from "../../../../actions";

const PhotoRequestDetails = ({ request, updateRequest, requestUpdate }) => {
  const [rows, setRows] = useState([]);
  const [approved, setApproved] = useState([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (request.photos) {
      let photos = request.photos;
      setApproved(photos);
      let list = [];
      for (let index = 0; index < photos.length; index = index + 3) {
        let cols = [];
        if (photos[index]) cols.push(photos[index]);
        if (photos[index + 1]) cols.push(photos[index + 1]);
        if (photos[index + 2]) cols.push(photos[index + 2]);
        cols.theKey = uuid4();
        list.push(cols);
      }
      setRows(list);
    }
  }, [request]);

  const handleOnClick = (obj) => {
    // If its there remove it
    const newList = approved.filter((el) => el.id !== obj.id);
    if (approved.filter((el) => el.id === obj.id).length !== 0) {
      setApproved([...newList]);
    } else {
      setApproved([...newList, obj]);
    }
  };

  const resolve = (req, bool) => {
    let approvedOriginal = approved.map((el) => el.image);
    let reqUpdate = { ...req, approvedOriginal };
    delete reqUpdate.photos;
    reqUpdate.resolved = !req.resolved;
    reqUpdate.approved = bool;
    updateRequest(reqUpdate);
    setTimeout(() => setRedirect(true), 1000);
  };

  if (redirect) {
    return <Redirect to="/curador/dashboard/email" />;
  }

  return (
    <Container>
      <Row>
        <Col>
          <h2>
            <Link to="/curador/dashboard/email" className="btn btn-secondary">
              <FontAwesomeIcon icon={faChevronCircleLeft} />
            </Link>{" "}
            Fotos solicitadas por: {request.first_name} {request.last_name}{" "}
            <Button
              color={approved.length > 0 ? "primary" : "danger"}
              onClick={() => resolve(request, approved.length > 0)}
            >
              {approved.length > 0
                ? `Aprobar (${approved.length})`
                : "Rechazar solicitud"}
            </Button>
          </h2>
        </Col>
      </Row>
      {rows.map((r) => (
        <Row key={r.theKey} style={{ marginTop: "1em" }}>
          <Col>
            <CardDeck>
              {r.map((c) => (
                <Card className="curador-filter-card">
                  <CardHeader>{c.title}</CardHeader>
                  {/* <CardBody>
                    <CardSubtitle>
                      Por{" "}
                      <Link to={`/user/public/${c.usuario.id}`}>
                        {c.usuario.first_name} {c.usuario.last_name}
                      </Link>
                    </CardSubtitle>
                  </CardBody> */}
                  <div
                    className="curador-filter-card-img"
                    title={c.title}
                    style={{ backgroundImage: `url("${c.thumbnail}")` }}
                  ></div>
                  <CardBody>
                    <CardText>
                      <b>Descripci&oacute;n:</b> {c.description}
                    </CardText>
                    <CardText>
                      <b>Permisos:</b>{" "}
                      {c.permission.map((m) => (
                        <span style={{ display: "inline" }}>{m}</span>
                      ))}
                    </CardText>
                    <CardText>
                      <b>Categorías:</b>{" "}
                      {c.category.map((m) => (
                        <span style={{ display: "inline" }}>{m}</span>
                      ))}
                    </CardText>
                    <CardText>
                      <b>Metadata:</b>{" "}
                      {c.metadata.map((m) => (
                        <span style={{ display: "inline" }}>{m}</span>
                      ))}
                    </CardText>
                    <CardText>
                      <small className="text-muted">
                        Subida el{" "}
                        {new Date(c.created_at).toLocaleDateString("es")}
                      </small>
                    </CardText>
                  </CardBody>
                  <CardFooter>
                    {/* {c.approved ? (
                      <span style={{ color: "green" }}>Aprobada{check}</span>
                    ) : (
                      <span style={{ color: "red" }}>No Aprobada</span>
                    )}
                    {c.censure ? (
                      <span style={{ color: "red" }}>Censurada</span>
                    ) : null} */}
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="checkbox"
                          name="check"
                          defaultChecked={true}
                          onClick={() => handleOnClick(c)}
                        />{" "}
                        Aprobar
                      </Label>
                    </FormGroup>
                  </CardFooter>
                </Card>
              ))}
            </CardDeck>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  request: state.webadmin.requestDetail,
});

const mapActionsToProps = (dispatch) => ({
  updateRequest: (req) => dispatch(webadmin.updateRequest(req)),
});

export default connect(mapStateToProps, mapActionsToProps)(PhotoRequestDetails);
