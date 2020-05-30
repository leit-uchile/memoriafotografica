import React, { useEffect } from "react";
import { site_misc } from "../../../actions";
import { connect } from "react-redux";

/**
 * Render design pattern
 * @param {Object} request
 * @param {Function} render how to render details
 * @param {Function} actions how to render actions
 */
const PhotoRow = ({ request, actions, render, photoSet, getPhotoSet }) => {

  useEffect(()=>{
    getPhotoSet(request.photos)
  })

  return (
    <tr>
      <td>
        {actions(request)}
      </td>
      <td style={request.resolved ? {color: "green"} : {color: "red"}}>
        {request.resolved ? "Resuelta" : "Sin resolver"}
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
