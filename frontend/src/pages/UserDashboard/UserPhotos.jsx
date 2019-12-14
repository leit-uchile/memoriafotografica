import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { auth, home, curador } from "../../actions";
import {
  Button,
  Form,
  FormGroup,
  Row,
  Col,
  Input,
  Label,
  Container
} from "reactstrap";
import { user, misc } from "../../actions";
import Gallery from "react-photo-gallery";
import EditPhotosModal from "./EditPhotosModal"
import PhotoEditor from "../../components/PhotoEditor";
import PhotoSelector from "../../components/PhotoSelector";
import LeitSpinner from "../../components/LeitSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowAltCircleLeft} from "@fortawesome/free-solid-svg-icons";

class UserPhotos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      chosenPhotoIndex: 0,
      picturesToEdit: [],
    };
    this.props.onLoadGetPhotos(props.user.id, 100, 0); //no poner limite
  }

  handleRedirect = obj => { //no funcionando
    this.setState({
      redirect: true,
      chosenPhotoIndex: obj.index
    });
    console.log('Redireccionando')
  };
  
  handleOnSelect = obj => {
    const id = obj.photo.id;
    const newList = this.state.picturesToEdit.filter(el => el.id !== id);
    {newList.length === this.state.picturesToEdit.length //el objeto no esta
    ? (this.setState({picturesToEdit: [...newList, obj.photo] }) )
    : (this.setState({picturesToEdit: [...newList] }) )}
  };

  putAlltoEdit(mapped,selectAll){
    selectAll
    ? this.setState({picturesToEdit: mapped})
    : this.setState({picturesToEdit: []})
  }

  render() {
    var mapped = this.props.photos.map(el => ({
      src: el.thumbnail,
      height: el.aspect_h,
      width: el.aspect_w,
      id: el.id,
      title: el.title,
      description: el.description,
      created_date: el.created_at,
      permissions: el.permissions
    }));
    return (
      <Container fluid style={styles.photosContainer}>
        <Row>
          <Col md={1}>
            <Button style={{ margin: "0 auto" }}
                color="secondary"
                tag={Link}
                to="./dashboard" >
                <FontAwesomeIcon icon={faArrowAltCircleLeft} />{" "}
            </Button>
          </Col>
          <Col style={{display:'flex'}}>
            <h2>Mis fotos</h2>
          </Col>
        </Row>
        <div>
          <Row>
            <Col md={10}>
              <PhotoEditor
                  photos={mapped}
                  targetRowHeight={132}
                  onClick={(e, index) => this.handleOnSelect(index)}
                  putAll={(state) => this.putAlltoEdit(mapped,state)}
                  redirect={(e, index) => this.handleRedirect(index)}
              />
            </Col>
            <Col md={2} style={styles.filterMenu}>
              <h2>Ordenar</h2>
              <Button>Ordenar por</Button>
              <EditPhotosModal
                    photos={this.state.picturesToEdit}
                  />
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}

const styles = {
  filterMenu:{
      position: "sticky",
      top: "0",
      height: "4em",
      padding: "1em 0",
      zIndex: "4"
  },
  photosContainer: {
    width: "100%",
    backgroundColor: "#f7f8fa",
    textAlign: "center",
  },
}
const mapStateToProps = state => ({
  photos: state.user.photos,
  user: state.user.userData
});
const mapActionsToProps = dispatch => ({
  onLoadGetPhotos: (user_id, limit, offset) =>
    dispatch(user.getUserPhotos(user_id, limit, offset))
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(UserPhotos);
