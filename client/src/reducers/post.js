import {
  GET_POSTS,
  ADD_POST,
  GET_POST,
  UPDATE_LIKES,
  DELETE_POST,
  POST_ERROR,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "../actions/types";

const initialState = {
  post: null,
  posts: [],
  loading: true,
  error: {},
};

function postReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        loading: false,
        posts: [payload, ...state.posts],
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
      };
    case DELETE_POST:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post._id !== payload),
      };
    case ADD_COMMENT:
      return {
        ...state,
        loading: false,
        post: { ...state.post, comments: payload },
      };
    case DELETE_COMMENT:
      return {
        ...state,
        loading: false,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}

export default postReducer;
