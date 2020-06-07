import React, { Fragment, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
  Button,
} from "reactstrap";

export const ModifyModal = ({ toDelete, loading, removeCategories }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <Fragment>
      <Button
        onClick={() => setToggle((s) => !s)}
        color={toDelete.length ? "danger" : "secondary"}
        disabled={!toDelete.length}
      >
        Eliminar ({toDelete.length}) Categorías
      </Button>
      <Modal isOpen={toggle} toggle={() => setToggle((s) => !s)}>
        <ModalHeader>
          ¿Est&aacute;s seguro(a) que quieres eliminar la(s) categoría(s)?
        </ModalHeader>
        <ModalBody>
          No se eliminar&aacute;n las fotos asociadas, sólo la categoría. Esta
          acción no se puede deshacer.
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={removeCategories}>
            {" "}
            Eliminar{" "}
            <Spinner
              size="sm"
              color="light"
              style={{
                display: loading ? "inline-block" : "none",
              }}
            />{" "}
          </Button>
          <Button onClick={() => setToggle((s) => !s)}>Volver</Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};
