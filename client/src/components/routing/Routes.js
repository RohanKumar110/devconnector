import React from "react";
import Post from "../post/Post";
import Login from "../auth/Login";
import Posts from "../posts/Posts";
import Alert from "../layout/Alert";
import Register from "../auth/Register";
import Profile from "../profile/Profile";
import NotFound from "../layout/NotFound";
import Profiles from "../profiles/Profiles";
import Dashboard from "../dashboard/Dashboard";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "../routing/PrivateRoute";
import EditProfile from "../profile-form/EditProfile";
import AddEducation from "../profile-form/AddEducation";
import AddExperience from "../profile-form/AddExperience";
import CreateProfile from "../profile-form/CreateProfile";

function Routes() {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profile/:user_id" component={Profile} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/posts/:id" component={Post} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
}

export default Routes;