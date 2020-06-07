import React, { useState, useEffect, Fragment } from "react";
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
import { metadata } from "../../../../actions";
import { LeitSpinner } from "../../../../components";

const ModifyModal = ({
  selected,
  op,
  iptcs,
  completed,
  errors,
  deleteMeta,
  putMeta,
  mergeMeta,
  doReload,
  setOps,
  toggle,
  open,
}) => {
  const [state, setState] = useState({
    editing: true,
    done: false,
    checked: false,
    value: "",
    iptc: -1,
  });

  const doOp = () => {
    setState((s) => ({ ...s, editing: false }));
    switch (op) {
      case "Eliminar":
        selected.forEach((element) => {
          deleteMeta(element.id);
        });
        break;
      case "Modificar Selección":
        selected.forEach((element) => {
          var copy = { ...element };
          if (state.value !== "") {
            copy.value = state.value;
          }
          copy.approved = state.checked;
          copy.metadata = state.iptc;
          putMeta(copy);
        });
        break;
      case "Unir/Consolidar":
        let ids = [];
        selected.forEach((element) => {
          ids.push(element.id);
        });
        mergeMeta(ids);
        break;
      default:
        console.error("Something went wrong, I'm not supposed to be here :c");
        break;
    }
  };

  useEffect(() => {
    if (!open) {
      if (state.done) {
        var d = new Date();
        doReload(d.getTime());
      }
      setState((s) => ({ ...s, editing: true, done: false }));
    } else {
      setOps(selected.length);
    }
    // eslint-disable-next-line
  }, [open]);

  useEffect(() => {
    if (completed + errors.length >= selected.length) {
      setState((s) => ({ ...s, done: true }));
    }
    // eslint-disable-next-line
  }, [completed, errors, selected]);

  // Set default IPTC id
  useEffect(() => {
    setState((s) => ({ ...s, iptc: iptcs[0].id }));
  }, [iptcs]);

  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader toggle={toggle}>{op}</ModalHeader>
      {state.editing ? (
        <Fragment>
          <ModalBody>
            {selected.length < 1 ? (
              "Seleccione al menos un elemento"
            ) : op === "Eliminar" ? (
              "Esta operación borrará las etiquetas y eliminará todas las referencias en sus fotos."
            ) : op === "Modificar Selección" ? (
              <Form>
                Los elementos seran sobreescritos
                <FormGroup>
                  <CustomInput
                    type="checkbox"
                    id="aprobarCheckbox"
                    label="Aprobación"
                    value={state.checked}
                    onClick={() =>
                      setState((s) => ({ ...s, checked: !s.checked }))
                    }
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
                          iptc: Number(
                            target.options[target.selectedIndex].value
                          ),
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
              <div style={{ textAlign: "center" }}>
                Las etiquetas seran ahora y sus fotograf&iacute;as tendran
                s&oacute;lo esta etiqueta.
                <b>{selected[0].value}</b>
              </div>
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
        </Fragment>
      ) : state.done ? (
        errors.length === 0 ? (
          <ModalBody style={{ textAlign: "center" }}>
            Operaci&oacute;n completada
          </ModalBody>
        ) : (
          <ModalBody style={{ textAlign: "center" }}>
            Algunas operaciones fallaron, reintenta mas tarde.
          </ModalBody>
        )
      ) : (
        <ModalBody style={{ textAlign: "center" }}>
          <LeitSpinner />
          Enviando petici&oacute;n
        </ModalBody>
      )}
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  completed: state.metadata.opsCompleted,
  errors: state.metadata.opsErrors,
});

const mapActionsToProps = (dispatch) => ({
  putMeta: (meta) => dispatch(metadata.putMetadata(meta)),
  deleteMeta: (id) => dispatch(metadata.deleteMetadata(id)),
  mergeMeta: (ids) => dispatch(metadata.mergeMetadata(ids)),
  setOps: (ops) => dispatch(metadata.setNBOps(ops)),
});

export default connect(mapStateToProps, mapActionsToProps)(ModifyModal);
