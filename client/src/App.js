import "./App.css";
import { loadUser } from "./actions/auth";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import setAuthToken from "./utils/setAuthToken";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import React, { Fragment, useEffect } from "react";
import Profile from "./components/profile/Profile";
import Profiles from "./components/profiles/Profiles";
import Dashboard from "./components/dashboard/Dashboard";
import LandingPage from "./components/layout/LandingPage";
import PrivateRoute from "./components/routing/PrivateRoute";
import EditProfile from "./components/profile-form/EditProfile";
import AddEducation from "./components/profile-form/AddEducation";
import AddExperience from "./components/profile-form/AddExperience";
import CreateProfile from "./components/profile-form/CreateProfile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Redux
import store from "./store";
import { Provider } from "react-redux";

if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"));
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
    //eslint-disable-next-line
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={LandingPage} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:user_id" component={Profile} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
