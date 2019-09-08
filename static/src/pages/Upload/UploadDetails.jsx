import React, { Component } from "react";
import ReactTags from "react-tag-autocomplete";
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Form,
  FormGroup,
  Label,
  Input,
  Collapse
} from "reactstrap";

var autosave_desc = null;

const CC_INFO = [
  { name: "CC BY", text: "Atribución" },
  { name: "CC BY-SA", text: "Atribución, Compartir Igual" },
  { name: "CC BY-ND", text: "Atribución, Sin Derivadas" },
  { name: "CC BY-NC", text: "Atribución, No Comercial" },
  { name: "CC BY-NC-SA", text: "Atribución, No Comercial, Compartir Igual" },
  { name: "CC BY-NC-ND", text: "Atribución, No Comercial, Sin Derivadas" }
];

const gcd = (a, b) => (b == 0 ? a : gcd(b, a % b));

class UploadDetails extends Component {
  constructor(Props) {
    super(Props);
    this.state = {
      ...Props.meta,
      collapse: false
    };

    this.toggle = this.toggle.bind(this);

    // Prepare File Reader for preview management
    this.fr = new FileReader();
    this.fr.onload = (function(theFile) {
      return function(e) {

        // Get data from image
        let img = new Image();
        img.onload = function() {
          var gcd_value = gcd(img.height, img.width);
          this.setState({
            height: img.height,
            width: img.width,
            aspect_h: img.height / gcd_value,
            aspect_w: img.width / gcd_value
          });
        }.bind(this);
        img.src = e.target.result;

        // Render thumbnail.
        this.setState({ src: e.target.result });
      };
    })(Props.photo).bind(this);
    this.updateData = this.updateData.bind(this);
  }

  updateData = e => this.setState({ [e.target.name]: e.target.value });

  updateDesc = e => {
    this.setState({ description: e.target.value }, () => this.props.save(this.state));
  };

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  additionTag(tag) {
    const tags = [].concat(this.state.tags, tag);
    this.setState({ tags: tags });
  }

  deleteTag(i) {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags });
  }

  onSubmit = e => {
    e.preventDefault();
    if (this.state.collapse === true) {
      this.toggle();
    }
    this.props.save(this.state);
  };

  onDelete = e => {
    this.props.delete(this.state);
  };

  componentWillMount() {
    this.fr.readAsDataURL(this.props.photo);
  }

  render() {
    return (
      <Container
        style={{
          marginTop: "20px",
          backgroundColor: "#dceaf7",
          borderRadius: "10px",
          border: "1px solid rgb(156,158,159)",
          boxShadow: "2px 2px 4px rgb(156,158,159)"
        }}
        fluid>
        <Row>
          <Col md="3">
            <img style={styles.thumb} src={this.state.src} />
          </Col>
          <Col md="9" style={{ padding: "20px" }}>
            <Form>
              <FormGroup>
                <Label style={{ color: "#848687" }}>Descripcion:</Label>
                <Input
                  type="textarea"
                  placeholder="Historia asociada a la foto"
                  name="description"
                  onChange={this.updateDesc}
                  value={this.state.description}
                  required
                />
              </FormGroup>
              <ButtonGroup>
                <Button color="danger" onClick={this.onDelete}>
                  Eliminar
                </Button>
                <Button color="primary" onClick={this.toggle}>
                  {this.state.collapse
                    ? "Descartar cambios"
                    : "Información por separado"}{" "}
                </Button>
                {this.state.collapse ? (
                  <Button color="success" onClick={this.onSubmit}>
                    Guardar cambios
                  </Button>
                ) : null}
              </ButtonGroup>
            </Form>
          </Col>
        </Row>
        <Row>
          <Collapse
            isOpen={this.state.collapse}
            style={{ width: "100%", marginBottom: "1em" }}>
            <Container fluid>
              <Row>
                <Col sm="12" md="4">
                  <div style={styles.hr}>
                    <Label style={{ color: "#848687" }}>
                      Informaci&oacute;n adicional
                    </Label>
                  </div>
                  <ReactTags
                    placeholder={"Añadir etiquetas"}
                    autoresize={false}
                    allowNew={true}
                    tags={this.state.tags}
                    suggestions={this.props.suggestions}
                    handleDelete={this.deleteTag.bind(this)}
                    handleAddition={this.additionTag.bind(this)}
                  />
                </Col>
                <Col sm="6" md="4">
                  <FormGroup>
                    <div style={styles.hr}>
                      <Label style={{ color: "#848687" }} for="CreativeCommons">
                        Permisos de acceso e intercambio
                      </Label>
                    </div>
                    <FormGroup>
                      <Input
                        type="select"
                        name="cc"
                        id="exampleSelect"
                        onChange={this.updateData}>
                        {CC_INFO.map((el, k) => (
                          <option value={el.name}>{el.name}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </FormGroup>
                </Col>
                <Col sm="6" md="4">
                  <div style={styles.hr}>
                    <Label style={{ color: "#848687" }} for="title">
                      Titulo de la fotograf&iacute;a
                    </Label>
                  </div>
                  <Input
                    type="text"
                    name="title"
                    placeholder="Ceremonia de premiación..."
                    onChange={this.updateData}
                  />
                </Col>
              </Row>
            </Container>
          </Collapse>
        </Row>
      </Container>
    );
  }
}

const styles = {
  thumb: {
    height: "85px",
    marginTop: "20px",
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow: "5px 5px 5px #3c4145"
  },
  hr: {
    borderBottom: "1px solid rgb(156,158,159)",
    marginBottom: "10px"
  }
};

export default UploadDetails;
