// import { useUserContext } from "../context";
import UserService from "../services/userService";
import { useDispatch } from "react-redux";
import { logout } from "../store/userSlice";

function Footer() {
  const dispatch = useDispatch();
  // const { logout } = useUserContext();
  return (
    <footer className="py-5 text-center">
      <ul className="flex flex-row space-x-4 items-center justify-center p-2 text-xs text-gray-400">
        <li>
          <a href="" className="cursor-pointer">
            About
          </a>
        </li>
        <li>
          <a href="" className="cursor-pointer">
            Privacy
          </a>
        </li>
        <li>
          <a href="" className="cursor-pointer">
            Terms
          </a>
        </li>
        <li>
          <button
            onClick={(e) => {
              UserService.fetchLogout().then(() => {
                dispatch(logout());
              });
            }}
            className="cursor-pointer">
            Logout
          </button>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
