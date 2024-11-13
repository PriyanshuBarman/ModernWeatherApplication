import { Outlet } from "react-router-dom";
import BottomNavbar from "./BottomNavBar/BottomNavbar";
import SearchModal from "./BottomNavBar/SearchModal";
import NoInternet from "./NoInternet";
import ScrollToTop from "./ScrollToTop";
import Sidebar from "./Sidebar";
import { useApiData } from "../Context/ApiContext";
import NotFound from "./Not Found";
const Layout=()=> {
  const { err } = useApiData();

  if (!navigator.onLine) {
    return <NoInternet />;
  }

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
}

export default Layout;