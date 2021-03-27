import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const AdvancedSearch = () => {
  // state used to save form data for the search query
  const [formData, saveFormData] = useState({
    byDate: "",
    date: "",
    startDate: "",
    endDate: "",
    searchIncludes: "",
    category: [],
    orderBy: "",
    permissions: "",
  });

  // state to save category label to be added in category array in formData
  const [catData, saveCat] = useState("");

  // state to toggle modal
  const [modal, setModal] = useState(false);

  // API call to fetch category options
  const options = () =>
    fetch("/api/categories")
      .then((r) => (r.status === 200 ? r.json() : null))
      .then((j) => j.results.map((el) => ({ value: el.id, label: el.title })))
      .catch((err) => []);

  const changeToggle = () => {
    setModal(!modal);
  };

  const handleCatChange = (val) => {
    saveCat(val);
  };

  const handleCat = (label) => {
    if (!formData.category.includes(label)) {
      saveFormData({
        ...formData,
        category: formData.category.concat(label),
      });
    }
  };

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
    <div>
      <Button color="primary" onClick={changeToggle}>
        Búsqueda Avanzada
      </Button>
      <Modal isOpen={modal} toggle={changeToggle} scrollable>
        <ModalHeader>Búsqueda Avanzada</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup tag="fieldset" onChange={(e) => addValue(e)}>
              <Col>
                <FormGroup tag="fieldset">
                  <legend>Por fecha</legend>
                  <FormGroup>
                    <Input type="select" id="byDate">
                      <option value="updateDate">Fecha de subida</option>
                      <option value="photoDate">Fecha de la foto</option>
                    </Input>
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
                <FormGroup tag="fieldset">
                  <legend>Incluir en cada resultado de la búsqueda</legend>
                  <FormGroup>
                    <Input type="select" id="searchIncludes">
                      <option value="allWords">Todas las palabras</option>
                      <option value="atLeastOne">
                        Por lo menos una palabra
                      </option>
                    </Input>
                  </FormGroup>
                </FormGroup>
                <FormGroup>
                  <legend>Por categoría</legend>
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
                  <Input type="radio" name="order-radio" id="orderBy"></Input>
                </FormGroup>
                <FormGroup>
                  <legend>Por permisos de autor</legend>
                  <Input type="select" name="permission-radio" id="permissions">
                    <option>Selecciona una opción</option>
                    <option>CC BY</option>
                    <option>CC BY-SA</option>
                    <option>CC BY-ND</option>
                    <option>CC BY-NC</option>
                    <option>CC BY-NC-SA</option>
                    <option>CC BY-NC-ND</option>
                  </Input>
                </FormGroup>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit" onClick={submitAdvSearch}>
            Buscar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AdvancedSearch;
