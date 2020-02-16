import React, {useEffect} from "react";
import uuid from "uuid";
import PropTypes from 'prop-types';

/**
 * Load user image if available or instead a 
 * picture composed by the user initials on a canvas.
 */
const UserPicture = ({ user, dims, render }) => {
  const html_id = uuid.v4();

  useEffect(() => {
    if (user.avatar === null) {
      var canvas = document.getElementById(html_id);
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = "#FF0000";
      ctx.fillRect(0, 0, dims, dims);
      ctx.font = `${dims*0.5}px Arial`;
      ctx.fillStyle = "#FFF";
      ctx.fillText(
        user.first_name.slice(0, 1) + user.last_name.slice(0, 1),
        0.15 * dims,
        0.5 * dims + 0.15 * dims
      );
    }
  }, [user.avatar])
  return user.avatar === null ? (
    <canvas id={html_id} height={`${dims}px`} width={`${dims}px`} />
  ) : (
    render(user)
  );
};

UserPicture.propTypes = {
  user: PropTypes.object.isRequired,
  dims: PropTypes.number.isRequired,
  render: PropTypes.func.isRequired
}

export default UserPicture;
