import { GET_POSTS, UPDATE_LIKES, POST_ERROR } from "../actions/types";

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
    case UPDATE_LIKES:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
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
