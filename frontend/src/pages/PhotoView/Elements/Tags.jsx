import React, { Fragment } from "react";
import { Badge } from "reactstrap";
import TagSuggestionModal from "./TagSuggestionModal";
import PropTypes from "prop-types";

const Tags = ({ photoId, tags, onRedirect }) => (
  <Fragment>
    <br />
    <h5 style={{ textAlign: "left" }}>Etiquetas</h5>
    {tags.length === 0 ? (
      <span style={{ fontStyle: "italic" }}>No hay tags asociados</span>
    ) : (
      tags.map((el, _) => (
        <Badge
          className="tags"
          key={el.id}
          pill
          onClick={() => onRedirect(el.id, el.value)}
        >
          #{el.value}
        </Badge>
      ))
    )}

    <TagSuggestionModal photoId={photoId} tags={tags} />
  </Fragment>
);

Tags.propTypes = {
  photoId: PropTypes.number.isRequired,
  tags: PropTypes.array.isRequired,
  onRedirect: PropTypes.func.isRequired,
};

export default Tags;
