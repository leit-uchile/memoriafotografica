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
import {
  selectUserPublicUser,
  selectUserPublicStatus,
} from "../../../reducers";
import moment from "moment";
import { LeitSpinner, UserPicture } from "../../../components";

const EditUserModal = ({
  report,
  isOpen,
  handleToggle,
  itemStatus,
  updating,
  editUser,
  userDetails,
  getUser,
}) => {
  const [formData, setData] = useState({});
  const [deletePhoto, setDeletePhoto] = useState(false);

  useEffect(() => {
    if (isOpen) {
      getUser(report.content_id.id);
    }
    // eslint-disable-next-line
  }, [isOpen]);

  useEffect(() => {
    let info = { ...userDetails, upload_date: moment(Date(Date.now())) };
    setData(info);
    setDeletePhoto(false);
  }, [userDetails]);

  const updateData = (e) =>
    setData({ ...formData, [e.target.name]: e.target.value });

  const onSend = () => {
    let info = { ...formData };
    deletePhoto ? (info.avatar = null) : delete info.avatar;
    delete info.notifications;
    editUser(info)
  };
  return (
    <div>
      <Modal isOpen={isOpen} toggle={() => handleToggle()} size={"lg"}>
        <ModalHeader toggle={() => handleToggle()}>Editar usuario</ModalHeader>
        <ModalBody>
          {itemStatus === "idle" || updating === "success"  ? (
            <span></span>
          ) : itemStatus === "loading" || updating === "loading" ? (
            <Row>
              <Col style={{ textAlign: "center" }}>
                <LeitSpinner />
              </Col>
            </Row>
          ) : itemStatus === "success" ? (
            <Form>
              {formData.avatar !== null ? (
                <Fragment>
                  <FormGroup
                    row
                    style={{
                      lineHeight: "50%",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Col>
                      <UserPicture
                        user={formData}
                        dims={100}
                        render={() => (
                          <img
                            height="100"
                            width="100"
                            style={{
                              borderRadius: "50%",
                            }}
                            src={formData.avatar}
                            alt="user-avatar"
                          />
                        )}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="photo" sm={3}>
                      Eliminar foto de perfil{" "}
                    </Label>
                    <Col sm={9}>
                      <input
                        type="checkbox"
                        className="toggle-button"
                        id="photo"
                        checked={deletePhoto}
                        onChange={() => setDeletePhoto(!deletePhoto)}
                      />
                      <label htmlFor="photo"></label>
                    </Col>
                  </FormGroup>
                </Fragment>
              ) : (
                <FormGroup row>
                  <Label sm={12}>Usuario sin fotografía</Label>
                </FormGroup>
              )}
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
          ) : (
            <p>Ha ocurrido un error</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => onSend()}>
            Guardar cambios
          </Button>
          <Button color="secondary" onClick={() => handleToggle()}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userDetails: selectUserPublicUser(state),
  itemStatus: selectUserPublicStatus(state),
});

const mapActionsToProps = (dispatch) => ({
  getUser: (pk) => dispatch(user.loadAUser(pk)),
});

export default connect(mapStateToProps, mapActionsToProps)(EditUserModal);
