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
  Container,
  ButtonDropdown,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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
      selectedAll: false
    };
    this.props.onLoadGetPhotos(props.user.id, 100, 0); //no poner limite
    
  }

  handleOnRedirect(obj){ //no funcionando
    this.setState({
      redirect: true,
      chosenPhotoIndex: obj.photo.id
    })
  }
  
  handleOnSelect = obj=> {
    const id = obj.photo.id;
    const newList = this.state.picturesToEdit.filter(el => el !== id);
    {newList.length === this.state.picturesToEdit.length //el objeto no estaba
    ? (this.setState({picturesToEdit: [...newList, id] }) ) //lo agregamos
    : (this.setState({picturesToEdit: [...newList] }) )} //si estaba, asi que lo eliminamos
    // {this.state.picturesToEdit.length === mapped.length
    // ? (this.setState({selectedAll: true}))
    // : (this.setState({selectedAll: false}))}
  };

  putAllToEdit(mapped, state){
    state
    ? this.setState({picturesToEdit: mapped.map(el => (el.id)), selectedAll: state})
    : this.setState({picturesToEdit: [], selectedAll: state})
  }

  render() {
    var mapped = this.props.photos.map(el => ({
      src: el.thumbnail,
      height: el.aspect_h,
      width: el.aspect_w,
      id: el.id
    }));
    return (
      <Container fluid>
        <Row style={styles.titleContainer}>
          <Col style={styles.title}>
            <Button
                color="secondary"
                tag={Link}
                to="./dashboard" >
                <FontAwesomeIcon icon={faArrowAltCircleLeft} />{" "}
            </Button>
            <h2 style={{marginLeft:"10px"}}>Mis fotos</h2>
          </Col>
        </Row>
        <div style={styles.photosContainer}>
          <Row>
            <Col md={10}>
              <PhotoEditor
                  photos={mapped}
                  targetRowHeight={132}
                  onClick={(e, index) => this.handleOnSelect(index)}
                  //putAll={(state) => this.putAllToEdit(mapped,state)}
                  selectAll = {this.state.selectedAll}
                  redirectFunction={(e, obj) => this.handleOnRedirect(obj)}
              />
            </Col>
            <Col md={2} style={styles.filterMenu}>
              <UncontrolledButtonDropdown className="home-button">
                  <DropdownToggle caret>
                    Ordenar
                  </DropdownToggle>
                  <DropdownMenu
                    style={{ boxShadow: "0 0 15px 0 rgba(0,0,0,.20)" }}>
                    <div style={styles.triangulo}></div>
                    <DropdownItem header>Por orden cronológico</DropdownItem>
                    <DropdownItem>Más antiguas primero</DropdownItem>
                    <DropdownItem>Más nuevas primero</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem header>Por fecha de subida</DropdownItem>
                    <DropdownItem>
                      Más antiguas primero
                    </DropdownItem>
                    <DropdownItem>
                      Más nuevas primero
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              <Button
                onClick={()=>this.putAllToEdit(mapped, true)}>
                Seleccionar todas
              </Button>
              <EditPhotosModal
                photos={this.state.picturesToEdit}
              />
              <Button
                disabled={this.state.picturesToEdit.length == 0}
                color="danger"
                onClick={()=>this.putAllToEdit(mapped, false)}>
                Deseleccionar
              </Button>
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}

const styles = {
  titleContainer:{
    paddingTop: "1em",
    paddingLeft:"6em",
    paddingBottom:"1em",
    borderBottom: "1px solid rgb(210,214,218)",
    background: "white",
  },
  title:{
    textAlign: "left",
    display: "flex",
    //verticalAlign: "middle",
    //flexDirection: "row",
  },
  filterMenu:{
    position: "sticky",
    top: "0",
    height: "4em",
    padding: "1em 0",
    zIndex: "4"
  },
  triangulo: {
    position: "absolute",
    width: "20px",
    height: "20px",
    borderTop: "1px solid rgb(210,214,218)",
    borderRight: "0px solid rgb(210,214,218)",
    borderBottom: "0px solid rgb(210,214,218)",
    borderLeft: "1px solid rgb(210,214,218)",
    top: "0",
    left: "8em",
    marginLeft: "-45px",
    content: "",
    transform: "rotate(45deg)",
    marginTop: "-10px",
    background: "#ffff"
  },
  photosContainer: {
    width: "100%",
    paddingTop: "1.25em",
    paddingBottom: "1.25em",
    marginBottom:"-2em",
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
