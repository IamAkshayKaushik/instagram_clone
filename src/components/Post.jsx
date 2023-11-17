import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faComment,
  faBookmark,
  faPaperPlane,
  faFaceSmile,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Post() {
  return (
    <section className="border rounded-lg border-slate-200 mb-5 bg-white">
      <div className="p-3 flex flex-row">
        <div className="flex-1">
          <a href="" className="font-bold">
            <img
              src="https://randomuser.me/api/portraits/women/8.jpg"
              alt="woman img"
              className="rounded-full w-8 inline"
            />
            <span className="font-medium text-sm ml-2">John Doe</span>
          </a>
        </div>
      </div>
      <img
        src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg?tx=w_3840,q_auto"
        alt=""
        className="w-full"
      />
      <div className="p-3 flex flex-row text-2xl">
        <div className="flex-1">
          <a href="" className="mr-3 text-red-600 cursor-pointer">
            <FontAwesomeIcon icon={faHeart} />
          </a>

          <a href="" className="mr-3 hover:text-gray-500 cursor-pointer">
            <FontAwesomeIcon icon={faComment} />
          </a>
          <a href="" className="hover:text-gray-500 cursor-pointer">
            <FontAwesomeIcon icon={faPaperPlane} />
          </a>
        </div>
        <div>
          <a href="" className="hover:text-gray-500 cursor-pointer">
            <FontAwesomeIcon icon={faBookmark} />
          </a>
        </div>
      </div>
      <div className="font-medium text-sm px-3">1,000 likes</div>
      <div className="px-3 text-sm">
        <span className="font-medium">username</span> "Man is made by his belief. As he believes, so
        he is"
      </div>
      <div className="text-gray-500 uppercase p-3 text-xs tracking-wide mt-2">23 hours ago</div>
      <div className="p-3 flex flex-row border-t">
        <div className="flex items-center">
          <a href="" className="text-2xl cursor-pointer">
            <FontAwesomeIcon icon={faFaceSmile} />
          </a>
        </div>
        <div className="flex-1 pr-3 py-1">
          <input
            type="text"
            className="w-full px-3 py-1 text-sm outline-0"
            placeholder="Add a comment"
          />
        </div>
        <div className="flex items-center text-sm">
          <a href="" className="text-sky-500 font-medium cursor-pointer">
            Post
          </a>
        </div>
      </div>
    </section>
  );
}

export default Post;
