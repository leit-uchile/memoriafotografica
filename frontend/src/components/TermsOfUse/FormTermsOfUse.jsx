import React from "react";
import {
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import TermsOfUseModal from "./TermsOfUseModal";

export default function FormTermsOfUse({
  termsValue,
  setTermsValue,
  isTermsModalOpen,
  toggleTermsModal,
}) {
  return (
    <>
      <FormGroup check>
        <Input
          type="checkbox"
          name="termsOfUse"
          checked={termsValue}
          onChange={setTermsValue}
          required
        />
        <Label
          for="termsOfUse"
          onClick={toggleTermsModal}
          style={{ marginLeft: "0.5em" }}
        >
          Acepto los{" "}
          <span style={{ color: "blue", cursor: "pointer" }}>
            terminos de uso
          </span>
        </Label>
      </FormGroup>
      <div style={{ marginTop: "2em", marginBottom: "2em" }}>
        <TermsOfUseModal
          isOpen={isTermsModalOpen}
          toggleFunc={toggleTermsModal}
          acceptTerms={termsValue ? () => {} : setTermsValue}
        />
      </div>
    </>
  );
}
