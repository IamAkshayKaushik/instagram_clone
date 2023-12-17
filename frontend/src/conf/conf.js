export const BackendUrl = import.meta.env.VITE_DJANGO_BACKEND_URL;

export const APIEndpoints = {
  login: "/api/accounts/login/",
  logout: "/api/accounts/logout/",
  signup: "/api/accounts/register/",
  userProfile: "/api/accounts/profile/",
  refresh: "/api/accounts/token/refresh/",
  postsList: "/api/posts/posts/",
  post: "/api/posts/posts/<int:pk>/",
  postComments: "/api/posts/comments/",
  postComment: "/api/posts/comments/<int:pk>/",
  postLikes: "/api/posts/likes/",
  postLike: "/api/posts/likes/<int:pk>/",
  sharesList: "/api/posts/shares/",
  share: "/api/posts/shares/<int:pk>/",
  followerList: "/api/follow/follow/",
  follower: "/api/follow/follow/<int:pk>/",
  chatSocket: "/ws/chat/",
  callsSocket: "/ws/calls/",
};

export function getAPIUrl(endpoint) {
  return `${BackendUrl}${APIEndpoints[endpoint]}`;
  // return `${APIEndpoints[endpoint]}`;
}

// api.js

// import { getAPIUrl } from "./constants";

export function fetchPostById(id) {
  const postUrl = getAPIUrl("post").replace("<int:pk>", id);
  return fetch(postUrl);
}
