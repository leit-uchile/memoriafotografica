import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import "../styles.css";

const PhotoDisplay = ({ details, leftIndex, rightIndex, params }) => (
  <Fragment>
    <h2>{details.title}</h2>
    <div>
      {leftIndex === -1 || leftIndex === undefined ? null : (
        <Link
          className="photoDetailNavigation"
          to={`/photo/${leftIndex}${params}`}
        >
          <FontAwesomeIcon
            icon={faChevronCircleLeft}
          />
        </Link>
      )}
      <img
        alt={details.title}
        src={details.thumbnail}
        className="photo-display"
      />
      {rightIndex === -1 || rightIndex === undefined ? null : (
        <Link
          className="photoDetailNavigation"
          to={`/photo/${rightIndex}${params}`}
        >
          <FontAwesomeIcon
            icon={faChevronCircleRight}
          />
        </Link>
      )}
    </div>
  </Fragment>
);

export default PhotoDisplay;
