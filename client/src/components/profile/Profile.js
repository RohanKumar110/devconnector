import PropTypes from "prop-types";
import { connect } from "react-redux";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import React, { Fragment, useEffect } from "react";
import { getProfileByUserId } from "../../actions/profile";

function Profile(props) {
  const {
    auth,
    match,
    profile: { profile, loading },
    getProfileByUserId,
  } = props;

  useEffect(() => {
    getProfileByUserId(match.params.user_id);
  }, [getProfileByUserId, match.params.user_id]);

  return (
    <Fragment>
      {loading || profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getProfileByUserId: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

const mapDispatchToProps = {
  getProfileByUserId,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
