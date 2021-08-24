import "./App.css";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Navbar from "./components/layout/Navbar";
import Routes from "./components/routing/Routes";
import React, { Fragment, useEffect } from "react";
import LandingPage from "./components/layout/LandingPage";
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
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Routes />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
