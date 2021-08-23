import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { useState } from "react";
import { addComment } from "../../actions/post";

function CommentForm(props) {
  const { addComment, postId } = props;
  const [text, setText] = useState("");

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(postId, { text });
    setText("");
  };
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave A Comment</h3>
      </div>
      <form className="form my-1" onSubmit={handleSubmit}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Comment on this post"
          required
          value={text}
          onChange={handleChange}
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  addComment,
};

export default connect(null, mapDispatchToProps)(CommentForm);
