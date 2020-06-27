import React, { Component } from "react";
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonGroup,
  FormText,
} from "reactstrap";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { base64StringtoFile, extractImageFileExtensionFromBase64 } from './ResuableUtils'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVectorSquare, faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const dimensions = {
  aspect4_3: {
    unit: "%",
    width: 50,
    aspect: 4 / 3,
  },
  aspect16_9: {
    unit: "%",
    width: 50,
    aspect: 16 / 9,
  },
  default: {
    crop: {
      unit: "%",
      width: 50,
      aspect: 1,
    },
    angle: 0,
  },
};

class CropPhoto extends Component {
  constructor(Props) {
    super(Props);
    this.state = {
      modal: this.props.isOpen,
      src: this.props.src,
      crop: dimensions.default.crop,
      angle: dimensions.default.angle,
    };
    this.toggle = this.toggle.bind(this);
    this.rotate = this.rotate.bind(this);
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal, // cierra el modal
    });
    this.props.handleToggle(); // evita que se cierre junto al DropdownButton
  };

  rotate(){
    let newAngle = this.state.angle - 90;
    if(newAngle <= -360){
      newAngle = 360;
    }
    this.setState({
      angle: newAngle,
    })
  }

  onSave = () => {
    let image = new Image();
    image.src = this.state.src;
    let newAvatar = this.getCroppedImgAsString(image, this.state.crop, "avatarCropped");
    this.props.saveAvatar(newAvatar);
    this.toggle();
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
    }
  }

  /**
   * Returns a preview to crop modal
   */
  /**
   * @param {HTMLImageElement} image - Image File Object
   * @param {Object} crop - crop Object
   * @param {String} fileName - Name of the returned file in Promise
   */
  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
  }

  /**
   * Returns the new avatar readable to backend
   */
  getCroppedImgAsString(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // As Base64 string
    const base64Image = canvas.toDataURL();
    let finalName = fileName + '.' + extractImageFileExtensionFromBase64(base64Image)
    return base64StringtoFile(base64Image, finalName)
  }

  render() {
    const { crop, croppedImageUrl, angle, src } = this.state;

    return (
      <Modal isOpen={this.state.modal} size={"lg"} className="user-modal">
        <ModalHeader>
          <h4 style={{ fontWeight: "bold" }}>Recortando foto</h4>
        </ModalHeader>
        <ModalBody style={{ textAlign: "center" }}>
          <Row>
            <Col>
              {src && (
                <ReactCrop
                  src={src}
                  crop={crop}
                  imageStyle={{transform: `rotate(${angle}deg)`}}
                  ruleOfThirds
                  onImageLoaded={this.onImageLoaded}
                  onComplete={this.onCropComplete}
                  onChange={this.onCropChange}
                />
              )}
            </Col>
          </Row>
          <Row>
            <Col>
            <h4>
                {" "}
                <FontAwesomeIcon icon={faCircleNotch} /> Ángulo
              </h4>
              <Button color="primary" onClick={this.rotate}>
                Rotar
              </Button>
            </Col>
            <Col>
              <h4>
                {" "}
                <FontAwesomeIcon icon={faVectorSquare} /> Dimensiones
              </h4>
              <ButtonGroup>
                <Button
                  color={
                    this.state.crop.aspect === dimensions.default.crop.aspect
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => this.onCropChange(dimensions.default.crop)}
                >
                  Default
                </Button>
                <Button
                  color={
                    this.state.crop.aspect === dimensions.aspect4_3.aspect
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => this.onCropChange(dimensions.aspect4_3)}
                >
                  4:3
                </Button>
                <Button
                  color={
                    this.state.crop.aspect === dimensions.aspect16_9.aspect
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => this.onCropChange(dimensions.aspect16_9)}
                >
                  16:9
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              {croppedImageUrl && (
                <div>
                  <h4>Vista previa</h4>
                  <img
                    alt="Crop"
                    style={{ maxWidth: "100%" }}
                    src={croppedImageUrl}
                  />
                </div>
              )}
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <FormText color="muted">Este cambio es irreversible</FormText>
          <Button color="primary" onClick={this.onSave}>
            Cortar
          </Button>
          <Button color="secondary" onClick={this.toggle}>
            Descartar
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default CropPhoto;
