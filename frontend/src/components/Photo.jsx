import React from "react";
import { Link } from "react-router-dom";
import "./photo.css";
import PropTypes from "prop-types";

const Photo = ({
  className,
  url,
  name,
  height = "100px",
  width = "cover",
  onClick,
  style,
  useLink,
  redirectUrl,
  hover,
  hoverText,
  hoverStyle,
  ...props
}) =>
  useLink && redirectUrl ? (
    <Link to={redirectUrl}>
      {hover && hoverText ? (
        <div
          className={`containerPhoto ${className}`}
          style={{
            backgroundImage: "url('" + url + "')",
            height: height,
            width: width,
            ...style,
          }}
        >
          <div
            className={"doHoverPhoto"}
            style={{
              lineHeight: height,
              ...hoverStyle,
            }}
          >
            {hoverText}
          </div>
        </div>
      ) : (
        <div
          className={`containerPhoto ${className}`}
          style={{
            ...style,
            backgroundImage: "url('" + url + "')",
            height: height,
            width: width,
          }}
        ></div>
      )}
    </Link>
  ) : (
    <div
      className={`containerPhoto ${className}`}
      onClick={onClick}
      style={{
        ...style,
        backgroundImage: "url('" + url + "')",
        height: height,
        width: width,
      }}
    ></div>
  );

Photo.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string,
  name: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onClick: PropTypes.func,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  useLink: PropTypes.bool.isRequired,
  redirectUrl: PropTypes.string,
  hover: PropTypes.bool,
  hoverText: PropTypes.string,
  hoverStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default Photo;
