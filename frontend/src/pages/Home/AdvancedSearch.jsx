import { string } from "prop-types";
import React, { useState } from "react";
import Select from "react-select";
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
import { category } from "../../actions/gallery_api";

const AdvancedSearch = (props) => {
  // Big TODO: pasar logica a hook
  // state used to save form data for the search query
  const [formData, saveFormData] = useState({
    byDate: "",
    date: "",
    startDate: "",
    endDate: "",
    searchIncludes: "",
    category: [],
    orderBy: "",
    permission: "",
  });

  // state to toggle modal
  const [modal, setModal] = useState(false);

  // API call to fetch category options
  const options = () =>
    fetch("/api/categories")
      .then((r) => (r.status === 200 ? r.json() : null))
      .then((j) => j.results.map((el) => ({ value: el.id, label: el.title })))
      .catch((err) => []);

  const byDate = [
    { value: "update_date", label: "Fecha de subida" },
    { value: "created_at", label: "Fecha de la foto" },
  ];

  const searchIncludes = [
    { value: "allWords", label: "Todas las palabras" },
    { value: "atLeastOne", label: "Por lo menos una palabra" },
  ];

  const permissions = [
    { value: "CC BY", label: "CC BY" },
    { value: "CC BY-SA", label: "CC BY-SA" },
    { value: "CC BY-ND", label: "CC BY-ND" },
    { value: "CC BY-NC", label: "CC BY-NC" },
    { value: "CC BY-NC-SA", label: "CC BY-NC-SA" },
    { value: "CC BY-NC-ND", label: "CC BY-NC-ND" },
  ];

  const changeToggle = () => {
    setModal(!modal);
  };

  const handleCat = (labels) => {
    if (labels === null) {
      saveFormData({
        ...formData,
        category: [],
      });
    } else if (labels.length > formData.category.length) {
      labels.forEach((label) => {
        if (!formData.category.includes(label)) {
          saveFormData({
            ...formData,
            category: formData.category.concat(label),
          });
        }
      });
    } else if (labels.length < formData.category.length) {
      formData.category.forEach((catLabel) => {
        if (labels.includes(catLabel)) {
          const idx = formData.category.indexOf(catLabel);
          saveFormData({
            ...formData,
            category: formData.category.splice(idx, 1),
          });
        }
      });
    }
  };

  const submitAdvSearch = (e) => {
    e.preventDefault();
    // TODO: meter cosas en el filters
    let filtersStr = "?";
    for (let key in formData) {
      if (formData[key] === "" || formData[key] === []) {
        continue;
      } else {
        if (formData[category] !== []){
          // TODO: hacer esto de mejor forma
          const search = formData[category].join("__");
          filtersStr += search;
        }
        if (formData[])

      }
      filtersStr += "?"
    }
    props.onSubmit(filtersStr);
  };

  const addValue = (event) => {
    const val = event.target.id;
    saveFormData({
      ...formData,
      [val]: event.target.value,
    });
  };

  const addValueSelect = (key, value) => {
    saveFormData({
      ...formData,
      [key]: value,
    });
  };

  return (
    <div>
      <Button color="primary" onClick={changeToggle}>
        Búsqueda Avanzada
      </Button>
      <Modal isOpen={modal} toggle={changeToggle} scrollable>
        <ModalHeader toggle={changeToggle}>Búsqueda Avanzada</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup tag="fieldset" onChange={(e) => addValue(e)}>
              <Col>
                <FormGroup tag="fieldset">
                  <legend>Por fecha</legend>
                  <FormGroup>
                    <Select
                      inputId="byDate"
                      placeholder="Selecciona una opción"
                      options={byDate}
                      onChange={(e) => addValueSelect("byDate", e.value)}
                    />
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
                    <Select
                      inputId="searchIncludes"
                      placeholder="Selecciona una opción"
                      options={searchIncludes}
                      onChange={(e) =>
                        addValueSelect("searchIncludes", e.value)
                      }
                    />
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
                    onChange={handleCat}
                    isSearchable={true}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Ordenar por</Label>
                  <Select
                    inputID="orderBy"
                    placeholder="Selecciona una opción"
                    options={byDate}
                    onChange={(e) => addValueSelect("orderBy", e.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <legend>Por permisos de autor</legend>
                  <Select
                    inputId="permissions"
                    placeholder="Selecciona una opción"
                    options={permissions}
                    onChange={(e) => addValueSelect("permissions", e.value)}
                  />
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
