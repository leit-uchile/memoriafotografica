import React, { Component } from "react";
import { connect } from "react-redux";
import { auth, home, curador } from "../../actions";
import {
    Button,
    Form,
    FormGroup,
    Row,
    Col,
    Input,
    Label,
    Container,
    Link
} from "reactstrap";
import { user, misc } from "../../actions";
import Gallery from "react-photo-gallery";
import UserDashboard from "./UserDashboard";
import Photo from "../../components/Photo";

class UserAlbums extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pictures: [],
            photoPagination: {
                page: 0,
                maxAllowed: 35
            },
            chosenPhotoIndex: 0, // For redirect
            redirect: false,
        };
    }
    render() {
        

        return (
            <Container>
                <Row>
                    <Col>
                        <h2> Mis Albums </h2>
                    </Col>

                </Row>
                <Row>
                    <Col>
                        albumes
                    </Col>
                </Row>
            </Container>
        )


    }

};

export default UserAlbums;

