import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeTab from "./components/HomeTab/HomeTab";
import Layout from "./components/Layout";
import { ApiProvider } from "./Context/ApiContext";
import { SearchModalProvider } from "./Context/SearchModalContext";
import { SidebarProvider } from "./Context/SidebarContext";
import { ThemeProvider } from "./Context/ThemeContext";
import ForecastTabSkeleton from "./Skeletons/ForecastTabSkeleton";
import PreviewSkeleton from "./Skeletons/PreviewSkeleton";
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
    <ApiProvider>
      <ThemeProvider>
        <SidebarProvider>
          <SearchModalProvider>
            <RouterProvider router={Routes} />
          </SearchModalProvider>
        </SidebarProvider>
      </ThemeProvider>
    </ApiProvider>
  );
}

export default App;
