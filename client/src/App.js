import "./App.css";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/layout/LandingPage";
import React, { Fragment } from "react";

// Redux
import store from "./store";
import { Provider } from "react-redux";

function App() {
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
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
