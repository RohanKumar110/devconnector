import React, { Fragment } from "react";

function NotFound() {
  return (
    <Fragment>
      <h1 className="x-large text-primary">
        <i className="fas fa-exclamation-traingle" /> Page Not Found
      </h1>
      <p className="large">Sorry, this page does not exist</p>
    </Fragment>
  );
}

export default NotFound;