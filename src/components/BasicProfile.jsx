import { useSelector } from "react-redux";
import LogoutBtn from "./Header/LogoutBtn";

function BasicProfile() {
  const state = useSelector((state) => state.user.user);
  return (
    <section className="flex flex-row">
      <img
        // src="https://avatars.githubusercontent.com/u/35657486?v=4"
        src={state?.profile?.profile_picture}
        alt="Profile"
        className="rounded-full w-16 cursor-pointer"
        // width={80}
      />
      <div className="w-72 pl-2 m-auto">
        <div className="text-sm font-medium">
          <a src="">{state?.first_name + " " + state?.last_name}</a>
        </div>
        <div className="text-sm text-gray-400">{state?.profile?.bio}</div>
      </div>
      <div className="w-32 text-right m-auto">
        <LogoutBtn className="text-xs text-sky-500 font-bold cursor-pointer">Sign out</LogoutBtn>
      </div>
    </section>
  );
}

export default BasicProfile;
