import { useUserContext } from "../context";

function Footer() {
  const { logout } = useUserContext();
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
          <button onClick={logout} className="cursor-pointer">
            Logout
          </button>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
