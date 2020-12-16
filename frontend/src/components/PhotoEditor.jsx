import React, { useState, useCallback, useEffect } from "react";
import Gallery from "react-photo-gallery";
import { Container, Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEye,
  faPencilAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import "./photoEditor.css";

/**
 * From documentation
 * Credits to https://codesandbox.io/s/o7o241q09?from-embed
 */

const Checkmark = ({ selected }) => (
  <div
    style={
      selected
        ? { left: "4px", top: "4px", position: "absolute", zIndex: "1" }
        : { display: "none" }
    }
  >
    <svg
      style={{ fill: "white", position: "absolute" }}
      width="24px"
      height="24px"
    >
      <circle cx="12.5" cy="12.2" r="8.292" />
    </svg>
    <svg
      style={{ fill: "var(--leit-pink)", position: "absolute" }}
      width="24px"
      height="24px"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  </div>
);

const imgStyle = {
  transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s",
  opacity: 1,
};
const selectedImgStyle = {
  transform: "translateZ(0px) scale3d(0.9, 0.9, 1)",
  transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s",
};
const cont = {
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
};

const SelectedImage = ({
  index,
  photo,
  margin,
  direction,
  top,
  left,
  selected,
  toggle,
  onRedirect,
  selectIcon,
}) => {
  //calculate x,y scale
  const sx = (100 - (30 / photo.width) * 100) / 100;
  const sy = (100 - (30 / photo.height) * 100) / 100;
  selectedImgStyle.transform = `translateZ(0px) scale3d(${sx}, ${sy}, 1)`;

  if (direction === "column") {
    cont.position = "absolute";
    cont.left = left;
    cont.top = top;
  }

  const handleOnRedirect = (e) => {
    onRedirect(e, { index });
  };

  const handleOnSelect = (e) => {
    toggle(photo.id, { index });
  };

  return (
    <div
      style={{ margin, height: photo.height, width: photo.width, ...cont }}
      className={!selected ? "not-selected" : "selected"}
    >
      <Checkmark selected={selected} />
      <img
        alt={photo.title}
        style={
          selected ? { ...imgStyle, ...selectedImgStyle } : { ...imgStyle }
        }
        {...photo}
        onClick={selected ? handleOnSelect : () => {}}
      />

      {!selected ? (
        <div className="icons">
          <FontAwesomeIcon
            icon={faEye}
            style={{ marginRight: "0.35em" }}
            onClick={handleOnRedirect}
          />
          <FontAwesomeIcon
            icon={selectIcon}
            style={{ marginRight: "0.35em" }}
            onClick={handleOnSelect}
          />
        </div>
      ) : (
        <div className="icons">
          <FontAwesomeIcon icon={faTimes} onClick={handleOnSelect} />
        </div>
      )}

      <style>{`.not-selected:hover{outline:2px solid #06befa}`}</style>
    </div>
  );
};

const PhotoEditor = ({ photos, allSelected, ...props }) => {
  const validIcons = ["pen", "check"];
  const iconsDict = {
    pen: faPencilAlt,
    check: faCheck,
  };
  const checkIcon = (iconStr) => {
    return props.selectIcon === undefined
      ? "pen"
      : validIcons.includes(iconStr)
      ? iconStr
      : "pen";
  };
  const [selectIcon, setSelectIcon] = useState(
    props.selectIcon === undefined ? "pen" : checkIcon(props.selectIcon)
  );

  const [state, setState] = useState({});

  const imageRenderer = useCallback(
    ({ index, left, top, photo }) => (
      <SelectedImage
        index={index}
        selected={state[photo.id]}
        toggle={toggleElement}
        margin={"2px"}
        photo={photo}
        left={left}
        top={top}
        onRedirect={props.onRedirect}
        selectIcon={iconsDict[selectIcon]}
      />
    ),
    [state]
  );

  useEffect(() => {
    selectAll();
  }, [allSelected]);

  useEffect(() => {
    // List changed ?
    if ((photos[0] && state[photos[0].id] === undefined)) {
      let selected = {};
      photos.forEach((element, key) => {
        selected[element.id] = false;
      });
      setState(selected);
      props.getSelection(selected);
    }
    // eslint-disable-next-line
  }, [photos, props.update]);

  const toggleElement = (val, obj) => {
    let key = obj.index;
    let update = { ...state };
    update[val] = !state[val];
    if (!state[val]) {
      update["nb-" + key] = !state[val];
    } else {
      delete update["nb-" + key];
    }
    setState(update);
    props.getSelection(update);
  };

  const selectAll = () => {
    let selected = {};
    photos.forEach((element, key) => {
      selected[element.id] = allSelected;
      if (allSelected) {
        selected["nb-" + key] = allSelected;
      }
    });
    setState(selected);
    props.getSelection(selected);
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <Gallery photos={photos} renderImage={imageRenderer} {...props} />
        </Col>
      </Row>
    </Container>
  );
};

PhotoEditor.propTypes = {
  selectIcon: PropTypes.oneOf(["pen", "check"]),
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
    })
  ),
};

export default PhotoEditor;
