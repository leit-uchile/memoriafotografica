import { string } from "prop-types";
import React, { useState } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import {
  Col,
  CustomInput,
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
    startDate: "",
    endDate: "",
    searchIncludes: "",
    category: [],
    orderBy: "",
    permission: "",
  });

  // state to toggle modal
  const [modal, setModal] = useState(false);
  // state to toggle endDate input
  const [toggle, setSwitch] = useState(false);

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

  const changeDateToggle = () => {
    setSwitch(!toggle);
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
    let filtersArr = [];
    for (let key in formData) {
      if (formData[key] === "" || formData[key].length === 0) {
        continue;
      } else {
        if (key === "permission" && formData[key] !== "") {
          let perm = "permission=" + formData[key];
          filtersArr.push(perm);
        }
        else if (key === "category" && formData[key].length !== 0) {
          let search = [];
          const lenCat = formData[key].length;
          for (let i = 0;  i < lenCat; i++){
            const labelCat = formData[key][i].label.replace(" ", "__");
            search.push(labelCat);
          }
          const searchStr = search.join("__");
          filtersArr.push("category__in=" + searchStr);
        }
        else if (key === "orderBy" && formData[key] !== "") {
          let order = "ordering=" + formData[key];
          filtersArr.push(order);
        }
        else if (key === "byDate") {
          let date;
          if (formData.startDate !== "" && formData.endDate !== "") {
            date = "__range=" + formData.startDate + "__" + formData.endDate;
          }
          else if(formData.startDate !== "" && formData.endDate === ""){
            date = "=" + formData.startDate;
          }
          if(formData[key] === "created_at"){
            filtersArr.push("created_at" + date);
          }
          else if(formData[key] === "update_date"){
            filtersArr.push("update_date" + date);
          }
        }
      }
    }
    const filterUrl = "?" + filtersArr.join("&");
    props.onSubmit(filterUrl);
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
                    <CustomInput
                      type="switch"
                      id="rangeDate"
                      label="Por rango de fecha"
                      onChange={changeDateToggle}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input type="date" id="startDate" />
                    {toggle ? (
                      <Input type="date" name="end" id="endDate" />
                    ) : null}
                  </FormGroup>
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
                    inputId="permission"
                    placeholder="Selecciona una opción"
                    options={permissions}
                    onChange={(e) => addValueSelect("permission", e.value)}
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
