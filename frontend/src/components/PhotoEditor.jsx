import React, { useState, useCallback, useEffect } from "react";
import Gallery from "react-photo-gallery";
import { Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye, faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';
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
  onClick,
  onRedirect,
  selectAllBtn,
  viewLink,
  selectIcon
}) => {
  const [isSelected, setIsSelected] = useState(selected);
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
    setIsSelected(!isSelected);
    onClick(e, { index });
  };

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  return (
    <div
      style={{ margin, height: photo.height, width: photo.width, ...cont }}
      className={!isSelected ? "not-selected" : "selected"}
    >
      <Checkmark selected={isSelected ? true : false} />
      <img
        alt={photo.title}
        style={
          isSelected ? { ...imgStyle, ...selectedImgStyle } : { ...imgStyle }
        }
        {...photo}
        onClick={isSelected ? handleOnSelect : ()=>{}}
      />

        {!isSelected ? (
          <div className="icons">
            {viewLink ? (<FontAwesomeIcon
              icon={faEye}
              style={{ marginRight: "0.35em" }}
              onClick={handleOnRedirect}
            />) : ""}
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

const PhotoEditor = ({ photos, selectAll, ...props }) => {
  // const [selectAll, setSelectAll] = useState(false);

  // const toggleSelectAll = () => {
  //   setSelectAll(!selectAll);
  //   putAll(!selectAll)
  // };

  const validIcons = ["pen", "check"]
  const iconsDict = {
    "pen" : faPencilAlt,
    "check" : faCheck
  }
  const checkIcon = (iconStr) => {
    return props.selectIcon === undefined ? "pen" : (
      validIcons.includes(iconStr) ? iconStr : "pen"
    )
  }
  const [viewLink, setViewLink] = useState(props.viewLink === undefined ? true : (props.viewLink))
  const [selectIcon, setSelectIcon] = useState(props.selectIcon === undefined ? "pen" : checkIcon(props.selectIcon))
  const [allButton, setAllButton] = useState(props.selectAllBtn === undefined ? true : (props.selectAllBtn))  
  const imageRenderer = useCallback(
    ({ index, left, top, key, photo, onClick}) => (
      <SelectedImage
        selected={allButton ? selectAll : photo.selected}
        key={key}
        margin={"2px"}
        index={index}
        photo={photo}
        left={left}
        top={top}
        onClick={onClick}
        onRedirect={props.onRedirect}
        selectAllBtn={allButton}
        selectIcon={iconsDict[selectIcon]}
        viewLink={viewLink}
      />
    ),
    [selectAll]
  );

  return (
    <Container fluid>
      {/* <Row>
        <Col>
        {!selectAll
        ?(<Button onClick={toggleSelectAll}>Seleccionar todas</Button>)
        :(<Button onClick={toggleSelectAll}>Borrar selección</Button>)
        }
        </Col>
      </Row> */}
      <Row>
        <Col>
          <Gallery photos={photos} renderImage={imageRenderer} {...props} />
        </Col>
      </Row>
    </Container>
  );
};

PhotoEditor.propTypes = {
  viewLink : PropTypes.bool,
  selectIcon : PropTypes.oneOf(['pen', 'check']),
  selectAllBtn : PropTypes.bool
};

export default PhotoEditor;
