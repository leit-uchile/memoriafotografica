import React, { useState, useCallback, useEffect } from "react";
import Gallery from "react-photo-gallery";
import {Button, Container, Row, Col} from 'reactstrap';

/**
 * From documentation
 * Credits to https://codesandbox.io/s/o7o241q09?from-embed 
 */



const imgStyle = {
  transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s"
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

  const handleOnClick = e => {
    setIsSelected(!isSelected);
    onClick(e, {index});
  };

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  return (
    <div
      style={{ margin, height: photo.height, width: photo.width, ...cont }}
      className={!isSelected ? "not-selected" : ""}
    >
     
      <img
        alt={photo.title}
        style={
          isSelected ? { ...imgStyle, ...selectedImgStyle } : { ...imgStyle }
        }
        {...photo}
        onClick={handleOnClick}
      />
      <style>{`.not-selected:hover{outline:2px solid #06befa}`}</style>
    </div>
  );
};

const PhotoView = ({photos, ...props}) => {

  const imageRenderer = useCallback(
    ({ index, left, top, key, photo, onClick }) => (
      <SelectedImage
      
        key={key}
        margin={"2px"}
        index={index}
        photo={photo}
        left={left}
        top={top}
        onClick={onClick}
      />
    ),
  );

  return (
    <Container fluid>
      <Row>
        <Col>
         Añadir un nuevo album
        </Col>
      </Row>
      <Row>
        <Col>
          <Gallery photos={photos} renderImage={imageRenderer} {...props} />
        </Col>
      </Row>
    </Container>
  );
}

export default PhotoView;