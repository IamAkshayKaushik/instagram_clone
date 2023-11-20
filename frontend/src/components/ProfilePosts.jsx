import { faBookmark, faCirclePlay } from "@fortawesome/free-regular-svg-icons";
import { faPlay, faTableCells, faUserTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfilePost from "./ProfilePost";

function ProfilePosts() {
  return (
    <>
      <ul className="flex flex-row p-2 text-sm items-center justify-center border-t text-gray-400 h-16 lg:hidden">
        {[...Array(3).keys()].map((i) => (
          <li key={i} className="flex-1 text-center">
            <strong className="text-black block">105</strong> posts
          </li>
        ))}
      </ul>
      <div className="flex flex-row text-2xl items-center justify-center border-t uppercase text-gray-400 tracking-widest h-16 lg:text-xs">
        <a
          href=""
          className="text-black border-t border-black flex justify-center items-center h-full mr-16 cursor-pointer">
          <FontAwesomeIcon icon={faTableCells} />
          <span className="hidden ml-2 lg:inline-block">Posts</span>
        </a>
        <a href="" className="flex justify-center items-center h-full mr-16 cursor-pointer">
          <FontAwesomeIcon icon={faPlay} />
          <span className="hidden ml-2 lg:inline-block">Reels</span>
        </a>
        <a href="" className="flex justify-center items-center h-full mr-16 cursor-pointer">
          <FontAwesomeIcon icon={faCirclePlay} />
          <span className="hidden ml-2 lg:inline-block">Videos</span>
        </a>
        <a href="" className="flex justify-center items-center h-full mr-16 cursor-pointer">
          <FontAwesomeIcon icon={faBookmark} />
          <span className="hidden ml-2 lg:inline-block">Saved</span>
        </a>
        <a href="" className="flex justify-center items-center h-full mr-16 cursor-pointer">
          <FontAwesomeIcon icon={faUserTag} />
          <span className="hidden ml-2 lg:inline-block">Tagged</span>
        </a>
      </div>
      <div className="grid grid-cols-3 gap-1 lg:gap-8">
        {[...Array(7).keys()].map((i) => (
          <ProfilePost key={i} />
        ))}
      </div>
    </>
  );
}

export default ProfilePosts;
