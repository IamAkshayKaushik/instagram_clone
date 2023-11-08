// import { useDispatch } from "react-redux";
// import { login, logout } from "../store/userSlice";
import { getAPIUrl } from "../conf/conf";

class UserService {
  //   constructor() {
  //     this.dispatch = useDispatch();
  //   }

  async fetchLogin(username, password) {
    const user = await fetch(getAPIUrl("login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          localStorage.setItem("user", JSON.stringify(result));
          return result;
        }
      });
    return user;
  }

  async fetchLogout() {
    localStorage.removeItem("user");
    // this.dispatch(logout());
  }

  async getUser() {
    const user = JSON.parse(localStorage.getItem("user"));
    // const user = await fetch(getAPIUrl("userProfile"), {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    //   body: JSON.stringify({
    //     token: `Bearer ${token}`,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((result) => {
    //     if (result) {
    //       console.log("result", result);
    //       //   localStorage.setItem("user", JSON.stringify(result));
    //       console.log("redirect to dashboard");
    //     }
    //   });
    return user;
  }

  //   async refreshTokens(refreshToken) {
  //     // Make API call to refresh tokens
  //     const tokens = await fetchTokenRefresh(refreshToken);
  //     this.dispatch(setTokens(tokens));
  //   }
}

export default new UserService();
