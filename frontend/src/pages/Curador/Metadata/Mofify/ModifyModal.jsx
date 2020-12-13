import React, { useState, useEffect } from "react";
import {
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
} from "reactstrap";
import { connect } from "react-redux";
import { metadata } from "../../../../actions";
import { bindActionCreators } from "redux";
import {
  selectMetaDataOpsErrors,
  selectMetaDataOpsCompleted,
} from "../../../../reducers";
import "./modifyModal.css";

const ModifyModal = ({
  setOps,
  open,
  toggle,
  op,
  selected,
  iptcs,
  deleteMeta,
  putMeta,
  mergeMeta,
  completed,
  errors,
}) => {
  const [formData, setData] = useState({});
  const [sending, setSending] = useState(false);

  // Set defaults if only one element is here
  useEffect(() => {
    if (selected.length === 1) {
      setData({
        checked: selected[0].approved,
        value: selected[0].value,
        iptc: selected[0].metadata,
      });
    } else {
      setData({
        checked: false,
        value: "",
        iptc: 1,
      });
    }
  }, [selected, open]);

  useEffect(() => {
    if (open) {
      setOps(selected.length);
    }
    // eslint-disable-next-line
  }, [open]);

  // Set default IPTC id
  // useEffect(() => {
  //   if (iptcs.length !== 0) {
  //     setState((s) => ({ ...s, iptc: iptcs[0].id }));
  //   }
  // }, [iptcs]);

  const onSend = () => {
    setSending(true);
    switch (op) {
      case "Eliminar":
        selected.forEach((element) => {
          deleteMeta(element.id);
        });
        break;
      case "Modificar Selección":
        selected.forEach((element) => {
          var copy = { ...element };
          if (formData.value !== "") {
            copy.value = formData.value;
          }
          copy.approved = formData.checked;
          copy.metadata = formData.iptc;
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
    if (errors.length === 0 && sending) {
      setSending(false);
      toggle();
    }
    // eslint-disable-next-line
  }, [completed, errors]);

  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader toggle={toggle}>{op}</ModalHeader>
      <ModalBody>
        {op === "Eliminar" ? (
          "Esta operación borrará las etiquetas y eliminará todas las referencias en sus fotos."
        ) : op === "Modificar Selección" ? (
          <Form>
            Los elementos seran sobreescritos
            {selected.length === 1 ? (
              <FormGroup row>
                <Label for="value" sm={2}>
                  Valor
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    placeholder="valor"
                    name="value"
                    value={formData.value}
                    onChange={(e) => {
                      setData({ ...formData, [e.target.name]: e.target.value });
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
                  value={formData.iptc}
                  onChange={(e) => {
                    const target = e.target;
                    setData({
                      ...formData,
                      iptc: Number(target.options[target.selectedIndex].value),
                    });
                  }}
                >
                  {iptcs.map((ip) => (
                    <option value={ip.id}>{ip.name}</option>
                  ))}
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="aproved" sm={2}>
                Aprobación
              </Label>
              <Col sm={10}>
                <input
                  type="checkbox"
                  checked={formData.checked}
                  onClick={() =>
                    setData({ ...formData, checked: !formData.checked })
                  }
                  id="approved"
                  class="toggle-button"
                />
                <label for="approved"></label>
              </Col>
            </FormGroup>
          </Form>
        ) : (
          <div className="modify-modal-content">
            Las etiquetas ser&aacute;n fusionadas. Sus fotograf&iacute;as
            tendr&aacute;n la etiqueta:{" "}
            <b>{selected.length > 0 ? selected[0].value : ""}</b>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <Button
          color={op === "Eliminar" ? "danger" : "primary"}
          onClick={() => onSend()}
        >
          {sending ? <Spinner style={{ width: "1rem", height: "1rem" }} /> : ""}{" "}
          Confirmar
        </Button>
        <Button color="secondary" onClick={toggle}>
          Volver
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  completed: selectMetaDataOpsCompleted(state),
  errors: selectMetaDataOpsErrors(state),
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      setOps: metadata.setNBOps,
      putMeta: metadata.putMetadata,
      deleteMeta: metadata.deleteMetadata,
      mergeMeta: metadata.mergeMetadata,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(ModifyModal);
