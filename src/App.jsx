// import logo from "./logo.svg";
import Navbar from "./components/Navbar.jsx";
import { useUserContext } from "./context/index";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";

function App() {
  const { state } = useUserContext();
  return !state.isLoggedIn ? (
    <Login />
  ) : (
    <>
      <Navbar />
      <Home />
    </>
  );
}

export default App;
