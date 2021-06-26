import React from "react";
import { Badge, Table } from "reactstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const SuggestionRow = ({ suggestion, select, selected }) => {
  return (
    <tr>
      <td>
        <img src={suggestion.thumbnail} height="100px" alt="content" />
        <div>
          <Link to={`/photo/${suggestion.id}`}>Ver imagen</Link>
        </div>
      </td>

      <td>
        {suggestion.tagsuggestion_photo.map((sug) => {
          let selectStyle;

          if (selected[sug.id]) {
            selectStyle = {
              backgroundColor: "var(--leit-pink)",
              color: "white",
            };
          }

          return (
            <Badge
              className={`tags`}
              key={sug.metadata.id}
              style={selectStyle}
              onClick={() => select(sug.id)}
              pill
            >
              #{sug.metadata.value} ({sug.votes})
            </Badge>
          );
        })}
      </td>
      <td></td>
    </tr>
  );
};

SuggestionRow.ropTypes = {
  suggestion: PropTypes.object.isRequired,
  selected: PropTypes.object.isRequired,
  select: PropTypes.func.isRequired,
};

const SuggestionTable = ({ suggestions, sugSelected, setSugSelected }) => {
  const select = (sug) => {
    let newSuggestion = sugSelected;

    if (sugSelected[sug]) {
      delete newSuggestion[sug];
    } else {
      newSuggestion[sug] = true;
    }
    setSugSelected({ ...newSuggestion });
  };


  return (
    <Table responsive striped>
      <thead>
        <tr>
          <th>Foto</th>
          <th>Sugerencias</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {suggestions.count !== 0 && suggestions.results ? (
          suggestions.results.map((r) => (
            <SuggestionRow
              key={r.id}
              suggestion={r}
              select={select}
              selected={sugSelected}
            />
          ))
        ) : (
          <tr/>
        )}
      </tbody>
    </Table>
  );
};

SuggestionTable.propTypes = {
  suggestions: PropTypes.object.isRequired,
  sugSelected: PropTypes.object,
  setSugSelected: PropTypes.func,
};

export default SuggestionTable;
