import React from "react";
import { useDrop } from "react-dnd";
import METADATA_TYPE from "./types";
import "../styles.css";

const DropWrapper = ({ onDrop, children, name, iptc_id }) => {
  const [{ isOver }, drop] = useDrop({
    accept: METADATA_TYPE,
    // Limit drop if necessary
    canDrop: (item, monitor) => {
      return name !== "Sin Categoria";
    },
    drop: (item, monitor) => {
      onDrop(item, monitor, name, iptc_id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className={"drop-wrapper"}>
      {React.cloneElement(children, { isOver })}
    </div>
  );
};

export default DropWrapper;
