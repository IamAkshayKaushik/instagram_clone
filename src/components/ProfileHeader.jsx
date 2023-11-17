import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function ProfileHeader() {
  return (
    <div className="grid grid-cols-3 mb-10">
      <div className="bg-green p-3 rounded flex items-start justify-center">
        <img
          className="rounded-full"
          src="https://avatars.githubusercontent.com/u/35657486?v=4"
          width="150"
        />
      </div>
      <div className="bg-green p-3 rounded text-gray-600 col-span-2">
        <div className="flex items-center">
          <h1 className="text-3xl align-bottom block">username</h1>
          <Link
            as="button"
            to="/accounts/edit"
            className="bg-white ml-3  text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded text-sm">
            Edit Profile
          </Link>
          <a className="ml-3 cursor-pointer">
            <FontAwesomeIcon icon={faGear} className="text-2xl leading-6" />
          </a>
        </div>
        <div className="flex-row py-5 max-w-sm hidden lg:flex">
          <div className="basis-1/2 ">
            <strong>1000</strong> posts
          </div>
          <div className="basis-1/2">
            <strong className="mr-1">2556</strong>
            followers
          </div>
          <div className="basis-1/2">
            <strong className="mr-1">5000</strong>
            following
          </div>
        </div>
        <h3 className="font-bold">Akshay Kaushik | Web Dev</h3>
        <div className="whitespace-pre-wrap">
          <p>👀 I’m interested in Web Development and Machine Learning.</p>
          <p>🌱 I’m currently learning Tensorflow.</p>
          <p>💬 Ask me about anything related to Python/Django/Javascript/NextJs</p>
          <p>💞️ I’m looking to collaborate on Django, React and NextJs.</p>
        </div>
        <a href="data.me.website" target="_blank" className="text-blue-900 font-bold">
          me.website
        </a>
      </div>
    </div>
  );
}

export default ProfileHeader;
