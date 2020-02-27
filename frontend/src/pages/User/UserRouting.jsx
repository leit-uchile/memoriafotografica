import React from "react";
import { PrivateComponent } from "../../components";
import { Switch, Route } from "react-router-dom";
import UserDashboard from "./Profile/UserDashboard";
import EditProfile from "./EditProfile";
import UserPhotos from "./UserPhotos";
import PublicProfile from "./Profile/PublicProfile";
import NoMatch from "../../components/Routes/NoMatch";
import AlbumView from "./AlbumCollection/AlbumView";

const UserRouting = ({ ...props }) => (
  <Switch>
    <Route
      exact
      path={"/user/public/:id"}
      component={PublicProfile}
      {...props}
    />
    <Route
      exact
      path={"/user/public/albums/:id"}
      component={AlbumView}
      {...props}
    />
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
      component={NoMatch}
      {...props}
    />
    <Route component={NoMatch} />
  </Switch>
);

export default UserRouting;
