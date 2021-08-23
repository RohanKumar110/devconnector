import PropTypes from "prop-types";
import { connect } from "react-redux";
import CommentForm from "./CommentForm";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import { getPost } from "../../actions/post";
import React, { Fragment, useEffect } from "react";

function Post(props) {
  const {
    post: { post, loading },
    getPost,
    match,
  } = props;

  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  return (
    <Fragment>
      {loading || post === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/posts" className="btn btn-light">
            Back To Posts
          </Link>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
        </Fragment>
      )}
    </Fragment>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

const mapDispatchToProps = {
  getPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
