import React, { useState, useEffect } from "react";
import "../../components/Routes/noMatch.css"
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import {
  faUserFriends,
  faEnvelope,
  faChevronCircleRight,
  faChevronCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
  ButtonGroup,
  Alert,
} from "reactstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { connect } from "react-redux";
import { webadmin } from "../../actions";
import {
  faUserCircle,
  faUser,
  faUserTag,
} from "@fortawesome/free-solid-svg-icons";
import FormTermsOfUse from "../../components/TermsOfUse/FormTermsOfUse";
import {FailedConfirmation} from "./EmailConfirmation"

export default function CompleteRegistrationMessage  ({
    status
})  {

    return(
        <FailedConfirmation/>
  )
};

