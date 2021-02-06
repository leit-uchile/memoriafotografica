import React, { useState } from "react";
import AsyncSelect from "react-select/async";
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

const AdvancedSearch = ({
  isToggle, // boolean that shows if advanced options are displayed
}) => {
  // API call to fetch category options
  const options = () =>
    fetch("/api/categories")
      .then((r) => (r.status === 200 ? r.json() : null))
      .then((j) => j.results.map((el) => ({ value: el.id, label: el.title })))
      .catch((err) => []);

  return (
    <Collapse isOpen={isToggle}>
      <Col sm="12" md={{ offset: 10 }}>
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
            <AsyncSelect
              isMulti
              cacheOptions
              defaultOptions
              loadOptions={options}
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
