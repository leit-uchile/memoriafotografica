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
  Container
} from "reactstrap";
import { user, misc } from "../../actions";
import Gallery from "react-photo-gallery";
import EditPhotosModal from "./EditPhotosModal"
import PhotoSelector from "../../components/PhotoSelector";
import LeitSpinner from "../../components/LeitSpinner";

class UserPhotos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      chosenPhotoIndex: 0,
      edit: true,
      picturesToEdit: [],
    };
  }
  componentWillMount() {
    const { user } = this.props;
    this.props.onLoadGetPhotos(user.id, 100, 0);
  }
  componentDidMount(){
    const { user } = this.props;
  }
  handleRedirect = obj => { //no funcionando
    this.setState({ redirect: true, chosenPhotoIndex: obj.index });
  };

  changeMode(){ //se cae
    this.setState({ edit: !this.state.edit });
  };

  

  handleSubmit = e => {
    e.preventDefault();
    this.props.createCategory(this.state);
  };

  handleOnClick = obj => {
    const {id} = obj.photo;
    const newList = this.state.picturesToEdit.filter(el => el !== id);
    this.setState({picturesToEdit: [...newList, id]});
  };

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
    const { photos } = this.props.photos;
    const { user } = this.props.user;

    return (
      <Container>
        <Row>
          <Col>
            <h2>Mis fotos</h2>
            <Button
            onClick={this.changeMode}>Modo edición</Button>
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: "center" }}>
            {!this.state.edit ? (
              <Gallery
                photos={mapped}
                targetRowHeight={200}
                onClick={(e, index) => this.handleRedirect(index)}
              />) :(
              <div>
                <EditPhotosModal
                photos={this.state.picturesToEdit[0]}/>
                
                <PhotoSelector
                photos={mapped}
                targetRowHeight={200}
                onClick={(e, index) => this.handleOnClick(index)}
                />
              </div>
              )
            }
          </Col>
        </Row>
      </Container>
    );
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
