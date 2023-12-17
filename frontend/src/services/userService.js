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
      .then((response) => {
        if (response.ok) {
          console.log("response", response);
          return response.json();
        }
      })
      .then((result) => {
        if (result) {
          localStorage.setItem("user", JSON.stringify(result));
          return result;
        }
      });
    return user;
  }

  async fetchLogout(access_token) {
    await fetch(getAPIUrl("logout"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      // body: JSON.stringify({}),
    });
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

  // Enhanced fetch function
  async fetchData(url, options = {}) {
    const { timeout = 10000, headers = {}, ...restOptions } = options;

    // Log request details
    console.log(`Fetching data from ${url} with options:`, options);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        ...restOptions,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Fetch error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Fetch error: ${error.message}`);
      // Return null, empty array, or other appropriate value for failure
      return null;
    }
  }
}

export default new UserService();
