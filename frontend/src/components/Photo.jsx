import React from "react";
import { Link } from "react-router-dom";
import "./photo.css";

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

export default Photo;
