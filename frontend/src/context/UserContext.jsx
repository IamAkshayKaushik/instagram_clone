import React from "react";
import { getAPIUrl } from "../conf/conf";
import { jwtDecode } from "jwt-decode";

export const UserContext = React.createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

// eslint-disable-next-line react/prop-types
export function UserContextProvider({ children }) {
  // Load user data from localStorage if available
  const storedUser = { isAuthenticated: true, user: JSON.parse(localStorage.getItem("user")) };
  const [state, dispatch] = React.useReducer(
    authReducer,
    storedUser.user ? storedUser : initialState
  );

  const login = async (username, password) => {
    await fetch(getAPIUrl("login"), {
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
          checkTokenExpiration(result, dispatch, logout);
          console.log("result", result);
          // Save user data to localStorage
          localStorage.setItem("user", JSON.stringify(result));
          dispatch({ type: "LOGIN", payload: result });
          console.log("redirect to dashboard");
        } else {
          alert("Please check your login information");
        }
      });
  };

  const logout = async () => {
    // remove user data from localStorage
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  return <UserContext.Provider value={{ state, login, logout }}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
}

const checkTokenExpiration = (user, dispatch, logout) => {
  if (!user) return;
  const refreshToken = user.refresh;

  const { exp } = jwtDecode(user.refresh);
  const currentTime = Math.floor(Date.now() / 1000);

  if (exp && exp - currentTime < 300) {
    // Token is about to expire (e.g., within 5 minutes)
    if (refreshToken) {
      // Use the refresh token to get a new access token
      fetch(getAPIUrl("refresh"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.access) {
            // Save the new access token in localStorage and update the user state
            const updatedUser = { ...user, access: result.access };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            dispatch({ type: "LOGIN", payload: updatedUser });
          }
        })
        .catch((error) => {
          // Handle refresh token request error
          console.error("Token refresh failed:", error);
        });
    } else {
      // No refresh token, user needs to log in again
      logout();
    }
  }

  // Schedule the next check
  setTimeout(() => checkTokenExpiration(user), 60000); // Check every minute
};
