import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Row,
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const EditUserModal = ({
  report,
  isOpen,
  handleToggle,
  editUser,
  userDetails,
  getUser,
}) => {
  const [formData, setData] = useState({}); //nuevos datos

  useEffect(() => {
    getUser(report.content_id.id);
  }, [report]);

  useEffect(() => {
    let info = { ...userDetails };
    setData(info);
  }, [userDetails, report, isOpen]);

  const updateData = (e) =>
    setData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div>
      <Modal isOpen={isOpen} toggle={() => handleToggle()} size={"lg"}>
        <ModalHeader toggle={() => handleToggle()}>
          Editar usuario
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Row>
                <Col>
                  <Label>Eliminar foto de perfil</Label>
                </Col>
                <Col>
                  <FontAwesomeIcon
                    icon={faCamera}
                    style={{
                      color: "var(--leit-red)",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Label>Nombre</Label>
                </Col>
                <Col>
                  <Input
                    type="text"
                    placeholder="Nombre del usuario"
                    name="first_name"
                    onChange={updateData}
                    value={formData.first_name}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Label>Apellido</Label>
                </Col>
                <Col>
                  <Input
                    type="text"
                    placeholder="Apellido del usuario"
                    name="last_name"
                    onChange={updateData}
                    value={formData.last_name}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Label>Rol</Label>
                </Col>
                <Col>
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
              </Row>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          {!false ? (
            <Fragment>
              <Button color="primary" onClick={() => editUser(formData)}>
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
