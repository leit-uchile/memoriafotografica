import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Button,
  Toast,
  ToastBody,
  ToastHeader,
  Spinner,
} from "reactstrap";

const RequestPhotoToast = ({ requested, requestedPhotos, currentPage }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (requestedPhotos.length != 0 && !requested){
      setShow(true);
    }
  }, [requestedPhotos]);

  useEffect(() => {
    if (currentPage !== "/gallery" || currentPage !== "/photo"){
      setShow(false);
    }
  },[currentPage])

  const toggle = () => setShow(!show);

  return (
    <div
      style={{
        top: "calc(1em + 65px)",
        marginLeft: "75%",
        zIndex: "999",
        position: "sticky",
        height: "0",
        width: "200px",
      }}
    >
      <Toast isOpen={show}>
        <ToastHeader toggle={toggle} icon={<Spinner size="sm" />}>
          Solicitud de fotografías
        </ToastHeader>
        <ToastBody style={{ textAlign: "center" }}>
          <Row>
            <Col>Se han agregado {requestedPhotos.length} foto(s)</Col>
          </Row>
          <Row>
            <Col>
              <Button tag={Link} color="primary" to="/request-photo">
                Ir al formulario
              </Button>
            </Col>
          </Row>
        </ToastBody>
      </Toast>
    </div>
  );
};

const mapStateToProps = (state) => ({
  requestedPhotos: state.webadmin.requestedPhotos,
  requested: state.webadmin.requested,
  currentPage: state.site_misc.currentRoute,
});

export default connect(mapStateToProps, null)(RequestPhotoToast);
