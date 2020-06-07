import React, { Fragment, useState } from "react";
import { Button, Form, FormGroup, Row, Col, Input, Label } from "reactstrap";
import { PhotoSelector, LeitSpinner, Pagination } from "../../../../components";

export const SearchPhoto = ({ submit, loading, mapped }) => {
  const [form, setForm] = useState({
    tag: "",
    title: "",
    desc: "",
    upload_since: "",
    taken_on: "",
  });

  return (
    <Fragment>
      <Form>
        <Row form>
          <Col md={4}>
            <FormGroup>
              <Label for="metadata_category">Etiqueta</Label>
              <Input
                type="text"
                placeholder="Contiene etiqueta..."
                onChange={(e) => this.filterPhotos(e)}
                id="metadata_category"
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="title_category">Titulo</Label>
              <Input
                type="text"
                placeholder="Titulo contiene..."
                onChange={(e) => this.filterPhotos(e)}
                id="title_category"
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="description_category">Descripci&oacute;n</Label>
              <Input
                type="text"
                placeholder="Descripcion contiene..."
                onChange={(e) => this.filterPhotos(e)}
                id="description_category"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="metadata_category">Subida desde</Label>
              <Input
                type="date"
                placeholder="Contiene etiqueta..."
                onChange={(e) => this.filterPhotos(e)}
                id="metadata_category"
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="title_category">Tomada desde</Label>
              <Input
                type="date"
                placeholder="Titulo contiene..."
                onChange={(e) => this.filterPhotos(e)}
                id="title_category"
              />
            </FormGroup>
          </Col>
        </Row>
        <Button color="primary">Buscar</Button>{" "}
        {loading ? (
          <LeitSpinner />
        ) : (
          <PhotoSelector
            useContainer={false}
            photos={mapped}
            targetRowHeight={200}
            onClick={(e, index) => this.handleOnClick(index)}
            putAll={(add) => this.selectAll(add)}
          />
        )}
      </Form>
    </Fragment>
  );
};
