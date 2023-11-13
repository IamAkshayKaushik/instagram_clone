import UserService from "../../services/userService";
import { useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

function LogoutBtn({ children, className = "", type = "button", ...props }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fetchLogout } = UserService;
  return (
    <button
      type={type}
      className={`cursor-pointer ${className}`}
      onClick={() => {
        fetchLogout().then(() => {
          dispatch(logout());
          navigate("/login");
        });
      }}
      {...props}>
      {children}
    </button>
  );
}

export default LogoutBtn;
