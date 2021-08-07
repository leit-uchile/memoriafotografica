import React from "react";
import UploadDetails from "./UploadDetailsv2";
import UploadProgress from "./UploadProgress";
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  CardColumns,
} from "reactstrap";
import Dropzone from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faCloudUploadAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, } from "react-redux";
import { selectUpload } from "../../../reducers";
import "./css/uploadPhoto.css";
import useHandleFiles from "./hooks/useHandleFiles";
import useUpload from "./hooks/useUpload";
import PropTypes from "prop-types";
import { useMemo } from "react";

/**
 * UploadPhoto
 *
 * Manage Local Photo Upload and delegate specific info to UploadDetails
 */
const UploadPhoto = ({
  sendAlert,
  searchMeta,
  meta,
  photoInfo,
  previousStep,
  nextStep,
  token,
}) => {

  const upload =  useSelector(selectUpload);

  const [state, setState, handleOnDrop, saveMeta, handleErase] = useHandleFiles(
    sendAlert
  );

  const [startProcess] = useUpload(
    token
  );

  const handleInputChange = (query) => {
    if (query.length >= 2) {
      searchMeta(query, 1, 10);
    }
  };

  const showFailed = () => {
    // Filtrar fotos
    let index = upload.error.map((e) => e.photo_index);
    let filtered = state.photos.filter((_, k) => index.includes(k));
    filtered = filtered.length === 0 ? [...state.photos] : filtered;

    // Actualizar estado con un callback
    setState({ ...state, photos: filtered });
  };

  const uploadPhotos = () => {
    startProcess(state.photos, photoInfo);
  };

  const suggestions = meta
    ? meta.map((el) => ({ id: el.id, name: el.value }))
    : [];

  const rows = useMemo(() => {
    const r = []
    for (var i = 0; i < state.photos.length; i = i + 3) {
      var row = [];
      for (let j = 0; j < 3 && i + j < state.photos.length; j++) {
        const el = state.photos[j + i];
        const key = i + j;
        row.push(
          <UploadDetails
            key={el.id}
            id={el.id}
            photo={el.photo}
            save={(info) => saveMeta(info, key)}
            delete={() => handleErase(key)}
            meta={el.meta}
            suggestions={suggestions}
            search={handleInputChange}
          />
        );
      }
      r.push(<CardColumns>{row}</CardColumns>);
    }
    return r
  }, [state.photos])
  

  const dropzone = (
    <div className="upload-photo-dropzone">
      <Dropzone onDrop={handleOnDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Arrastra y suelta una imagen o haz click aqui</p>
            <FontAwesomeIcon icon={faCloudUploadAlt} size="3x" />
          </div>
        )}
      </Dropzone>
    </div>
  );

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="page-title">
            Subir Fotograf&iacute;a / Agregar fotograf&iacute;as
          </h2>
        </Col>
      </Row>
      <Row>
        <Col md={12} lg={9}>
          {state.photos.length === 0 && dropzone}
          {rows}
        </Col>
        <Col md={12} lg={3}>
          <div className="white-box upload-rules">
            <h4>Metadatos</h4>
            <ul>
              <li>
                Cada foto <b>requiere</b> una descripci&oacute;n o breve
                historia asociada.
              </li>
            </ul>
            <h4>Informaci&oacute;n por fotograf&iacute;a</h4>
            <ul>
              <li>
                Se puede asignar informaci&oacute;n separada como t&iacute;tulo,
                licencias, etiquetas.
              </li>
              <li>
                En caso de no asignar nada se considera la informaci&oacute;n
                general ya ingresada.
              </li>
            </ul>
          </div>
          {state.photos.length > 0 && dropzone}
        </Col>
      </Row>
      <Row>
        <Col style={{ textAlign: "center" }}>
          <ButtonGroup style={{ marginTop: "20px", width: "20em" }}>
            <Button onClick={previousStep}>
              <FontAwesomeIcon icon={faChevronCircleLeft} /> Volver
            </Button>
            {state.photos.length !== 0 ? (
              <UploadProgress
                buttonLabel="Finalizar"
                retry={() => uploadPhotos()}
                goToNextStep={nextStep}
                edit={() => showFailed()}
              />
            ) : null}
          </ButtonGroup>
        </Col>
      </Row>
    </Container>
  );
};

UploadPhoto.propTypes = {
  photoInfo: PropTypes.shape({
    date: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    cc: PropTypes.string.isRequired,
  }),
  meta: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      id: PropTypes.string,
    })
  ),
  searchMeta: PropTypes.func.isRequired,
  sendAlert: PropTypes.func.isRequired,
  previousStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
};

export default UploadPhoto;
