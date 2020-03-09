import React, { useState, useCallback, useEffect } from "react";
import Gallery from "react-photo-gallery";
import { Container, Row, Col} from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye, faPencilAlt} from "@fortawesome/free-solid-svg-icons";
import "../css/photoEditor.css";

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
      style={{ fill: "#ff5a60", position: "absolute" }}
      width="24px"
      height="24px"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  </div>
);

const imgStyle = {
  transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s",
  opacity: 1
};
const selectedImgStyle = {
  transform: "translateZ(0px) scale3d(0.9, 0.9, 1)",
  transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s"
};
const cont = {
  backgroundColor: "#eee",
  cursor: "pointer",
  overflow: "hidden",
  position: "relative"
};

const SelectedImage = ({
  index,
  photo,
  margin,
  direction,
  top,
  left,
  selected,
  onClick
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

  const handleOnRedirect = e => {
    const type = 'redirect'
    //onClick(e, {index}, type);
    console.log(type)
  };

  const handleOnSelect = e => {
    const type = 'edit'
    setIsSelected(!isSelected);
    onClick(e, {index}, type);
    console.log(type)
  };

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  return (
    <div
      style={{ margin, height: photo.height, width: photo.width, ...cont }}
      className={!isSelected ? "not-selected" : ""}
    >
      <Checkmark selected={isSelected ? true : false} />
      <img
        alt={photo.title}
        style={
          isSelected ? { ...imgStyle, ...selectedImgStyle } : { ...imgStyle }
        }
        {...photo}
        
        onClick={
          isSelected ? handleOnSelect : {}
        }        
      />
      {!isSelected
      ? <div className="middle">
          <div className="icons">
            <FontAwesomeIcon icon={faEye} style={{marginRight: '0.35em'}} onClick={handleOnRedirect}/>
            <FontAwesomeIcon icon={faPencilAlt} onClick={handleOnSelect} />
          </div>
        </div>
      : <span></span>
      }
      
      <style>{`.not-selected:hover{outline:2px solid #06befa}`}</style>
    </div>
  );
};

const PhotoEditor = ({photos, selectAll,...props}) => {
  // const [selectAll, setSelectAll] = useState(false);

  // const toggleSelectAll = () => {
  //   setSelectAll(!selectAll);
  //   putAll(!selectAll)
  // };
  

  const imageRenderer = useCallback(
    ({ index, left, top, key, photo, onClick }) => (
      <SelectedImage
        selected={selectAll}
        key={key}
        margin={"2px"}
        index={index}
        photo={photo}
        left={left}
        top={top}
        onClick={onClick}
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
}

export default PhotoEditor;