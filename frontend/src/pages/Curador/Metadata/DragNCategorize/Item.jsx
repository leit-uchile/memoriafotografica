import React, { Fragment, useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import METADATA_TYPE from "./types";
import moment from "moment";

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

      console.log(dragIndex, hoverIndex);
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

  const [show, setShow] = useState(false);

  const onOpen = () => setShow(true);

  const onClose = () => setShow(false);

  drag(drop(ref));

  return (
    <Fragment>
      <div
        ref={ref}
        style={{ opacity: isDragging ? 0 : 1 }}
        className={"drag-item"}
        onClick={onOpen}
      >
        <span className={"item-title"}>{item.value}</span>
        <br></br>
        <span className={"item-date"}>
          Creado el {moment(item.created_at).format("DD/MM/YYYY")}
        </span>
      </div>
    </Fragment>
  );
};

export default Item;
