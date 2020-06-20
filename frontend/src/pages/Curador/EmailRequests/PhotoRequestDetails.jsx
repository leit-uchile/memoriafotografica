import React, { useState, useEffect, Fragment } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  CardSubtitle,
  CardText,
  CardHeader,
  CardDeck,
  Button
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import uuid4 from "uuid";
import { webadmin } from "../../../actions";

const check = <FontAwesomeIcon icon={faCheckCircle} />;

const PhotoRequestDetails = ({ photos, updateRequest }) => {
  const [rows, setRows] = useState([]);
  
  useEffect(() => {
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
  }, [photos]);

  const resolve = (req, bool) => {
    let originalPhotos = req.photos.map(el=>el.image)
    let reqCopy = { ...req, originalPhotos };
    delete reqCopy.photos
    reqCopy.resolved = !req.resolved;
    reqCopy.email_sent = bool; //Approved or Denied
    updateRequest(reqCopy);
  };


  return (
    <Fragment>
      {rows.map((r) => (
        <Row key={r.theKey} style={{ marginTop: "1em" }}>
          <Col>
            <CardDeck>
              {r.map((c) => (
                <Card className="curador-filter-card">
                  <CardHeader>{c.title}</CardHeader>
                  <CardBody>
                    <CardSubtitle>
                      Por{" "}
                      <Link to={`/user/public/${c.usuario.id}`}>
                        {c.usuario.first_name} {c.usuario.last_name}
                      </Link>
                    </CardSubtitle>
                  </CardBody>
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
                      <b>Metadata:</b>{" "}
                      {c.metadata.map((m) => (
                        <span style={{ display: "block" }}>{m}</span>
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
                    {c.approved ? (
                      <span style={{ color: "green" }}>Aprobada{check}</span>
                    ) : (
                      <span style={{ color: "red" }}>No Aprobada</span>
                    )}
                    {c.censure ? (
                      <span style={{ color: "red" }}>Censurada</span>
                    ) : null}
                    <Button>Aprobar</Button>
                  </CardFooter>
                </Card>
              ))}
            </CardDeck>
          </Col>
        </Row>
      ))}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  loading: state.site_misc.curador.loading,
  photos: state.webadmin.requestDetail.photos,
});

const mapActionsToProps = dispatch => ({
  updateRequest: req => dispatch(webadmin.updateRequest(req))
});

export default connect(mapStateToProps, mapActionsToProps)(PhotoRequestDetails);
