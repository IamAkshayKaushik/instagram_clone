import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faHouse } from "@fortawesome/free-solid-svg-icons";
import {
  faCommentDots,
  faSquarePlus,
  faCompass,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";

function Navbar() {
  return (
    <nav className="bg-white sticky w-full top-0 border border-b-2 z-50">
      <div className="container max-w-5xl">
        <div className="flex flex-row items-center py-1">
          <div className="basis-1/3">
            <img
              src="https://logos-world.net/wp-content/uploads/2020/04/Instagram-Logo-2010-2013.png"
              alt="app logo"
              width={120}
            />
          </div>
          <div className="basis-1/3 ">
            <div className="relative">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute left-3 top-3 text-gray-300"
              />
              <input
                type="text"
                placeholder="Search"
                className="p-2 pl-10 bg-gray-100 rounded-lg w-80 align-middle focus:outline-0 placeholder:font-light"
              />
            </div>
          </div>

          <div className="basis-1/3">
            <ul className="flex flex-row p-2 space-x-4 text-2xl items-center justify-end">
              <li>
                <a className="cursor-pointer">
                  <FontAwesomeIcon icon={faHouse} />
                </a>
              </li>
              <li>
                <a className="cursor-pointer">
                  <FontAwesomeIcon icon={faCommentDots} />
                </a>
              </li>
              <li>
                <a className="cursor-pointer">
                  <FontAwesomeIcon icon={faSquarePlus} />
                </a>
              </li>
              <li>
                <a className="cursor-pointer">
                  <FontAwesomeIcon icon={faCompass} />
                </a>
              </li>
              <li>
                <a className="cursor-pointer">
                  <FontAwesomeIcon icon={faHeart} />
                </a>
              </li>
              <li>
                <img
                  src="https://avatars.githubusercontent.com/u/35657486?v=4"
                  alt="profile"
                  className="rounded-full w-7 cursor-pointer"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
