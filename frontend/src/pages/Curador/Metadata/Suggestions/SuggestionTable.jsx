import React from "react";
import { Badge, Table } from "reactstrap";
import { Link } from "react-router-dom";

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
  console.log(sugSelected);

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
        {suggestions.length !== 0
          ? suggestions.results.map((r) => (
              <SuggestionRow
                key={r.id}
                suggestion={r}
                select={select}
                selected={sugSelected}
              />
            ))
          : <div/> }
      </tbody>
    </Table>
  );
};

export default SuggestionTable;
