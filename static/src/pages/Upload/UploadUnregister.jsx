import React, { useState } from "react";
import {
  Container,
  Form,
  FormGroup,
  Label,
  CustomInput,
  Input,
  Button,
  Row,
  Col
} from "reactstrap";

const UploadUnregister = ({ cache, saveInfo, goBack }) => {
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
  };

  return (
    <Container
      style={{
        marginTop: "2em"
      }}>
      <Row>
        <Col>
          <h2>Cuentanos un poco sobre ti</h2>
        </Col>
      </Row>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label>Información de comunidad FCFM</Label>
          <hr />
        </FormGroup>
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
        <FormGroup>
          <h2>En caso que necesitemos contactarte</h2>
        </FormGroup>
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
        <Button color="secondary" onClick={goBack}>
          Atras
        </Button>
        <Button color="primary" type="submit">
          Continuar
        </Button>
      </Form>
    </Container>
  );
};

export default UploadUnregister;
