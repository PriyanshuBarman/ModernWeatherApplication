import React, { memo } from "react";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mb-[12%] mt-12 flex h-[6em] w-full flex-col items-center font-[Arial] italic text-black/70 dark:text-white/55">
      <h1 className="flex w-full justify-center gap-4 text-center font-oxanium text-2xl font-semibold">
        Made With <FaHeart className="text-blue-500" />
      </h1>
      <h1 className="font-dancingScript text-xl">by Priyanshu</h1>
    </footer>
  );
};

export default memo(Footer);
