import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function ProfilePost() {
  const [showOverlay, setOverlay] = useState(false);
  return (
    <>
      <div
        className="relative overflow-hidden w-full pt-[100%]"
        onMouseOver={() => setOverlay(true)}
        onMouseOut={() => setOverlay(false)}>
        <a>
          <div
            className={`bg-gray-800 bg-opacity-60 h-full w-full absolute inset-0 z-10 flex items-center justify-center text-white ${
              showOverlay ? "" : "hidden"
            }`}>
            <FontAwesomeIcon icon={faHeart} />
            <span className="ml-2">200</span>
            <FontAwesomeIcon icon={faComment} className="ml-8" />
            <span className="ml-2">200</span>
          </div>
        </a>
        <img
          src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg?tx=w_3840,q_auto"
          alt="Post"
          className="absolute inset-0 object-cover w-full h-full"
        />
      </div>
    </>
  );
}

export default ProfilePost;
