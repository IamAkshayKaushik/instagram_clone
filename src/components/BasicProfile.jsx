function BasicProfile() {
  return (
    <section className="flex flex-row">
      <img
        src="https://avatars.githubusercontent.com/u/35657486?v=4"
        alt="Profile"
        className="rounded-full w-16 cursor-pointer"
        // width={80}
      />
      <div className="w-72 pl-2 m-auto">
        <div className="text-sm font-medium">
          <a src="">username</a>
        </div>
        <div className="text-sm text-gray-400">Akshay Kaushik | Backend Dev</div>
      </div>
      <div className="w-32 text-right">
        <a href="" className="text-xs text-sky-500 font-bold cursor-pointer">
          Sign out
        </a>
      </div>
    </section>
  );
}

export default BasicProfile;
