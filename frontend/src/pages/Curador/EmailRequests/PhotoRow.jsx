import React, { useEffect } from "react";
import { site_misc } from "../../../actions";
import { connect } from "react-redux";
import { ButtonGroup } from "reactstrap";

/**
 * Render design pattern
 * @param {Object} request
 * @param {Function} render how to render details
 * @param {Function} actions how to render actions
 */
const PhotoRow = ({ request, key, actions, render, photoSet, getPhotoSet }) => {
  useEffect(()=>{
    console.log(key) // supuesto id de la request no incluido en {request}
    getPhotoSet(request.photos)
  })

  return (
    <tr>
      <td>
        <ButtonGroup>
          {actions(request, true)}
          {actions(request, false)}
        </ButtonGroup>
      </td>
      <td style={request.resolved ? request.email_sent ?{color: "green"} : {color: "red"}: {color: "red"}}>
        {request.resolved ? request.email_sent ?"Aprobada" :"Rechazada" : "Sin resolver"}
      </td>
      <td>
        {new Date(request.created_at).toLocaleDateString("es")}
      </td>
      <td>
        {new Date(request.updated_at).toLocaleDateString("es")}
      </td>
      <td>
        {request.reason}
      </td>
      <td>
        {render(photoSet)}
      </td>
    </tr>
  );
};

const mapStateToProps = state => ({
  photoSet: state.photos.photos
});

const mapActionsToProps = dispatch => ({
  getPhotoSet: (set) => dispatch(site_misc.pushPhotoArray(set))
});

export default connect(mapStateToProps, mapActionsToProps)(PhotoRow);
