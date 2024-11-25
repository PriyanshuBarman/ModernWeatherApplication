import { Outlet } from "react-router-dom";
import { useApiData } from "../Context/ApiContext";
import BottomNavbar from "./BottomNavBar/BottomNavbar";
import SearchModal from "./BottomNavBar/SearchModal";
import NotFound from "./Not Found";
import ScrollToTop from "./ScrollToTop";
import Sidebar from "./Sidebar";
const Layout = () => {
  const { err } = useApiData();

  return (
    <>
      <div className="relative m-auto flex items-end justify-center overflow-hidden md:w-[375px]">
        <ScrollToTop />
        <ScrollToTop />
        {err ? <NotFound err={err} /> : <Outlet />}
        <Sidebar />
        <SearchModal />
        <BottomNavbar />
      </div>
    </>
  );
};

export default Layout;
