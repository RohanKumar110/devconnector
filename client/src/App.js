import "./App.css";
import Login from "./components/auth/Login";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/layout/LandingPage";
import React, { Fragment } from "react";

function App() {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={LandingPage} />
        <section className="container">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
}

export default App;
