import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserFriends,
  faEnvelope,
  faChevronCircleRight,
  faChevronCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
  ButtonGroup,
  Alert,
} from "reactstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { connect } from "react-redux";
import { webadmin } from "../../actions";
import {
  faUserCircle,
  faUser,
  faUserTag,
} from "@fortawesome/free-solid-svg-icons";
import FormTermsOfUse from "../../components/TermsOfUse/FormTermsOfUse";

const CompleteRegistration = ({ location }) => {
  const onSubmit = () => {
    console.log("olas");
  };
  const [code, setCode] = useState(
    location.search.slice(location.search.indexOf("code=") + 5)
  );

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [toggleTermModal, setToggleTermModal] = useState(false);

  const channgeAcceptedTerms = () => {
    setAcceptedTerms(!acceptedTerms);
  };

  const toggleModal = () => {
    setToggleTermModal(!toggleTermModal);
  };
  return (
    <Container>
      <Row>
        <Col>
          <h2 className="page-title">Completa tu registro</h2>
        </Col>
      </Row>
      <Form onSubmit={onSubmit} className="white-box form-container">
        {/* TODO Contrase;a */}
        {/* TODO TERMINOS DE uso */}
        {/* TODO FECHA NACIMIENTO */}
        <Row>
          <Col>
            <div className="form-title">
              <FontAwesomeIcon icon={faUser} />
              <Label> Datos personales</Label>
            </div>
          </Col>
        </Row>
        <FormGroup>
          <Label for="password">Contraseña</Label>
          <Input
            type="password"
            name="password"
            // onChange={this.genericChangeHandler}
            required
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label for="passwordCheck">Repetir Contraseña</Label>
          <Input
            type="password"
            name="passwordCheck"
            // onChange={this.genericChangeHandler}
            required
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label for="date">Fecha de nacimiento</Label>
          <Input
            type="date"
            name="date"
            //   onChange={this.genericChangeHandler}
            required
            //   value={this.state.date}
          ></Input>
        </FormGroup>

        <FormTermsOfUse
          termsValue={acceptedTerms}
          setTermsValue={channgeAcceptedTerms}
          isTermsModalOpen={toggleTermModal}
          toggleTermsModal={toggleModal}
        />

        <FormGroup>
          <Button color="primary">¡Reg&iacute;strame!</Button>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default CompleteRegistration;
