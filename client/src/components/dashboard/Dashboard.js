import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import React, { Fragment, useEffect } from "react";
import { getProfile } from "../../actions/profile";

function Dashboard({ auth, profile: userProfile, getProfile }) {
  const { user } = auth;
  const { loading, profile } = userProfile;

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line
  }, []);

  if (loading && profile === null) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      {!loading && profile === null ? (
        <Fragment>
          <p>You have not setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      ) : (
        <Fragment>
          <DashboardActions />
        </Fragment>
      )}
    </Fragment>
  );
}

Dashboard.propTypes = {
  getProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

const mapDispatchToProps = {
  getProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
