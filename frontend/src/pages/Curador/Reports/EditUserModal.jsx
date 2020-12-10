import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  FormGroup,
  Input,
  Form,
} from "reactstrap";
import { user } from "../../../actions";
import moment from "moment";

const EditUserModal = ({
  report,
  isOpen,
  handleToggle,
  editUser,
  userDetails,
  getUser,
}) => {
  const [formData, setData] = useState({});
  const [deletePhoto, setDelete] = useState(false);

  useEffect(() => {
    getUser(report.content_id.id);
  }, [isOpen]);

  useEffect(() => {
    let info = { ...userDetails, upload_date: moment(Date(Date.now())) };
    setData(info);
  }, [userDetails]);

  const updateData = (e) =>
    setData({ ...formData, [e.target.name]: e.target.value });

  const onSend = () => {
    let info = { ...formData };
    deletePhoto ? (info.avatar = null) : delete info.avatar;
    editUser(info);
  };
  return (
    <div>
      <Modal isOpen={isOpen} toggle={() => handleToggle()} size={"lg"}>
        <ModalHeader toggle={() => handleToggle()}>Editar usuario</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="photo" sm={3}>
                Eliminar foto de perfil{" "}
              </Label>

              <Col sm={9}>
                <input
                  type="checkbox"
                  class="toggle-button"
                  id="photo"
                  checked={deletePhoto}
                  onChange={() => setDelete(!deletePhoto)}
                />
                <label for="photo"></label>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="first_name" sm={3}>
                Nombre{" "}
              </Label>

              <Col sm={9}>
                <Input
                  type="text"
                  placeholder="Nombre del usuario"
                  name="first_name"
                  onChange={updateData}
                  value={formData.first_name}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="last_name" sm={3}>
                Apellido{" "}
              </Label>

              <Col sm={9}>
                <Input
                  type="text"
                  placeholder="Apellido del usuario"
                  name="last_name"
                  onChange={updateData}
                  value={formData.last_name}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="rol_type" sm={3}>
                Rol{" "}
              </Label>

              <Col sm={9}>
                <Input
                  name="rol_type"
                  type="select"
                  onChange={updateData}
                  value={formData.rol_type}
                >
                  <option value="1">Alumno</option>
                  <option value="2">Ex-Alumno</option>
                  <option value="3">Acad&eacute;mico</option>
                  <option value="4">Ex-Acad&eacute;mico</option>
                  <option value="5">Funcionario</option>
                  <option value="6">Externo</option>
                </Input>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          {true ? (
            <Fragment>
              <Button color="primary" onClick={() => onSend()}>
                Guardar cambios
              </Button>
              <Button color="secondary" onClick={() => handleToggle()}>
                Cancelar
              </Button>
            </Fragment>
          ) : (
            <Button color="secondary" onClick={() => handleToggle()}>
              Cerrar
            </Button>
          )}
        </ModalFooter>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userDetails: state.user.publicUser,
});

const mapActionsToProps = (dispatch) => ({
  getUser: (pk) => dispatch(user.loadAUser(pk)),
});

export default connect(mapStateToProps, mapActionsToProps)(EditUserModal);
