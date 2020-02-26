import React, { Fragment } from "react";
import { PrivateComponent } from "../../components";
import { Route } from "react-router-dom";
import UserDashboard from "./Profile/UserDashboard";
import EditProfile from "./EditProfile";
import UserPhotos from "./UserPhotos";
import UserAlbums from "./UserAlbums";
import PublicProfile from "./Profile/PublicProfile";

const UserRouting = ({ ...props }) => (
  <Fragment>
    <PrivateComponent
      exact
      path={"/user/dashboard"}
      component={UserDashboard}
      {...props}
    />
    <PrivateComponent
      path={"/user/editProfile"}
      component={EditProfile}
      {...props}
    />
    <PrivateComponent
      exact
      path={"/user/photos"}
      component={UserPhotos}
      {...props}
    />
    <PrivateComponent
      exact
      path={"/user/albums"}
      component={UserAlbums}
      {...props}
    />
    <Route exact path={"/user/public/:id"} component={PublicProfile} />
  </Fragment>
);

export default UserRouting;
