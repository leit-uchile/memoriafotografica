import React, { Component, Fragment } from "react";
import LeitSpinner from "../../components/LeitSpinner";
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
import { photoDetails } from "../../actions";

class ReportModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      sent: false,
      formData: {
        id: props.photoId,
        type: "2", // Photo
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
      sent: false,
    });
    setTimeout(this.props.resetReport, 1000);
  }

  updateReport(e) {
    if (e.target.checked) {
      var arr = this.state.formData.content.slice();
      arr.push(e.target.value);
      this.setState({ formData: { ...this.state.formData, content: arr } });
    } else {
      var arr = this.state.formData.content.filter(el => el != e.target.value);
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
    const labelStyle = { display: "block" };
    const { style, className, photoReportSent, reportComplete } = this.props;

    var ReportForm = (
      <Fragment>
        <p>
          Si consideras que hay un problema con esta fotograf&iacute;a por favor
          env&iacute;amos un reporte mediante este formulario.
        </p>
        <Form>
          <FormGroup>
            <Label for="exampleCheckbox">Problemas</Label>
            <div>
              <CustomInput
                type="checkbox"
                id="p1"
                value="Contenido inapropiado"
                label="Contenido inapropiado"
                onClick={this.updateReport}
              />
              <CustomInput
                type="checkbox"
                id="p2"
                value="Incita a la violencia"
                label="Incita a la violencia"
                onClick={this.updateReport}
              />
              <CustomInput
                type="checkbox"
                id="p3"
                value="Usuario no es autor del contenido"
                label="Usuario no es autor del contenido"
                onClick={this.updateReport}
              />
            </div>
          </FormGroup>
        </Form>
      </Fragment>
    );

    return (
      <div className={className} style={style}>
        <Button onClick={this.toggle}>¿Algo anda mal?</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Reportar fotografia</ModalHeader>
          <ModalBody>
            {this.state.sent ? (
              !photoReportSent ? (
                <div style={{ textAlign: "center" }}>
                  <h5>Enviando reporte</h5>
                  <LeitSpinner />
                </div>
              ) : reportComplete ? (
                <div style={{ textAlign: "center" }}>
                  <h5>¡Fotograf&iacute;a reportada!</h5>
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  photoReportSent: state.photoDetails.photoReportSent,
  reportComplete: state.photoDetails.reportComplete
});

const mapActionToProps = dispatch => ({
  reportPhoto: data => dispatch(photoDetails.reportPhoto(data)),
  resetReport: () => dispatch(photoDetails.reportPhotoReset())
});

export default connect(
  mapStateToProps,
  mapActionToProps
)(ReportModal);
