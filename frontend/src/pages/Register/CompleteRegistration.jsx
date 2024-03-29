import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
  Alert,
} from "reactstrap";
import { connect } from "react-redux";
import { webadmin } from "../../actions";
import {
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import FormTermsOfUse from "../../components/TermsOfUse/FormTermsOfUse";
import CompleteRegistrationMessage from "./CompleteRegistrationMessage"

const CompleteRegistration = ({
  location,
  finishRegistration,
  finishRegistrationStatus,
}) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [toggleTermModal, setToggleTermModal] = useState(false);
  const [formData, setFormData] = useState({
    code: location.search.slice(location.search.indexOf("code=") + 5),
  });
  const [errors, setErrors] = useState();
  const [passwordCheck, setPasswordCheck] = useState();

  const checkPassword = () => {
    if (formData.password === "") {
      setErrors("Por favor ingrese su contraseña");
      return false;
    }
    if (formData.password !== passwordCheck) {
      setErrors("Las contraseñas son diferentes");
      return false;
    }
    if (formData.password.length < 8) {
      setErrors("La contraseña es demasiado corta. Minimo 8 caracteres");
      return false;
    }
    setErrors();
    return true;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (checkPassword()) {
      finishRegistration({ ...formData });
    }
  };

  const channgeAcceptedTerms = () => {
    setAcceptedTerms(!acceptedTerms);
  };

  const toggleModal = () => {
    setToggleTermModal(!toggleTermModal);
  };

  return(
    finishRegistrationStatus === undefined?
  (<Container>
  <Row>
    <Col>
      <h2 className="page-title">Completa tu registro</h2>
    </Col>
  </Row>

  <Form onSubmit={onSubmit} className="white-box form-container">
    <Row>
      <Col>
        <div className="form-title">
          <FontAwesomeIcon icon={faUser} />
          <Label> Datos personales</Label>
        </div>
      </Col>
    </Row>

    {errors ? <Alert color="warning">{errors}</Alert> : <></>}
    <FormGroup>
      <Label for="password">Contraseña</Label>
      <Input
        type="password"
        name="password"
        onChange={(event) =>
          setFormData({
            ...formData,
            [event.target.name]: event.target.value,
          })
        }
        required
      ></Input>
    </FormGroup>
    <FormGroup>
      <Label for="passwordCheck">Repetir Contraseña</Label>
      <Input
        type="password"
        name="passwordCheck"
        required
        onChange={(event) => setPasswordCheck(event.target.value)}
      ></Input>
    </FormGroup>
    <FormGroup>
      <Label for="date">Fecha de nacimiento</Label>
      <Input
        type="date"
        name="date"
        onChange={(event) =>
          setFormData({
            ...formData,
            [event.target.name]: event.target.value,
          })
        }
        required
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
</Container>) : <CompleteRegistrationMessage status={finishRegistrationStatus.status}/>
)
};


const mapStateToProps = (state) => ({
  finishRegistrationStatus: state.webadmin.completeRegistration,
});

const mapActionsToProps = (dispatch) => ({
  finishRegistration: (value) => dispatch(webadmin.CompleteRegistration(value)),
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(CompleteRegistration);
