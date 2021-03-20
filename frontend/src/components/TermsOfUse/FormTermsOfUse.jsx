import React, { Component } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faUser,
  faUserTag,
} from "@fortawesome/free-solid-svg-icons";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Col,
  Row,
  Alert,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Container,
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
          onClick={setTermsValue}
          required
        />
        <Label for="termsOfUse" check onClick={toggleTermsModal}>
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
