import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getPosts } from "../../actions/post";
import React, { Fragment, useEffect } from "react";

function Posts(props) {
  const { post, getPosts } = props;
  const { posts, loading } = post;

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return <Fragment>Posts</Fragment>;
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

const mapDispatchToProps = {
  getPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
