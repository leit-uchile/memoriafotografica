import React from "react";
import { useDrop } from "react-dnd";
import METADATA_TYPE from "./types";

const DropWrapper = ({ onDrop, children, name }) => {
  const [{ isOver }, drop] = useDrop({
    accept: METADATA_TYPE,
    // Limit drop if necessary
    /* canDrop: (item, monitor) => {
      const itemIndex = iptcs.findIndex((si) => si.name === item.name);
      const statusIndex = iptcs.findIndex((si) => si.name === name);
      return true
      return [itemIndex + 1, itemIndex - 1, itemIndex].includes(statusIndex);
    }, */
    drop: (item, monitor) => {
      onDrop(item, monitor, name);
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
