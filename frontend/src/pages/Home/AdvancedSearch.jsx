import React, { useState } from "react";
import { Container, Collapse, Button, Form, FormGroup} from "reactstrap";
import Select from "react-select";

const AdvancedSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <Container>
      <Button onClick={toggle}>Búsqueda Avanzada</Button>
      <Collapse isOpen={isOpen}>
        <Form>
            <FormGroup>
                Por fecha
            </FormGroup>
        </Form>
      </Collapse>
    </Container>
  );
};
