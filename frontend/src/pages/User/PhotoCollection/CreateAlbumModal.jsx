import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Col,
  FormGroup,
  Input,
  Form,
  Spinner,
  FormText,
} from "reactstrap";

import { gallery } from "../../../actions";

function CreateAlbumModal(props) {
  const [toggle, setToggle] = useState(false);
  const [sending, setSending] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    setName("");
    setDescription("");
    setCollection(false);
  }, [toggle]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [collection, setCollection] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const createAlbum = (event) => {
    event.preventDefault();
    setSending(true);
    props
      .newAlbum({ name, description, collection, pictures: props.photosID })
      .then((r) => {
        setSending(false);
        handleToggle();
        setShouldRedirect(true);
      });
  };
  return shouldRedirect ? (
    <Redirect to="/user/dashboard/albums" />
  ) : (
    <div>
      <Button
        disabled={props.photosID.length === 0}
        color="secondary"
        onClick={handleToggle}
      >
        Crear álbum
      </Button>
      <Modal isOpen={toggle} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Creando álbum</ModalHeader>
        <Form onSubmit={createAlbum}>
          <ModalBody>
            <FormGroup row>
              <Label for="size" sm={4}>
                Cantidad de fotos por añadir
              </Label>
              <Col sm={8}>
                <Input
                  name="size"
                  disabled
                  value={props.photosID.length}
                ></Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="name" sm={4}>
                Nombre del álbum
              </Label>
              <Col sm={8}>
                <Input
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  required="true"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="description" sm={4}>
                Descripción del álbum
              </Label>
              <Col sm={8}>
                <Input
                  type="textarea"
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="collection" sm={4}>
                Crear como colección
              </Label>
              <Col sm={8}>
                <input
                  type="checkbox"
                  onClick={() => setCollection(!collection)}
                  id="collection"
                  class="toggle-button"
                />
                <label for="collection"></label>
              </Col>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <FormText color="muted">Podrá editarlo en Mis albumes</FormText>
            <Button color="primary">
              {sending ? (
                <Spinner style={{ width: "1rem", height: "1rem" }} />
              ) : (
                ""
              )}{" "}
              Crear
            </Button>
            <Button color="secondary" onClick={handleToggle}>
              Cancelar
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  albumStatus: state.albumcollection.createAlbum,
});

const mapActionsToProps = (dispatch) => ({
  newAlbum: (formData) => dispatch(gallery.album.createAlbum(formData)),
});

export default connect(mapStateToProps, mapActionsToProps)(CreateAlbumModal);
