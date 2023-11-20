import { useState, useEffect } from "react";

function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch("https://randomuser.me/api/?nat=us&randomapi&results=5")
      .then((res) => res.json())
      .then((data) => setSuggestions(data.results));
  }, []);
  return (
    <section className="flex flex-col">
      <div className="flex flex-row pt-5">
        <div className="w-72 font-bold text-gray-500 text-xs">Suggestions for you</div>
        <div className="w-32 text-right text-sm">
          <a href="" className="text-xs text-black-400 font-bold cursor-pointer">
            See All
          </a>
        </div>
      </div>

      {suggestions.map((suggestion, index) => (
        <div className="flex items-center py-2" key={index}>
          <a href="" className="inline-block align-top">
            <img
              className="rounded-full w-12"
              src={suggestion?.picture.thumbnail}
              alt={`Story of ${suggestion?.name.first}`}
            />
          </a>
          <div className="inline-block ml-2">
            <div className="text-sm font-medium">{suggestion?.name.first}</div>
            <div className="text-gray-500 text-xs">Suggested for you</div>
          </div>
          <div className="flex-1 items-center flex justify-end">
            <a href="" className="text-xs text-sky-500 font-bold">
              Follow
            </a>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Suggestions;
