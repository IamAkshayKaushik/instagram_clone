import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef, useCallback } from "react";

function Stories() {
  // let stories = [...Array(15).keys()];
  const [stories, setStories] = useState([]);
  const ref = useRef(null);
  useEffect(() => {
    fetch("https://randomuser.me/api/?nat=us&randomapi&results=10")
      .then((res) => res.json())
      .then((data) => setStories(data.results));
  }, [setStories]);

  const scroll = useCallback(
    (scrollOffset) => {
      ref.current.scrollLeft += scrollOffset;
    },
    [ref]
  );

  return (
    <>
      <section className="relative mb-5 bg-white" aria-label="Stories">
        <div className="absolute left-3 top-1/2">
          <button
            className="bg-white text-gray-400 flex items-center justify-center rounded-full text-sm w-6 h-6 shadow-md cursor-pointer"
            aria-label="Previous story"
            onClick={() => scroll(-150)}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </div>

        {/* <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="absolute flex justify-center">
          <span className="px-2 text-sm text-gray-500">Stories</span>
        </div> */}

        <ul
          className="border rounded-lg border-slate-200 p-4 flex space-x-4 overflow-x-auto scrollbar-hide"
          ref={ref}>
          {stories.map((story, index) => (
            <li key={index} className="flex flex-col items-center space-y-1">
              <div className="bg-gradient-to-tr from-yellow-400 to-purple-600 p-0.5 rounded-full">
                <a className="block bg-white p-0.5 rounded-full cursor-pointer">
                  <img
                    src={story?.picture.thumbnail}
                    alt={`Story of ${story?.name.first}`}
                    className="rounded-full w-16 h-16"
                  />
                </a>
              </div>
              <a className="cursor-pointer">
                <div className="text-xs text-center overflow-hidden text-ellipsis w-20">
                  {story?.name.first}
                </div>
              </a>
            </li>
          ))}
        </ul>
        <div className="absolute right-3 top-1/2">
          <button
            className="bg-white text-gray-400 flex items-center justify-center rounded-full text-sm w-6 h-6 shadow-md cursor-pointer"
            aria-label="Next story"
            onClick={() => scroll(150)}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </section>
    </>
  );
}

export default Stories;
