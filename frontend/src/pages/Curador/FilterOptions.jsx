import React, { Fragment } from "react";
import {
  UncontrolledCollapse,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  CardText,
} from "reactstrap";

const FilterOptions = ({ id, params, setState }) => {
  const dateType = params.filter((el) => el.type === "date");
  const selectType = params.filter((el) => el.type === "select");
  return (
    <UncontrolledCollapse toggler={id} style={{ marginBottom: "1em" }}>
      <Card>
        <CardBody>
          <CardText>
            Los cambios en este filtro se ver&aacute;n autom&aacute;ticamente en
            la lista
          </CardText>
          <Form>
            <FormGroup row>
              {dateType.map((filter, index) => (
                <Fragment key={`datetime ${index}`}>
                  <Label for={filter.name} sm={2}>
                    {filter.display}
                  </Label>
                  <Col>
                    <Input
                      type={filter.type}
                      name={filter.name}
                      onChange={(e) => {
                        e.persist();
                        setState(e.target.name, e.currentTarget.value);
                      }}
                    ></Input>
                  </Col>
                </Fragment>
              ))}
            </FormGroup>
            <FormGroup row>
              {selectType.map((filter, index) => (
                <Fragment key={`form-control ${index}`}>
                  <Label for={filter.name} sm={2}>
                    {filter.display}
                  </Label>
                  <Col>
                    <Input
                      type={filter.type}
                      name={filter.name}
                      onChange={(e) => {
                        e.persist();
                        setState(e.target.name, e.currentTarget.value);
                      }}
                    >
                      <option value="">Todos</option>
                      {filter.options.length === 2 ? (
                        <Fragment>
                          <option value="true">{filter.options[0]}</option>
                          <option value="false">{filter.options[1]}</option>
                        </Fragment>
                      ) : (
                        filter.options.map((opt, key) => (
                          <option key={key} value={key + 1}>{opt}</option>
                        ))
                      )}
                    </Input>
                  </Col>
                </Fragment>
              ))}
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </UncontrolledCollapse>
  );
};

export default FilterOptions;
