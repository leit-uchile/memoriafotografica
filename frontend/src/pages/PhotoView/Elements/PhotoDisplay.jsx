import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";

const PhotoDisplay = ({ details, leftIndex, rightIndex, params }) => (
  <Fragment>
    <h2>{details.title}</h2>
    <div>
      {leftIndex === -1 || leftIndex === undefined ? null : (
        <Link
          className="photoDetailNavigation"
          style={{
            display: "inline-block",
            marginRight: "1em",
          }}
          to={`/photo/${leftIndex}${params}`}
        >
          <FontAwesomeIcon
            icon={faChevronCircleLeft}
            style={{ height: "25px", width: "25px" }}
          />
        </Link>
      )}
      <img
        alt={details.title}
        src={details.thumbnail}
        style={{
          display: "inline-block",
          margin: "0 auto",
          maxHeight: "60vh",
          maxWidth: "75%",
        }}
      />
      {rightIndex === -1 || rightIndex === undefined ? null : (
        <Link
          className="photoDetailNavigation"
          style={{
            display: "inline-block",
            marginLeft: "1em",
          }}
          to={`/photo/${rightIndex}${params}`}
        >
          <FontAwesomeIcon
            icon={faChevronCircleRight}
            style={{ height: "25px", width: "25px" }}
          />
        </Link>
      )}
    </div>
  </Fragment>
);

export default PhotoDisplay;
