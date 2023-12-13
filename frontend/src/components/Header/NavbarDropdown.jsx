import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faGear, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import LogoutBtn from "./LogoutBtn";

function NavbarDropdown() {
  // const [open, setOpen] = useState(false);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-block w-8 h-8 justify-center bg-white text-sm font-medium text-gray-700">
        <img
          src="https://avatars.githubusercontent.com/u/35657486?v=4"
          alt="profile"
          className="rounded-full w-8 cursor-pointer"
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0">
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <Link
                  className={`block px-4 py-2 text-sm text-gray-700 ${
                    active && "bg-gray-100 text-gray-900"
                  }`}
                  to={"/profile"}>
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  Profile
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  className={`block px-4 py-2 text-sm text-gray-700 ${
                    active && "bg-gray-100 text-gray-900"
                  }`}
                  to={"/settings"}>
                  <FontAwesomeIcon icon={faGear} className="mr-2" />
                  Settings
                </Link>
              )}
            </Menu.Item>
          </div>
          <div>
            <Menu.Item>
              {({ active }) => (
                <>
                  <LogoutBtn
                    className={`block px-4 py-2 text-sm text-gray-700 ${
                      active && "bg-gray-100 text-gray-900"
                    }`}>
                    <FontAwesomeIcon icon={faRightFromBracket} className="px-2" /> Logout
                  </LogoutBtn>
                </>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default NavbarDropdown;
