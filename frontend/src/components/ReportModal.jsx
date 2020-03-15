import React, { Component, Fragment } from "react";
import { LeitSpinner } from "./index";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  CustomInput,
  Label
} from "reactstrap";
import { connect } from "react-redux";
import { photoDetails } from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * Report Modal for all 3 types of report
 *
 * If the user is not authenticated the window dialog will be different
 * @params {Number} reportType
 * @params {Number} elementId
 * @params {Boolean} isAuth
 * @params {Array} options
 * @params {String} helpText
 * @params {reportTitle}
 */
class ReportModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      sent: false,
      formData: {
        id: props.elementId,
        type: String(props.reportType),
        content: []
      }
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      sent: false
    });
    setTimeout(this.props.resetReport, 1000);
  };

  updateReport = e => {
    var arr;
    if (e.target.checked) {
      arr = this.state.formData.content.slice();
      arr.push(e.target.value);
      this.setState({ formData: { ...this.state.formData, content: arr } });
    } else {
      arr = this.state.formData.content.filter(el => el !== e.target.value);
      this.setState({ formData: { ...this.state.formData, content: arr } });
    }
  };

  sendReport = () => {
    this.setState({ sent: true });
    var form = { ...this.state.formData };
    form.content = form.content.join(", ");
    this.props.reportPhoto(form);
  };

  render() {
    const {
      style,
      className,
      photoReportSent,
      reportComplete,
      reportTitle,
      helpText,
      options
    } = this.props;

    var ReportForm = (
      <Fragment>
        <p>
          {helpText
            ? helpText
            : "Si consideras que hay un problema con esta fotografía por favor envíamos un reporte mediante este formulario."}
        </p>
        <Form>
          <FormGroup>
            <Label for="exampleCheckbox">Problemas</Label>
            <div>
              {options.map((opt, key) => (
                <CustomInput
                  key={`option-${key}`}
                  type="checkbox"
                  id={`option-${key}`}
                  value={opt}
                  label={opt}
                  onClick={this.updateReport}
                />
              ))}
            </div>
          </FormGroup>
        </Form>
      </Fragment>
    );

    return (
      <Fragment>
        <Button className={className} onClick={this.toggle} style={style}>
          <FontAwesomeIcon icon={faFlag} />
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            {reportTitle ? reportTitle : "Reportar fotografia"}
          </ModalHeader>
          <ModalBody>
            {this.props.isAuth ? (
              this.state.sent ? (
                !photoReportSent ? (
                  <div style={{ textAlign: "center" }}>
                    <h5>Enviando reporte</h5>
                    <LeitSpinner />
                  </div>
                ) : reportComplete ? (
                  <div style={{ textAlign: "center" }}>
                    <h5>¡Reporte enviado!</h5>
                  </div>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <h5>Hubo un problema al hacer el reporte</h5>
                    <p>Intentalo nuevamente</p>
                    <Button>Reiniciar</Button>
                  </div>
                )
              ) : (
                ReportForm
              )
            ) : (
              <div style={{ textAlign: "center", padding: "100px 0" }}>
                <h4>Debes ingresar a la plataforma para poder reportar</h4>
                <Link to="/login" className="btn bnt-block btn-primary">
                  Ingresar
                </Link>
              </div>
            )}
          </ModalBody>
          {this.props.isAuth ? (
            <ModalFooter>
              {!this.state.sent && !photoReportSent ? (
                <Fragment>
                  <Button color="primary" onClick={this.sendReport}>
                    Reportar
                  </Button>
                  <Button color="secondary" onClick={this.toggle}>
                    Cancelar
                  </Button>
                </Fragment>
              ) : (
                <Button color="secondary" onClick={this.toggle}>
                  Cerrar
                </Button>
              )}
            </ModalFooter>
          ) : null}
        </Modal>
      </Fragment>
    );
  }
}

ReportModal.propTypes = {
  reportType: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  reportTitle: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  helpText: PropTypes.string.isRequired,
  style: PropTypes.object // Optional
};

const mapStateToProps = state => ({
  photoReportSent: state.photoDetails.photoReportSent,
  reportComplete: state.photoDetails.reportComplete,
  isAuth: state.auth.isAuthenticated
});

const mapActionToProps = dispatch => ({
  reportPhoto: data => dispatch(photoDetails.reportPhoto(data)),
  resetReport: () => dispatch(photoDetails.reportPhotoReset())
});

export default connect(mapStateToProps, mapActionToProps)(ReportModal);