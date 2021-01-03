import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
  Button,
} from "reactstrap";
import { connect } from "react-redux";
import { gallery } from "../../../actions";
import { bindActionCreators } from "redux";
import {
  selectCategoriesError,
  selectCategoriesOpsCompleted,
} from "../../../reducers";

const DeleteModal = ({
  toggle,
  setToggle,
  toDelete,
  removeCategories,
  setOps,
  completed,
  errors,
}) => {
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (toggle) {
      setOps(toDelete.length);
    }
    // eslint-disable-next-line
  }, [toggle]);

  const onDelete = () => {
    setSending(true);
    toDelete.forEach((el) => {
      removeCategories(el);
    });
  };

  useEffect(() => {
    if (errors === "" && sending) {
      setSending(false);
      setToggle(!toggle);
    }
    // eslint-disable-next-line
  }, [completed, errors]);

  return (
    <Modal isOpen={toggle} toggle={() => setToggle(!toggle)}>
      <ModalHeader>
        ¿Est&aacute;s seguro(a) que quieres eliminar la(s) categoría(s)?
      </ModalHeader>
      <ModalBody>
        No se eliminar&aacute;n las fotos asociadas, sólo la categoría. Esta
        acción no se puede deshacer.
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={onDelete}>
          {sending ? <Spinner style={{ width: "1rem", height: "1rem" }} /> : ""}{" "}
          Eliminar
        </Button>
        <Button onClick={() => setToggle(!toggle)}>Cancelar</Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  completed: selectCategoriesOpsCompleted(state),
  errors: selectCategoriesError(state),
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      setOps: gallery.category.setNBOps,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(DeleteModal);
