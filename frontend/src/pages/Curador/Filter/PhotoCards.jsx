import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  CardSubtitle,
  CardText,
  CardHeader
} from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import uuid4 from "uuid";
import FilterModal from './FilterModal'

const check = <FontAwesomeIcon icon={faCheckCircle} />;

const PhotoCards = ({ photos, editPhoto }) => {
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

  return (
    <Container fluid>
      {rows.map(r => (
        <Row key={r.theKey} style={{ marginTop: "1em" }}>
          {r.map(c => (
            <Col key={c.title}>
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
                  style={{backgroundImage: `url("${c.thumbnail}")`}}
                ></div>
                <CardBody>
                  <CardText>
                    <b>Descripci&oacute;n:</b> {c.description}
                  </CardText>
                  <CardText>
                    <b>Metadata:</b>{" "}
                    {c.metadata.map(m => (
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
                  ) : <span style={{ color: "red" }}>No Aprobada</span>}
                  {c.censured ? (
                    <span style={{ color: "red" }}>Censurada</span>
                  ) : null}
                <FilterModal editPhoto={editPhoto} buttonLabel="Gestionar" photo={c}/>
                </CardFooter>
              </Card>
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
};

export default PhotoCards;
