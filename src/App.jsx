import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import { ApiProvider } from "./Context/ApiContext";
import { SearchModalProvider } from "./Context/SearchModalContext";
import { SidebarProvider } from "./Context/SidebarContext";
import { ThemeProvider } from "./Context/ThemeContext";
import { TimeProvider } from "./Context/TimeContext";
import ForecastTabSkeleton from "./Skeletons/ForecastTabSkeleton";
import PreviewSkeleton from "./Skeletons/PreviewSkeleton";
import HomeTab from "./components/HomeTab/HomeTab";
const ForecastTab = lazy(() => import("./components/ForecastTab/ForecastTab"));
const Preview = lazy(() => import("./components/Preview"));

function App() {
  let Routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomeTab />,
        },
        {
          path: "Forecast",
          element: (
            <Suspense fallback={<ForecastTabSkeleton />}>
              <ForecastTab />
            </Suspense>
          ),
        },
        {
          path: "/Forecast/:index",
          element: (
            <Suspense fallback={<PreviewSkeleton />}>
              <Preview />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return (
    <SearchModalProvider>
      <ApiProvider>
        <ThemeProvider>
          <SidebarProvider>
            <TimeProvider>
              <RouterProvider router={Routes} />
            </TimeProvider>
          </SidebarProvider>
        </ThemeProvider>
      </ApiProvider>
    </SearchModalProvider>
  );
}

export default App;
