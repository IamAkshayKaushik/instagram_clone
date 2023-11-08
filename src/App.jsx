// import logo from "./logo.svg";
import Navbar from "./components/Navbar.jsx";
import { useUserContext } from "./context/index";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";

function App() {
  const { state } = useUserContext();
  console.log("state in App.jsx", state);
  return !state.isAuthenticated ? (
    <Login />
  ) : (
    <>
      <Navbar />
      <Home />
    </>
  );
}

export default App;
