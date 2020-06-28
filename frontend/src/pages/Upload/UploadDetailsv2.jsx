import React, { Component } from "react";
import ReactTags from "react-tag-autocomplete";
import {
  Button,
  ButtonGroup,
  Form,
  FormGroup,
  Label,
  Input,
  Collapse,
  Card,
  CardBody,
} from "reactstrap";

const CC_INFO = [
  { name: "CC BY", text: "Atribución" },
  { name: "CC BY-SA", text: "Atribución, Compartir Igual" },
  { name: "CC BY-ND", text: "Atribución, Sin Derivadas" },
  { name: "CC BY-NC", text: "Atribución, No Comercial" },
  { name: "CC BY-NC-SA", text: "Atribución, No Comercial, Compartir Igual" },
  { name: "CC BY-NC-ND", text: "Atribución, No Comercial, Sin Derivadas" },
];

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

class UploadDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.meta,
      collapse: false,
    };

    // Prepare File Reader for preview management
    this.fr = new FileReader();
    this.fr.onload = (function (theFile) {
      return function (e) {
        // Get data from image
        let img = new Image();
        img.onload = function () {
          var gcd_value = gcd(img.height, img.width);
          this.setState({
            height: img.height,
            width: img.width,
            aspect_h: img.height / gcd_value,
            aspect_w: img.width / gcd_value,
          });
        }.bind(this);
        img.src = e.target.result;

        // Render thumbnail.
        this.setState({ src: e.target.result });
      };
    })(props.photo).bind(this);
    this.fr.readAsDataURL(this.props.photo);
  }

  updateData = (e) => this.setState({ [e.target.name]: e.target.value });

  updateDesc = (e) => {
    this.setState({ description: e.target.value }, () =>
      this.props.save(this.state)
    );
  };

  toggle = () => {
    this.setState((state) => ({ collapse: !state.collapse }));
  };

  additionTag = (tag) => {
    const tags = [].concat(this.state.tags, tag);
    this.setState({ tags: tags });
  };

  deleteTag = (i) => {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.collapse === true) {
      this.toggle();
    }
    let mapped_tags = this.state.tags.map((tag) => ({
      value: tag.name.trim(),
      id: tag.id,
    }));
    this.props.save({ ...this.state, tags: mapped_tags });
  };

  onDelete = (e) => {
    this.props.delete(this.state);
  };

  render() {
    return (
      <Card
        style={{
          border: "1px solid rgb(210,214,218)",
          maxWidth: "30.5%",
        }}
        className="white-box"
      >
        <img width="100%" src={this.state.src} alt="Thumbnail" />
        <CardBody>
          <Form>
            <FormGroup>
              <Label>Descripcion:</Label>
              <Input
                type="textarea"
                placeholder="Historia asociada a la foto"
                name="description"
                onChange={this.updateDesc}
                value={this.state.description}
                required
                valid={this.state.description.length > 8}
                invalid={this.state.description.length < 8}
              />
            </FormGroup>
            <ButtonGroup>
              <Button color="danger" onClick={this.onDelete}>
                Eliminar
              </Button>
              <Button onClick={this.toggle}>
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
          <Collapse
            isOpen={this.state.collapse}
            style={{ width: "100%", marginTop: "1em" }}
          >
            <Form>
              <FormGroup style={styles.hr}>
                <Label>Informaci&oacute;n adicional</Label>
                <ReactTags
                  placeholder={"Añadir etiquetas"}
                  labelField={"value"}
                  autoresize={false}
                  allowNew={true}
                  tags={this.state.tags}
                  suggestions={this.props.suggestions}
                  handleDelete={this.deleteTag}
                  handleAddition={this.additionTag}
                  handleInputChange={this.props.search}
                />
              </FormGroup>
              <FormGroup>
                <div style={styles.hr}>
                  <Label for="CreativeCommons">
                    Permisos de acceso e intercambio
                  </Label>
                </div>
                <FormGroup>
                  <Input
                    type="select"
                    name="cc"
                    id="exampleSelect"
                    onChange={this.updateData}
                  >
                    {CC_INFO.map((el, k) => (
                      <option key={k} value={el.name}>
                        {el.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </FormGroup>
              <FormGroup style={styles.hr}>
                <Label for="title">Titulo de la fotograf&iacute;a</Label>
                <Input
                  type="text"
                  name="title"
                  placeholder="Ceremonia de premiación..."
                  onChange={this.updateData}
                />
              </FormGroup>
            </Form>
          </Collapse>
        </CardBody>
      </Card>
    );
  }
}

const styles = {
  hr: {
    marginBottom: "1em",
  },
};

export default UploadDetails;