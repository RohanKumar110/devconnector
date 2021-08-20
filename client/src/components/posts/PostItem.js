import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addLike, removeLike } from "../../actions/post";

function PostItem(props) {
  const { auth, post, addLike, removeLike } = props;
  const { _id, text, name, avatar, user, likes, comments, createdAt } = post;

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to="/profile">
          <img className="round-img" src={avatar} alt={name} />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{createdAt}</Moment>
        </p>
        <button
          type="button"
          title="Like"
          className="btn btn-light"
          onClick={() => addLike(_id)}
        >
          <i className="fas fa-thumbs-up"></i>{" "}
          {likes.length > 0 && <span>{likes.length}</span>}
        </button>
        <button
          type="button"
          title="Unlike"
          className="btn btn-light"
          onClick={() => removeLike(_id)}
        >
          <i className="fas fa-thumbs-down"></i>
        </button>
        <Link to={`/post/${_id}`} className="btn btn-primary" title="Comment">
          Discussion{" "}
          {comments.length > 0 ? (
            <span className="comment-count">{comments.length}</span>
          ) : (
            <span className="comment-count">0</span>
          )}
        </Link>
        {!auth.loading && user === auth.user._id && (
          <button type="button" className="btn btn-danger" title="Delete">
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
}

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
});

const mapDispatchToProps = {
  addLike,
  removeLike,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
