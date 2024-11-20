import { useEffect, useRef, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useApiData } from "../../Context/ApiContext";
import { useSearchModal } from "../../Context/SearchModalContext";

const SearchModal = () => {
  const { search } = useApiData();
  const [searchHistory, setSearchHistory] = useState([]);
  const { closeModal, isModalOpen } = useSearchModal();
  const [input, setInput] = useState("");
  const [error, setError] = useState(""); // Add error state
  const inputRef = useRef(null);

  useEffect(() => {
    const storedHistory = localStorage.getItem("searchHistory");
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  const saveSearchHistory = (newHistory) => {
    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  const handleSubmit = async (e, city) => {
    e.preventDefault();
    const trimmedCity = city.trim();

    // Validation check
    if (!trimmedCity || trimmedCity.length < 3) {
      setError("Please enter valid City name");
      setInput(""); // Clear the input if invalid
      return;
    }

    // If valid, proceed with search
    setError(""); // Clear any previous error
    search(e, city);
    inputRef.current.blur();
    setInput("");
    closeModal();

    if (trimmedCity && !searchHistory.includes(trimmedCity)) {
      const updatedHistory = [trimmedCity, ...searchHistory];
      saveSearchHistory(updatedHistory);
    }
  };

  const clearAllHistory = () => {
    saveSearchHistory([]);
  };

  const clearHistoryItem = (itemToRemove) => {
    const updatedHistory = searchHistory.filter(
      (item) => item !== itemToRemove,
    );
    saveSearchHistory(updatedHistory);
  };

  const SearchSuggestions = [
    "New York",
    "London",
    "Paris",
    "Tokyo",
    "Moscow",
    "Berlin",
    "Mumbai",
    "Dubai",
    "Sydney",
    "Shanghai",
  ];

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeModal}
        className={`fixed bottom-0 z-50 flex h-full w-full bg-black/10 dark:bg-black/25 ${
          isModalOpen ? "flex" : "hidden"
        }`}
      ></div>
      <div
        className={`fixed bottom-0 z-50 flex h-[75%] w-full flex-col items-center rounded-t-3xl border-t border-black/50 bg-[#f9f9f9] pt-2.5 font-oxanium text-white shadow-lg transition-all duration-75 ease-in-out dark:border-t dark:border-white/50 dark:bg-[#1e1e1e] md:w-[375px] ${
          isModalOpen ? "translate-y-0" : "translate-y-[100%]"
        }`}
      >
        <label
          onClick={closeModal}
          className="h-1 w-[20%] rounded-full bg-black/30 dark:bg-white/35"
        ></label>
        <button
          onClick={closeModal}
          className="absolute bottom-4 flex size-10 items-center justify-center rounded-full bg-blue-500 text-white dark:bg-white/35 dark:text-black dark:hover:bg-gray-700"
        >
          <IoClose className="size-[70%]" />
        </button>

        <form
          className="mt-7 flex min-h-12 w-[80%] items-center justify-center rounded-full bg-white px-5 italic shadow-[inset_-0px_-0px_1px_1px] shadow-black/50 dark:bg-black/5 dark:shadow-white/50"
          onSubmit={(e) => handleSubmit(e, input)}
        >
          <input
            type="text"
            className="h-full w-full bg-transparent text-black placeholder-gray-600 outline-none dark:text-white dark:placeholder-white/85"
            placeholder={error || "Search City Name"} // Display error in placeholder
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(""); // Clear error on input change
            }}
            ref={inputRef}
          />
          <button className="flex h-full w-[12%] items-center justify-center text-gray-700 dark:text-inherit">
            <IoMdSearch className="h-7 w-7" />
          </button>
        </form>

        <div className="w-full overflow-y-auto px-16 pb-28">
          {/* SEARCH HISTORY */}
          {searchHistory.length > 0 && (
            <div className="mt-4">
              <div className="mb-[7%] flex items-center justify-between">
                <h1 className="text-sm font-semibold text-blue-500 dark:text-blue-400">
                  Search History
                </h1>
                <button
                  onClick={clearAllHistory}
                  className="rounded-full bg-red-400 px-3 py-0.5 text-xs italic text-white hover:scale-105"
                >
                  Clear All
                </button>
              </div>
              <ul className="flex w-full cursor-pointer flex-wrap items-center justify-between gap-3 text-center text-sm text-black/70 dark:text-white/70">
                {searchHistory.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between gap-0.5 overflow-hidden rounded-full bg-black/15 py-0.5 pl-3 hover:bg-black/20 dark:bg-white/30"
                  >
                    <span onClick={(e) => handleSubmit(e, item)}>{item}</span>
                    <button
                      onClick={() => clearHistoryItem(item)}
                      className="px-2 text-xl leading-3 text-red-500"
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* SEARCH SUGGESTIONS */}
          <div className="mt-[10%]">
            <h1 className="mb-2 text-sm font-semibold italic text-gray-600 underline dark:text-gray-400">
              Famous Cities
            </h1>
            <ul className="flex w-full cursor-pointer flex-wrap items-center justify-between gap-3 text-center text-sm italic text-gray-600 dark:text-gray-400">
              {SearchSuggestions.map((item, i) => (
                <li
                  key={i}
                  onClick={(e) => handleSubmit(e, item)}
                  className="rounded-full px-4 outline outline-1 outline-black/50 transition duration-200 ease-in-out hover:bg-gray-300 dark:bg-transparent dark:outline dark:outline-white/40 dark:hover:bg-white/25"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;
