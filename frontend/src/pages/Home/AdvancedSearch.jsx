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
  // state used to save form data for the search query
  const [formData, saveFormData] = useState({
    byDate: "",
    date: "",
    startDate: "",
    endDate: "",
    searchIncludes: "",
    category: [],
    permissions: "",
  });

  const [catData, saveCat] = useState("");

  // API call to fetch category options
  const options = () =>
    fetch("/api/categories")
      .then((r) => (r.status === 200 ? r.json() : null))
      .then((j) => j.results.map((el) => ({ value: el.id, label: el.title })))
      .catch((err) => []);

  const handleCatChange = (val) => {
    saveCat(val);
  };

  const handleCat = (label) => {
    saveFormData({
      ...formData,
      category: formData.category.concat(label)
    });
  }

  const submitAdvSearch = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const addValue = (event) => {
    const val = event.target.id;
    saveFormData({
      ...formData,
      [val]: event.target.value,
    });
  };

  return (
    <Collapse isOpen={isToggle}>
      <Col sm="12" md={{ offset: 10 }}>
        <Form>
          <FormGroup tag="fieldset" onChange={(e) => addValue(e)}>
            <FormGroup>
              <legend>Por fecha</legend>
              <FormGroup>
                <Label>
                  <Input
                    type="radio"
                    name="date-radio"
                    value="updateDate"
                    id="byDate"
                  />{" "}
                  Fecha de subida
                </Label>
              </FormGroup>
              <FormGroup>
                <Label>
                  <Input
                    type="radio"
                    name="date-radio"
                    value="photoDate"
                    id="byDate"
                  />{" "}
                  Fecha de la foto
                </Label>
              </FormGroup>
              <FormGroup>
                <Input type="date" id="date" />
              </FormGroup>
            </FormGroup>
            <FormGroup>
              <legend>Por rango de fechas</legend>
              <Input type="date" name="start" id="startDate" />
              <Input type="date" name="end" id="endDate" />
            </FormGroup>
            <FormGroup>
              <legend>Incluir en cada resultado de la búsqueda</legend>
              <FormGroup>
                <Label>
                  <Input
                    type="radio"
                    name="date-radio"
                    value="allWords"
                    id="searchIncludes"
                  />{" "}
                  Todas las palabras
                </Label>
              </FormGroup>
              <FormGroup>
                <Label>
                  <Input
                    type="radio"
                    name="date-radio"
                    value="atLeastOne"
                    id="searchIncludes"
                  />{" "}
                  Por lo menos una palabra
                </Label>
              </FormGroup>
            </FormGroup>
            <FormGroup>
              Por categoría
              <AsyncSelect
                placeholder="Selecciona una categoría"
                getOptionLabel={(e) => e.label}
                isMulti
                cacheOptions
                defaultOptions
                loadOptions={options}
                onInputChange={handleCatChange}
                onChange={handleCat}
              />
            </FormGroup>
            <FormGroup>
              <Label>Ordenar por</Label>
            </FormGroup>
            <FormGroup>
              <Label>Por permisos de autor</Label>
              <Input
                type="select"
                name="permission-radio"
                id="permissions"
                placeholder="Selecciona una opción"
              >
                <option>CC BY</option>
                <option>CC BY-SA</option>
                <option>CC BY-ND</option>
                <option>CC BY-NC</option>
                <option>CC BY-NC-SA</option>
                <option>CC BY-NC-ND</option>
              </Input>
            </FormGroup>
            <Button type="submit" onClick={submitAdvSearch}>
              Búsqueda Avanzada
            </Button>
            <Button>Búsqueda Simple</Button>
          </FormGroup>
        </Form>
      </Col>
    </Collapse>
  );
};

export default AdvancedSearch;
