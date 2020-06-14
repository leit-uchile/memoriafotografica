import React from "react";
import {
  UncontrolledCollapse,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  CardText,
} from "reactstrap";

const OptionSelector = ({ id, setState }) => (
  <UncontrolledCollapse toggler={id} style={{ marginBottom: "1em" }}>
    <Card>
      <CardBody>
        <CardText>
          Los cambios en este filtro se ver&aacute;n autom&aacute;ticamente en
          la lista de fotos
        </CardText>
        <Form>
          <FormGroup row>
            <Label for="since" sm={2}>
              Subida desde
            </Label>
            <Col sm={4}>
              <Input
                type="date"
                name="since"
                onChange={(e) => {
                  e.persist();
                  setState(e.target.name, e.target.value);
                }}
              />
            </Col>
            <Label for="until" sm={2}>
              Subida hasta
            </Label>
            <Col sm={4}>
              <Input
                type="date"
                name="until"
                onChange={(e) => {
                  e.persist();
                  setState(e.target.name, e.target.value);
                }}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="approved" sm={2}>
              Aprobaci&oacute;n
            </Label>
            <Col sm={4}>
              <Input
                type="select"
                name="approved"
                onChange={(e) => {
                  e.persist();
                  setState(e.target.name, e.currentTarget.value);
                }}
              >
                <option value="">Todos</option>
                <option value="true">Aprobados</option>
                <option value="false">No Aprobados</option>
              </Input>
            </Col>
            <Label for="censured" sm={2}>
              Censura
            </Label>
            <Col sm={4}>
              <Input
                type="select"
                name="censured"
                onChange={(e) => {
                  e.persist();
                  setState(e.target.name, e.currentTarget.value);
                }}
              >
                <option value="">Todos</option>
                <option value="true">Censurados</option>
                <option value="false">Sin Censurar</option>
              </Input>
            </Col>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  </UncontrolledCollapse>
);

export default OptionSelector;
