import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { useEffect } from "react";
import { getProfile } from "../../actions/profile";

function Dashboard(props) {
  const { auth, profile, getProfile } = props;

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line
  }, []);

  return <div>Dashboard</div>;
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
