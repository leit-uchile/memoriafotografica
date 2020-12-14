import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./photoEditor.css";

const AlbumGallery = ({ albums, onClick, ...props }) => {
  return (
    <Container fluid>
      <Row>
        {albums.map((el, key) => (
          <Col key={key}>
            <div
              style={{
                backgroundImage: `url("${el.thumbnail}")`,
                cursor: "pointer",
              }}
              className="user-albums-background"
              onClick={(event) =>
                onClick(event, {
                  index: key,
                  next: key!==albums.lenght ? albums[key + 1]: null,
                  album: el,
                  previous: key!==0 ? albums[key - 1] : null,
                })
              }
            >
              <h4>{el.name}</h4>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AlbumGallery;
