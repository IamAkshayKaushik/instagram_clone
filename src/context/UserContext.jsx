import React from "react";

export const UserContext = React.createContext();

const initialState = {
  isLoggedIn: false,
  isLoginPending: false,
  loginError: null,
  userData: null,
  email: "",
  password: "",
};

// eslint-disable-next-line react/prop-types
export function UserContextProvider({ children }) {
  const [state, setState] = React.useState(initialState);

  const setLoginPending = (isLoginPending) => setState({ isLoginPending });
  const setLoginSuccess = (isLoggedIn) => setState({ isLoggedIn });
  const setLoginError = (loginError) => setState({ loginError });

  const [user, setUser] = React.useState({});

  const login = (email, password) => {
    console.log("inside login");
    setLoginPending(true);
    setLoginSuccess(false);
    setLoginError(null);

    fetchLogin(email, password, (error) => {
      setLoginPending(false);

      if (!error) {
        setLoginSuccess(true);
      } else {
        setLoginError(error);
      }
    });
  };

  const logout = () => {
    setLoginPending(false);
    setLoginSuccess(false);
    setLoginError(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, state, setState, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

const fetchLogin = (email, password, callback) =>
  setTimeout(() => {
    if (email === "admin" && password === "admin") {
      return callback(null);
    } else {
      return callback(new Error("Invalid email and password"));
    }
  }, 1000);

export function useUserContext() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
}
