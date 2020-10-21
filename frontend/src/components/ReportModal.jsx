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
  Input,
  Label,
} from "reactstrap";
import { connect } from "react-redux";
import { gallery } from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./reportModal.css";
import { selectReportComplete, 
          selectUserIsAuthenticated,
          selectReportPhotoReportSent,} from "../reducers";

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
        content: [],
      },
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      sent: false,
    });
    setTimeout(this.props.resetReport, 1000);
  };

  updateReport = (e) => {
    var arr;
    if (e.target.checked) {
      arr = this.state.formData.content.slice();
      arr.push(e.target.value);
      this.setState({ formData: { ...this.state.formData, content: arr } });
    } else {
      arr = this.state.formData.content.filter((el) => el !== e.target.value);
      this.setState({ formData: { ...this.state.formData, content: arr } });
    }
  };

  sendReport = () => {
    this.setState({ sent: true });
    var form = { ...this.state.formData, id: this.props.elementId };
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
      options,
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
            <Label>Problemas</Label>
            {options.map((opt, key) => (
              <FormGroup check>
                <Label check>
                  <Input
                    key={`option-${key}`}
                    type="checkbox"
                    id={`option-${key}`}
                    value={opt}
                    onClick={this.updateReport}
                  />{" "}
                  {opt}
                </Label>
              </FormGroup>
            ))}
          </FormGroup>
        </Form>
      </Fragment>
    );

    return (
      <Fragment>
        <Button
          className={className}
          onClick={this.toggle}
          style={style}
          color="danger"
        >
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
                  <div className="report-modal-content">
                    <h5>Enviando reporte</h5>
                    <LeitSpinner />
                  </div>
                ) : reportComplete ? (
                  <div className="report-modal-content">
                    <h5>¡Reporte enviado!</h5>
                  </div>
                ) : (
                  <div className="report-modal-content">
                    <h5>Hubo un problema al hacer el reporte</h5>
                    <p>Intentalo nuevamente</p>
                    <Button>Reiniciar</Button>
                  </div>
                )
              ) : (
                ReportForm
              )
            ) : (
              <div
                className="report-modal-content"
                style={{ padding: "100px 0" }}
              >
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
  style: PropTypes.object, // Optional
};

const mapStateToProps = (state) => ({
  photoReportSent: selectReportPhotoReportSent(state),
  reportComplete: selectReportComplete(state),
  isAuth: selectUserIsAuthenticated(state),
});

const mapActionToProps = (dispatch) => ({
  reportPhoto: (data) => dispatch(gallery.reports.reportPhoto(data)),
  resetReport: () => dispatch(gallery.reports.reportPhotoReset()),
});

export default connect(mapStateToProps, mapActionToProps)(ReportModal);
