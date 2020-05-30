import React, { useState } from "react";
import {
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import { connect } from "react-redux";

const ModifyModal = ({ selected, op, iptcs, del, mod, toggle, open, hola }) => {
  const [state, setState] = useState({
    working: false,
    done: false,
    checked: false,
    value: "",
    iptc: -1,
  });

  const doOp = () => {
    switch (op) {
      case "Eliminar":
        break;
      case "Modificar Selección":
        break;
      case "Unir/Consolidar":
        break;
      default:
        console.error("Something went wrong, I'm not supposed to be here :c");
        break;
    }
  };

  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader toggle={toggle}>{op}</ModalHeader>
      <ModalBody>
        {selected.length < 1 ? (
          "Seleccione al menos un elemento"
        ) : op === "Eliminar" ? (
          "Esta operación borrará las etiquetas y eliminará todas las referencias en sus fotos."
        ) : op === "Modificar Selección" ? (
          <Form>
            Los elementos seran sobrescribidos
            <FormGroup>
              <CustomInput
                type="checkbox"
                id="aprobarCheckbox"
                label="Aprobación"
                value={state.checked}
                onClick={() => setState((s) => ({ ...s, checked: !s.checked }))}
              />
            </FormGroup>
            {selected.length === 1 ? (
              <FormGroup row>
                <Label for="valueInput" sm={2}>
                  Valor
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    placeholder="valor"
                    id="valueInput"
                    value={state.value}
                    onChange={(e) => {
                      const target = e.target;
                      setState((s) => ({ ...s, value: target.value }));
                    }}
                  />
                </Col>
              </FormGroup>
            ) : null}
            <FormGroup row>
              <Label for="selectIPTC" sm={2}>
                IPTC
              </Label>
              <Col sm={10}>
                <Input
                  type="select"
                  name="selectIPTC"
                  id="selectIPTC"
                  onChange={(e) => {
                    const target = e.target;
                    setState((s) => ({
                      ...s,
                      iptc: Number(target.options[target.selectedIndex].value),
                    }));
                  }}
                >
                  {iptcs.map((ip) => (
                    <option value={ip.id}>{ip.name}</option>
                  ))}
                </Input>
              </Col>
            </FormGroup>
          </Form>
        ) : (
          "not implemented"
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Volver
        </Button>
        {selected.length >= 1 ? (
          <Button
            color={op === "Eliminar" ? "danger" : "success"}
            onClick={doOp}
          >
            Confirmar
          </Button>
        ) : null}
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  hola: state.metadata,
});

export default connect(mapStateToProps)(ModifyModal);
