import React, { useEffect } from "react";
import { PrivateComponent } from "../../components";
import { Switch, Route } from "react-router-dom";
import UserDashboard from "./Profile/UserDashboard";
import EditProfile from "./EditProfile";
import UserPhotos from "./PhotoCollection/UserPhotos";
import PublicProfile from "./Profile/PublicProfile";
import NoMatch from "../../components/Routes/NoMatch";
import AlbumView from "./AlbumCollection/AlbumView";
import UserAlbums from "./AlbumCollection/UserAlbums";
import PublicAlbums from "./AlbumCollection/PublicAlbums";
import { connect } from "react-redux";
import { site_misc } from "../../actions";

const UserRouting = ({ setRoute, location, ...props }) => {
  useEffect(() => {
    setRoute(location.pathname);
  }, []);
  return (
    <Switch>
      <Route
        exact
        path={"/user/public/:id"}
        component={PublicProfile}
        location={location}
        {...props}
      />
      <Route
        exact
        path={"/user/:id/public/albums"}
        component={PublicAlbums}
        location={location}
        {...props}
      />
      <Route
        exact
        path={"/user/public/albums/:id"}
        component={AlbumView}
        location={location}
        {...props}
      />
      <PrivateComponent
        exact
        path={"/user/dashboard"}
        component={UserDashboard}
        location={location}
        {...props}
      />
      <PrivateComponent
        path={"/user/editProfile"}
        component={EditProfile}
        location={location}
        {...props}
      />
      <PrivateComponent
        exact
        path={"/user/photos"}
        component={UserPhotos}
        location={location}
        {...props}
      />
      <PrivateComponent
        exact
        path={"/user/albums"}
        component={UserAlbums}
        location={location}
        {...props}
      />
      <PrivateComponent
        exact
        path={"/user/albums/:id"}
        component={AlbumView}
        location={location}
        {...props}
      />
      <Route component={NoMatch} />
    </Switch>
  );
};

export default connect(null, (dispatch) => ({
  setRoute: (route) => dispatch(site_misc.setCurrentRoute(route)),
}))(UserRouting);
