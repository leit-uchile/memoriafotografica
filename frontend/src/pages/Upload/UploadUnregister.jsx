import React, { useState } from "react";
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
} from "reactstrap";

const UploadUnregister = ({ cache, saveInfo, previousStep, nextStep }) => {
  const [formData, setFormData] = useState(
    cache === {}
      ? {
          ...cache,
          error: null,
        }
      : {
          rol: "",
          student: false,
          email: "",
          name: "",
          lastname: "",
        }
  );

  const [info, setInfo] = useState(
    cache === null
      ? { ...cache.info }
      : {
          estudiante: false,
          generation: "",
        }
  );

  const updateForm = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const updateInfo = (e) =>
    setInfo({ ...info, [e.target.name]: e.target.checked });

  const checkGeneration = (e) => {
    setFormData({ ...formData, student: e.target.checked });
    setInfo({ ...info, estudiante: e.target.checked });
  };

  const updateGeneration = (e) =>
    setInfo({ ...info, generation: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    saveInfo({ ...formData, info: { ...info } });
    nextStep();
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="upload-title">
            Subir Fotograf&iacute;a / Cuentanos un poco sobre ti
          </h2>
        </Col>
      </Row>
      <Form
        onSubmit={onSubmit}
        className="upload-unregister-container white-box"
      >
        <div style={styles.formTitle}>
          <FontAwesomeIcon
            icon={faUserFriends}
            style={{ marginRight: "1em" }}
          />
          <Label>Acerca de la comunidad FCFM</Label>
        </div>
        <FormGroup>
          <Label>¿Cuál o cuáles fueron sus roles (o son)?</Label>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" name="academico" onChange={updateInfo} />{" "}
              Académico
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" name="funcionario" onChange={updateInfo} />{" "}
              Funcionario
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" name="externo" onChange={updateInfo} />{" "}
              Externo a la comunidad
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="estudiante"
                onChange={checkGeneration}
              />{" "}
              Estudiante
            </Label>
            {formData.student ? (
              <label>
                {" "}
                generación:{" "}
                <Input
                  type="Number"
                  max="3000"
                  onChange={updateGeneration}
                  min="1920"
                  placeholder="1920"
                />{" "}
              </label>
            ) : null}
          </FormGroup>
        </FormGroup>
        <div style={styles.formTitle}>
          <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: "1em" }} />
          <Label>Si necesitamos contactarte</Label>
        </div>
        <FormGroup row>
          <Col sm={2}>
            <Label>Nombre: </Label>
          </Col>
          <Col sm={10}>
            <Input
              type="text"
              placeholder="Jose"
              onChange={updateForm}
              required
              name="name"
              value={formData.name}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={2}>
            <Label>Apellido: </Label>
          </Col>
          <Col sm={10}>
            <Input
              type="text"
              placeholder="Aguirre"
              onChange={updateForm}
              required
              name="lastname"
              value={formData.lastname}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={2}>
            <Label>Correo electronico: </Label>
          </Col>
          <Col sm={10}>
            <Input
              type="email"
              placeholder="jose.medina@memoria-uchile.cl"
              onChange={updateForm}
              required
              name="email"
              value={formData.email}
            />
          </Col>
        </FormGroup>
        <ButtonGroup style={{ minWidth: "20em" }}>
          <Button onClick={previousStep}>
            <FontAwesomeIcon icon={faChevronCircleLeft} /> Volver
          </Button>
          <Button type="submit" color="primary">
            Continuar <FontAwesomeIcon icon={faChevronCircleRight} />
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};
const styles = {
  title: {
    color: "var(--leit-pink)",
    textAlign: "center",
    marginBottom: "2em",
  },
  formTitle: {
    fontSize: "14px",
    fontWeight: "bold",
    padding: "0.5em",
    borderBottom: "1px solid rgb(210,214,218)",
    marginBottom: "10px",
  },
};
export default UploadUnregister;
