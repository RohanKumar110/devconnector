import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
import React, { Fragment, useEffect } from "react";
import { getProfiles } from "../../actions/profile";

function Profiles(props) {
  const { getProfiles, profile } = props;
  const { profiles, loading } = profile;

  useEffect(() => {
    getProfiles();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {loading || profiles.length === 0 ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" /> Browse and connect with
            developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

const mapDispatchToProps = {
  getProfiles,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
