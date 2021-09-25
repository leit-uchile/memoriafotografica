import React, { useState, useCallback } from "react";
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
import "./AdvancedSearch.css";
//import useAdvSearch from "./hooks/useAdvSeach";

const AdvancedSearch = (props) => {
  // Big TODO: pasar logica a hook
  // state used to save form data for the search query
  const [formData, saveFormData] = useState({
    search: "",
    byDate: "",
    startDate: "",
    endDate: "",
    searchIncludes: "",
    category: [],
    metadata: [],
    orderBy: "",
    permission: "",
  });

  // state to toggle modal
  const [modal, setModal] = useState(false);
  // state to toggle endDate input
  const [toggle, setSwitch] = useState(false);
  // state to save async input
  const [inputValue, setInput] = useState("");

  // auxiliary function to sort by label
  const sortByLabel = (a, b) => {
    a.label = a.label.toLowerCase();
    b.label = b.label.toLowerCase();
    if (a.label == b.label) {
      return 0;
    }
    if (a.label < b.label) {
      return -1;
    }
    return 1;
  };

  const filterInput = useCallback(
    (array) => {
      array.sort(sortByLabel);
      if (inputValue !== "") {
        array = array.filter((a) => a.label.includes(inputValue));
      }
      return array;
    },
    [inputValue]
  );

  // API call to fetch category options
  const categories = () =>
    fetch("/api/categories")
      .then((r) => (r.status === 200 ? r.json() : null))
      .then((j) => j.results.map((el) => ({ value: el.id, label: el.title })))
      .then(filterInput)
      .catch((err) => []);

  // API call to fetch metadata values
  const keyWords = () =>
    fetch("/api/search/metadata")
      .then((r) => (r.status === 200 ? r.json() : null))
      .then((j) => j.map((el, k) => ({ label: el.value, value: k })))
      .then(filterInput)
      .catch((err) => []);

  const byDate = [
    { value: "upload_date", label: "Fecha de subida" },
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

  // TODO: check if the data is actually updating
  const handleChange = (labels, state) => {
    if (labels === null) {
      saveFormData({
        ...formData,
        [state]: [],
      });
    } else if (labels.length > formData[state].length) {
      let newValues = labels
        .filter((el) => !formData[state].includes(el.label))
        .map((el) => el.label);
      saveFormData({
        ...formData,
        [state]: [...formData[state], ...newValues],
      });
    } else if (labels.length < formData[state].length) {
      let newValues = labels
        .filter((el) => formData[state].includes(el.label))
        .map((el) => el.label);
      saveFormData({
        ...formData,
        [state]: newValues,
      });
    }
  };

  const submitAdvSearch = (e) => {
    changeToggle();
    let filtersArr = [];
    let searchTerms = "";
    for (let key in formData) {
      if (formData[key] === "" || formData[key].length === 0) {
        continue;
      } else {
        if (key === "search") {
          const termsList = formData[key].split(" ");
          for (let i = 0; i < termsList.length; i++) {
            let s = "search=" + termsList[i] + "&";
            searchTerms += s;
          }
        } else if (key === "permission" && formData[key] !== "") {
          let perm = "permission=" + formData[key];
          filtersArr.push(perm);
        } else if (
          (key === "category" || key === "metadata") &&
          formData[key].length !== 0
        ) {
          let search = [];
          const lenCat = formData[key].length;
          for (let i = 0; i < lenCat; i++) {
            const labelCat = formData[key][i].replace(" ", "__");
            search.push(labelCat);
          }
          const searchStr = search.join("__");
          filtersArr.push(key + "__in=" + searchStr);
        } else if (key === "orderBy" && formData[key] !== "") {
          let order = "ordering=" + formData[key];
          filtersArr.push(order);
        } else if (key === "byDate") {
          let date;
          if (formData.startDate !== "" && formData.endDate !== "") {
            date = "__range=" + formData.startDate + "__" + formData.endDate;
          } else if (formData.startDate !== "" && formData.endDate === "") {
            date = "=" + formData.startDate;
          }
          if (formData[key] === "created_at") {
            filtersArr.push("created_at" + date);
          } else if (formData[key] === "upload_date") {
            filtersArr.push("upload_date" + date);
          }
        } else if (key === "searchIncludes") {
          if (formData[key] === "allWords") {
            let searchIncludes = "includes=" + formData[key];
            filtersArr.push(searchIncludes);
          }
        }
      }
    }
    const filterUrl = "&" + searchTerms + filtersArr.join("&");
    props.onSubmit(filterUrl);
  };

  const getLabel = (val, arr) => {
    for (let el in arr) {
      if (arr[el].value === val) {
        return arr[el].label;
      }
    }
  };

  const getValuesObjs = (val, arr) => {
    const newArr = [];
    val.forEach((v) => {
      for (let idx in arr) {
        if (arr[idx].value === v) {
          newArr.push({ value: v, label: getLabel(v, arr) });
        }
      }
    });
    return newArr;
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

  const handleAsyncInput = (newInput) => {
    const input = newInput.replace(/\W/g, "");
    setInput(newInput);
    return input;
  };

  return (
    // TODO: dejar seleccionadas las opciones que se usaron en la busqueda anterior
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
                <FormGroup>
                  <legend>Buscar</legend>
                  <Input
                    type="text"
                    id="search"
                    value={formData.search}
                    onChange={(e) =>
                      saveFormData({ ...formData, search: e.value })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <legend>Palabras clave</legend>
                  <AsyncSelect
                    getOptionLabel={(e) => e.label}
                    isMulti
                    cacheOptions
                    defaultOptions
                    defaultValue={getValuesObjs(formData.metadata, keyWords)}
                    loadOptions={keyWords}
                    onChange={(e) => handleChange(e, "metadata")}
                    onInputChange={handleAsyncInput}
                  />
                </FormGroup>
                <FormGroup tag="fieldset">
                  <legend>Por fecha</legend>
                  <FormGroup>
                    <Select
                      inputId="byDate"
                      placeholder="Selecciona una opción"
                      defaultValue={{
                        value: formData.byDate,
                        label: getLabel(formData.byDate, byDate),
                      }}
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
                    <Input
                      type="date"
                      id="startDate"
                      defaultValue={{
                        value: formData.startDate,
                        label: formData.startDate,
                      }}
                    />
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
                      defaultValue={{
                        value: formData.searchIncludes,
                        label: getLabel(
                          formData.searchIncludes,
                          searchIncludes
                        ),
                      }}
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
                    loadOptions={categories}
                    onChange={(e) => handleChange(e, "category")}
                    onInputChange={handleAsyncInput}
                  />
                </FormGroup>
                <FormGroup>
                  <legend>Ordenar por</legend>
                  <Select
                    inputID="orderBy"
                    placeholder="Selecciona una opción"
                    defaultValue={{
                      value: formData.orderBy,
                      label: getLabel(formData.orderBy, byDate),
                    }}
                    options={byDate}
                    onChange={(e) => addValueSelect("orderBy", e.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <legend>Por permisos de autor</legend>
                  <Select
                    inputId="permission"
                    placeholder="Selecciona una opción"
                    defaultValue={{
                      value: formData.permission,
                      label: formData.permission,
                    }}
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
