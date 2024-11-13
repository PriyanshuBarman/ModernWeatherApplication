import React from "react";
import { PiWifiX } from "react-icons/pi";
const NoInternet = () => {
  return (
    <div className="flex dark:bg-black min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-white to-blue-100 p-4 text-center">
      <div className="relative mb-6 flex items-center justify-center">
        <PiWifiX className="absolute -left-[6.99rem] -top-[179%] h-[240%] w-[160%] text-blue-600" />

        <h1 className="text-8xl font-bold italic text-blue-600">Oops!</h1>
      </div>

      <p className="text-xl font-bold italic text-gray-900">
        No internet connection!
      </p>
      <p className="mt-2 max-w-md italic text-gray-700">
        Something went wrong. Try refreshing the page or checking your internet
        connection.
      </p>
    </div>
  );
};

export default NoInternet;
