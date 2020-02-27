import React, { Fragment } from "react";
import { PrivateComponent } from "../../components";
import { Switch, Route } from "react-router-dom";
import UserDashboard from "./Profile/UserDashboard";
import EditProfile from "./EditProfile";
import UserPhotos from "./UserPhotos";
import UserAlbums from "./UserAlbums";
import PublicProfile from "./Profile/PublicProfile";
import NoMatch from "../../components/Routes/NoMatch";

const UserRouting = ({ ...props }) => (
  <Switch>
    <Route exact path={"/user/public/:id"} component={PublicProfile} />
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
    <Route component={NoMatch} />
  </Switch>
);

export default UserRouting;
