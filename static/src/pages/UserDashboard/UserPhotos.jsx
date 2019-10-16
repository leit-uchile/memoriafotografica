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
      edit: false,
      picturesToEdit: [],
    };
    this.props.onLoadGetPhotos(props.user.id, 100, 0); //no poner limite
  }
  handleRedirect = obj => { //no funcionando
    
  };
  
  changeMode = () => {
    this.setState({ edit: !this.state.edit,
                    picturesToEdit: []});
  };

  handleOnClick = obj => {
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
      <Container>
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
            <Button
                onClick={this.changeMode}
                color={this.state.edit
                ? 'success'
                : 'secondary'}
                style={{marginLeft:'10px'}}>
                Modo edición
            </Button>
          </Col>
        </Row>
        <div>
            {!this.state.edit 
            ? (
              <Row>
                <Col md={10}>
                  <Gallery
                    photos={mapped}
                    targetRowHeight={200}
                    onClick={(e) => this.handleRedirect(e)}
                  />
                </Col>
                <Col md={2}>
                  <h2>FILTRO</h2>
                </Col>
              </Row>
              ) 
            :(
              <Row>
                <Col md={10}>
                  <PhotoSelector
                  photos={mapped}
                  targetRowHeight={200}
                  onClick={(e, index) => this.handleOnClick(index)}
                  putAll={(state) => this.putAlltoEdit(mapped,state)}
                  />
                </Col>
                <Col md={2} style={styles.editMenu}>
                  <EditPhotosModal
                    photos={this.state.picturesToEdit}
                  />
                </Col>
              </Row>
              )
            }
        </div>
      </Container>
    );
  }
}

const styles = {
  editMenu:{
      position: "sticky",
      top: "0",
      height: "4em",
      padding: "1em 0",
      zIndex: "4"
  }
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
