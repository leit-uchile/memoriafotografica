import React, { Fragment, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import METADATA_TYPE from "./types";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import "../styles.css";

const Item = ({ item, index, moveItem, name }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: METADATA_TYPE,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoveredRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
      const mousePosition = monitor.getClientOffset();
      const hoverClientY = mousePosition.y - hoveredRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: METADATA_TYPE, ...item, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <Fragment>
      <div
        ref={ref}
        style={{ opacity: isDragging ? 0 : 1 }}
        className={"drag-item"}
      >
        <span className={"item-title"}>{item.value}</span>
        <FontAwesomeIcon
          icon={item.approved ? faCheckCircle : faInfoCircle}
          className={item.approved ? "drag-icon drag-approved" : "drag-icon"}
        />
        <br></br>
        <span className={"item-date"}>
          Creado el {moment(item.created_at).format("DD/MM/YYYY")}
        </span>
      </div>
    </Fragment>
  );
};

export default Item;
