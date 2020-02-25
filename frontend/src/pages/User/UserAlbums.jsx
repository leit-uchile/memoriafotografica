import React, { Component } from "react";
import { connect } from "react-redux";
import { auth, home, curador } from "../../actions";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowAltCircleRight,
    faArrowAltCircleLeft
} from "@fortawesome/free-solid-svg-icons";
import Photo from "../../components/Photo";
import AlbumsView from "./AlbumsView"
import {
    Button,
    Form,
    FormGroup,
    Row,
    Col,
    Input,
    Label,
    Container,
    Card,
    CardImg
} from "reactstrap";
import { user, misc } from "../../actions";
import Gallery from "react-photo-gallery";
import UserDashboard from "./Profile/UserDashboard";

class UserAlbums extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pictures: [],
            photoPagination: {
                page: 0,
                maxAllowedAlbums: 35,
                selectedAlbs: []
            },
            chosenPhotoIndex: 0, // For redirect
            redirect: false,
        };
    }
    toggleAlbs() {
        this.setState({
            albsOpen: !this.state.albsOpen
        });
    }
    handleOnClick = url => {
        this.setState({ redirect: true, link: url });
    };
    componentWillMount() {
        const { user } = this.props;

        this.props.setRoute("/userAlbums/");
        this.props.onLoadGetAlbums(user.id, 50, 0);

    }
    allowMoreAlbs() {
        this.setState({ maxPhotos: this.state.maxAlbs + 10 });
    }
    render() {
        const { albums } = this.props.data;
        const { user } = this.props;
        var isSelected = (id, array) => {
            return array ? array.filter(el => el === id).length !== 0 : false;
        };
        var currentAlbs = albums
            ? albums.slice(0, this.state.maxAllowedAlbums).map(el => {
                return {
                    ...el,
                    selected: isSelected(el.id, this.state.selectedAlbs)
                };
            })
            : [];

        return (
            <Container>
                <Row>
                    <Col sm="3" style={{ marginTop: "1em" }}>
                        <Button style={{ margin: "0 auto" }}
                            color="secondary"
                            tag={Link}
                            to="./dashboard" >
                            <FontAwesomeIcon icon={faArrowAltCircleLeft} />{" "}
                        </Button>
                    </Col>
                    <Col sm="9" style={{ marginTop: "2em" }}>
                        <h2 > Mis Albums </h2>
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <Container fluid>
                            <Albums albumList={currentAlbs} />
                        </Container>
                    </Col>
                </Row>
            </Container>
        )


    }

};

const Albums = ({ albumList, onClick }) => (
    <div style={{ margin: "1em auto" }}>
        {albumList.length == 0 ? (
            <h5> No has subido albumes</h5>
        ) : (
                albumList.map((el, index) => (
                    <Card>
                        <Photo
                            name={el.title}
                            url={el.thumbnail}
                            height="150px"
                            useLink
                            redirectUrl={`/albums/${el.di}`}
                        />
                    </Card>
                ))
            )}
    </div>
);

const mapStateToProps = state => ({
    data:{
        
        albums: state.user.albums
    },
    user: state.user.userData
});
const mapActionsToProps = dispatch => ({
    onLoadGetAlbums: (user_id, limit, offset) =>
      dispatch(user.getUserAlbums(user_id, limit, offset)),
    setRoute: route => dispatch(misc.setCurrentRoute(route))
  });

export default connect(
    mapStateToProps,
    mapActionsToProps)(UserAlbums);

