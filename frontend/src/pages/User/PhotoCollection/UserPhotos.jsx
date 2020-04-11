import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Button, Row, Col } from "reactstrap";
import { user, home, misc } from "../../../actions";
import EditPhotosModal from "./EditPhotosModal";
import PhotoEditor from "../../../components/PhotoEditor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";

class UserPhotos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      chosenPhotoIndex: 0,
      picturesToEdit: [],
      selectedAll: false,
      searchOrder: { field: "created_at", order: "desc" },
    };
    this.props.onLoadGetPhotos(props.user.id, 100, 0); //no poner limite
  }

  setSortingOrder(order) {
    this.setState({ ...this.state, searchOrder: order });
    this.props.sortByField(
      this.state.searchOrder.field,
      this.state.searchOrder.order
    );
  }

  handleOnRedirect = (obj) => {
    console.log(obj);
    this.setState({
      redirect: true,
      chosenPhotoIndex: obj.index,
    });
  };

  handleOnSelect = (obj) => {
    const id = obj.photo.id;
    const newList = this.state.picturesToEdit.filter((el) => el !== id);
    if (newList.length === this.state.picturesToEdit.length) {
      // si el objeto no estaba
      this.setState({ picturesToEdit: [...newList, id] }); //lo agregamos
    } else {
      this.setState({ picturesToEdit: [...newList] }); //si estaba, asi que lo eliminamos
    }
    // {this.state.picturesToEdit.length === mapped.length
    // ? (this.setState({selectedAll: true}))
    // : (this.setState({selectedAll: false}))}
  };

  putAllToEdit(mapped, state) {
    state
      ? this.setState({
          picturesToEdit: mapped.map((el) => el.id),
          selectedAll: state,
        })
      : this.setState({
          picturesToEdit: [],
          selectedAll: state,
        });
  }

  render() {
    var mapped = this.props.photos.map((el) => ({
      src: el.thumbnail,
      height: el.aspect_h,
      width: el.aspect_w,
      id: el.id,
    }));

    if (this.state.redirect) {
      this.props.setRoute("/photo/"); // For NavLink in Navbar
      this.props.setSelectedId(this.state.chosenPhotoIndex); // For in photo navigation
      return (
        <Redirect
          push
          to={`/photo/${mapped[this.state.chosenPhotoIndex].id}`}
        />
      );
    }
    return (
      <div>
        <Row style={styles.titleContainer}>
          <Col style={styles.title}>
            <Button color="secondary" tag={Link} to="./dashboard">
              <FontAwesomeIcon icon={faArrowAltCircleLeft} />{" "}
            </Button>
            <h2 style={{ marginLeft: "10px" }}>Mis fotos</h2>
          </Col>
        </Row>
        <div style={styles.photosContainer}>
          <Row>
            <Col md={10}>
              <PhotoEditor
                photos={mapped}
                targetRowHeight={250}
                onClick={(e, index) => this.handleOnSelect(index)}
                // putAll={(state) => this.putAllToEdit(mapped,state)}
                selectAll={this.state.selectedAll}
                onRedirect={(e, index) => this.handleOnRedirect(index)}
              />
            </Col>
            <Col md={2} style={styles.filterMenu}>
              <Button onClick={() => this.putAllToEdit(mapped, true)}>
                Seleccionar todas
              </Button>
              <EditPhotosModal photos={this.state.picturesToEdit} />
              <Button
                disabled={this.state.picturesToEdit.length === 0}
                color="danger"
                onClick={() => this.putAllToEdit(mapped, false)}
              >
                Deseleccionar
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const styles = {
  titleContainer: {
    paddingTop: "1em",
    paddingLeft: "6em",
    paddingBottom: "1em",
    borderBottom: "1px solid rgb(210,214,218)",
    background: "white",
  },
  title: {
    textAlign: "left",
    display: "flex",
    //verticalAlign: "middle",
    //flexDirection: "row",
  },
  filterMenu: {
    position: "sticky",
    top: "0",
    height: "4em",
    padding: "1em 0",
    zIndex: "4",
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
    background: "#ffff",
  },
  photosContainer: {
    width: "100%",
    minHeight: "70vh",
    paddingTop: "1.25em",
    paddingBottom: "1.25em",
    backgroundColor: "#f7f8fa",
    textAlign: "center",
  },
};
const mapStateToProps = (state) => ({
  photos: state.user.photos,
  user: state.user.userData,
});
const mapActionsToProps = (dispatch) => ({
  setSelectedId: (id) => dispatch(home.setSelectedId(id)),
  setRoute: (route) => dispatch(misc.setCurrentRoute(route)),
  sortByField: (tag, order) => dispatch(home.sortByField(tag, order)),
  onLoadGetPhotos: (user_id, limit, offset) =>
    dispatch(user.getUserPhotos(user_id, limit, offset)),
});

export default connect(mapStateToProps, mapActionsToProps)(UserPhotos);
