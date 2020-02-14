import React, { Component, Fragment } from "react";
import LeitSpinner from "./LeitSpinner";
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

class ReportModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      sent: false,
      formData: {
        id: props.photoId,
        type: String(props.reportType),
        content: []
      }
    };
    this.toggle = this.toggle.bind(this);
    this.updateReport = this.updateReport.bind(this);
    this.sendReport = this.sendReport.bind(this);
  }

  componentWillMount() {}

  toggle() {
    this.setState({
      modal: !this.state.modal,
      sent: false
    });
    setTimeout(this.props.resetReport, 1000);
  }

  updateReport(e) {
    var arr;
    if (e.target.checked) {
      arr = this.state.formData.content.slice();
      arr.push(e.target.value);
      this.setState({ formData: { ...this.state.formData, content: arr } });
    } else {
      arr = this.state.formData.content.filter(el => el !== e.target.value);
      this.setState({ formData: { ...this.state.formData, content: arr } });
    }
  }

  sendReport() {
    this.setState({ sent: true });
    var form = { ...this.state.formData };
    form.content = form.content.join(", ");
    this.props.reportPhoto(form);
  }

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
            {this.state.sent ? (
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
            )}
          </ModalBody>
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
  reportComplete: state.photoDetails.reportComplete
});

const mapActionToProps = dispatch => ({
  reportPhoto: data => dispatch(photoDetails.reportPhoto(data)),
  resetReport: () => dispatch(photoDetails.reportPhotoReset())
});

export default connect(mapStateToProps, mapActionToProps)(ReportModal);
