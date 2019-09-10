import React, { Component } from "react";
import Avatar from "./Avatar";
import { Container, Row, Col } from "reactstrap";

const Comment = ({ content: { content, censure, usuario } }) => {
  var userName =
    usuario.first_name !== "" && usuario.first_name !== null
      ? `${usuario.first_name} ${usuario.last_name}`
      : "[nombre de usuario]";

  return (
    <Container
      fluid
      className="commentDiv"
      style={{
        backgroundColor: "#e9ecef",
        borderRadius: "5px",
        padding: "0.5em"
      }}>
      <Row>
        <Col xs={3} md={2} ld={1}>
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "25px",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url(${usuario.avatar})`,
              backgroundColor: "#ff5a60",
              marginRight: "auto"
            }}></div>
        </Col>
        <Col xs={9} md={10} ld={11}>
          <div
            style={{
              display: "inline-block",
              borderRight: "2px solid gray",
              padding: "0 15px 0 0"
            }}>
            <b>{userName}</b>
          </div>
          <div style={{ display: "inline-block", padding: "0 15px" }}>
            {usuario.rol_type}
          </div>
          <p style={{ display: "block" }}>{content}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Comment;
