import UserService from "../../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

function LogoutBtn({ children, className = "", type = "button", ...props }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fetchLogout } = UserService;
  const state = useSelector((state) => state.user);
  return (
    <button
      type={type}
      className={`cursor-pointer ${className}`}
      onClick={() => {
        fetchLogout(state?.user.access).then(() => {
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
