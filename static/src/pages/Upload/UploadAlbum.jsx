import React from "react";
import { Form, FormGroup, Input } from "reactstrap";

const UploadAlbum = ({ save }) => (
  <Form>
    <FormGroup>
      <Input
        name="albumName"
        type="text"
        placeholder="Nombre del album"
        onChange={e => save(e)}
        required
      />
      <Input
        name="albumDesc"
        type="textarea"
        placeholder="Descripcion (Opcional)"
        onKeyUp={e => save(e)}
      />
    </FormGroup>
  </Form>
);

export default UploadAlbum;
