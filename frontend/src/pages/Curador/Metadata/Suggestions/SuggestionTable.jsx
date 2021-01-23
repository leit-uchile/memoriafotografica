import React, { Fragment } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";

const SuggestionRow = ({ suggestion }) => {
  return (
    <tr>
      <td>
        <img src={suggestion.thumbnail} height="100px" alt="content" />
        <div>
          <Link to={`/photo/${suggestion.id}`}>Ver imagen</Link>
        </div>
      </td>

      <td></td>
      <td></td>
    </tr>
  );
};

const SuggestionTable = ({ suggestions }) => {
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
          ? suggestions.results.map((r) => <SuggestionRow key={r.id} suggestion={r}/>)
          : null}
      </tbody>
    </Table>
  );
};

export default SuggestionTable;