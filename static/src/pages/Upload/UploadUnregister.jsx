import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserFriends,
  faEnvelope,
  faChevronCircleRight,
  faChevronCircleLeft
} from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Form,
  FormGroup,
  Label,
  CustomInput,
  Input,
  Button,
  Row,
  Col,
  ButtonGroup
} from "reactstrap";

const UploadUnregister = ({ cache, saveInfo, previousStep, nextStep }) => {
  const [formData, setFormData] = useState(
    cache == {}
      ? {
          ...cache,
          error: null
        }
      : {
          rol: "",
          student: false,
          email: "",
          name: "",
          lastname: ""
        }
  );

  const [info, setInfo] = useState(
    cache === null
      ? { ...cache.info }
      : {
          estudiante: false,
          generation: ""
        }
  );

  const updateForm = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const updateInfo = e =>
    setInfo({ ...info, [e.target.name]: e.target.checked });

  const checkGeneration = e => {
    setFormData({ ...formData, student: e.target.checked });
    setInfo({ ...info, estudiante: e.target.checked });
  };

  const updateGeneration = e =>
    setInfo({ ...info, generation: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    saveInfo({ ...formData, info: { ...info } });
    nextStep();
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2 style={styles.title}>Cuentanos un poco sobre ti</h2>
        </Col>
      </Row>
      <Form onSubmit={onSubmit} style={styles.form}>
        <div style={styles.formTitle}>
          <FontAwesomeIcon
            icon={faUserFriends}
            style={{ marginRight: "1em" }}
          />
          <Label>Acerca de la comunidad FCFM</Label>
        </div>
        <FormGroup>
          <Label>¿Cuál o cuáles fueron sus roles (o son)?</Label>
          <div>
            <CustomInput
              type="checkbox"
              id="exampleCustomCheckbox"
              label="Académico"
              name="academico"
              onChange={updateInfo}
            />
            <CustomInput
              type="checkbox"
              id="exampleCustomCheckbox2"
              label="Funcionario"
              name="funcionario"
              onChange={updateInfo}
            />
            <CustomInput
              type="checkbox"
              id="exampleCustomCheckbox3"
              label="Externo a la comunidad"
              name="externo"
              onChange={updateInfo}
            />
            <CustomInput
              type="checkbox"
              id="exampleCustomCheckbox4"
              label="Estudiante"
              name="estudiante"
              onChange={checkGeneration}
            />
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
          </div>
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
        <ButtonGroup style={{minWidth: "15em"}}>
          <Button onClick={previousStep}>
            <FontAwesomeIcon icon={faChevronCircleLeft} />
          </Button>
          <Button type="submit" color="primary">
            <FontAwesomeIcon icon={faChevronCircleRight} />
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};
const styles = {
  form: {
    backgroundColor: "#f7f7f7",
    padding: "2em",
    marginBottom: "2em",
    border: "1px solid rgb(210,214,218)"
  },
  title: {
    color: "#ff5a60",
    textAlign: "center",
    margin: "1em"
  },
  formTitle: {
    fontSize: "14px",
    fontWeight: "bold",
    padding: "0.5em",
    borderBottom: "1px solid rgb(210,214,218)",
    marginBottom: "10px"
  }
};
export default UploadUnregister;
