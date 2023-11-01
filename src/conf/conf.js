export const BackendUrl = import.meta.env.VITE_DJANGO_BACKEND_URL;

export const APIEndpoints = {
  login: "/api/accounts/login/",
  logout: "/api/accounts/logout/",
  signup: "/api/accounts/register/",
  userProfile: "/api/accounts/profile/",
  refresh: "/api/accounts/token/refresh/",
  postsList: "/api/posts/posts/",
  commentsList: "/api/posts/comments/",
  likesList: "/api/posts/likes/",
  sharesList: "/api/posts/shares/",
  post: "/api/posts/posts/<int:pk>/",
  comment: "/api/posts/comments/<int:pk>/",
  like: "/api/posts/likes/<int:pk>/",
  share: "/api/posts/shares/<int:pk>/",
};

export function getAPIUrl(endpoint) {
  return `${BackendUrl}${APIEndpoints[endpoint]}`;
}

// api.js

// import { getAPIUrl } from "./constants";

export function fetchPostById(id) {
  const postUrl = getAPIUrl("post").replace("<int:pk>", id);
  return fetch(postUrl);
}
