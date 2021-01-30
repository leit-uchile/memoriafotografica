import React, { useState } from "react";
import {
  Col,
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Collapse,
} from "reactstrap";
import Select from "react-select";

const AdvancedSearch = ({
  isToggle, // bool que indica si se muestran las opciones o no
}) => {

  // TODO: cambiar las opciones a lo que corresponda
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <Collapse isOpen={isToggle}>
      <Col sm="12" md={{ size: 6, offset: 3 }}>
        <Form>
          <FormGroup>
            <legend>Por fecha</legend>
            <FormGroup>
              <Label>
                <Input type="radio" name="date-radio" id="dateRadio" /> Fecha de
                subida
              </Label>
            </FormGroup>
            <FormGroup>
              <Label>
                <Input type="radio" name="date-radio" id="dateRadio" /> Fecha de
                la foto
              </Label>
            </FormGroup>
            <FormGroup>
              <Input type="date" />
            </FormGroup>
          </FormGroup>
        </Form>
        <Form>
          <FormGroup>
            <legend>Por rango de fechas</legend>
            <FormGroup>
              <Input type="date" />
            </FormGroup>
            <FormGroup>
              <Input type="date" />
            </FormGroup>
          </FormGroup>
        </Form>
        <Form>
          <FormGroup>
            <legend>Incluir en cada resultado de la búsqueda</legend>
            <FormGroup>
              <Label>
                <Input type="radio" name="date-radio" id="dateRadio" /> Todas
                las palabras
              </Label>
            </FormGroup>
            <FormGroup>
              <Label>
                <Input type="radio" name="date-radio" id="dateRadio" /> Por lo
                menos una palabra
              </Label>
            </FormGroup>
          </FormGroup>
        </Form>
        <Form>
          <FormGroup>
            Por categoría
            <Select
              options={options}
              placeholder={"Selecciona una o más categorías"}
              isMulti
            />
          </FormGroup>
        </Form>
        <Form>
          <FormGroup>
            <Label>Ordenar por</Label>
          </FormGroup>
        </Form>
      </Col>
    </Collapse>
  );
};

export default AdvancedSearch;
