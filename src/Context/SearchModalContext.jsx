import React, { createContext, useContext, useState } from "react";

const SearchModalContext = createContext();

export const SearchModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  return (
    <SearchModalContext.Provider value={{ isModalOpen, closeModal, openModal }}>
      {children}
    </SearchModalContext.Provider>
  );
};

export const useSearchModal = () => useContext(SearchModalContext);
