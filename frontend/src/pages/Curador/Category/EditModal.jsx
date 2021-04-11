import React, { Fragment, useState, useEffect } from "react";
import {
  Form,
  FormGroup,
  Col,
  Input,
  Button,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { gallery } from "../../../actions";
import { bindActionCreators } from "redux";

const EditModal = ({ catDetails, updateCategory }) => {
  const [toggle, setToggle] = useState(false);
  const [title, setTitle] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    setTitle(catDetails.title);
  }, [catDetails]);

  const update = () => {
    setSending(true);
    updateCategory({ ...catDetails, title: title }).then((r) => {
      setSending(false);
      setToggle(!toggle);
    });
  };

  return (
    <Fragment>
      <Button color="primary" onClick={() => setToggle(!toggle)}>
        Editar <FontAwesomeIcon icon={faEdit} />
      </Button>
      <Modal isOpen={toggle} toggle={() => setToggle(!toggle)}>
        <ModalHeader toggle={() => setToggle(!toggle)}>
          Modificar Categoria: {catDetails.title}
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="title" sm={3}>
                {" "}
                Nombre
              </Label>
              <Col sm={9}>
                <Input
                  type="text"
                  placeholder="Nuevo nombre"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength="30"
                />
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={update}>
            {sending ? (
              <Spinner style={{ width: "1rem", height: "1rem" }} />
            ) : (
              ""
            )}{" "}
            Guardar cambios
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      updateCategory: gallery.category.updateCategory,
    },
    dispatch
  );

export default connect(null, mapActionsToProps)(EditModal);
