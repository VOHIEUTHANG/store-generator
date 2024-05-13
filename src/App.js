import MainLayout from "./layout/main.layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import routes from "routes/index.routes";
import { useEffect, useState } from "react";
import Loading from "components/loading";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleBeforeUnload = () => {
      setIsLoading(false);
    };

    window.addEventListener("load", handleBeforeUnload);

    return () => {
      window.removeEventListener("load", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="app">
      {isLoading && <Loading />}
      <Routes>
        {routes.map((route, index) => {
          const Element = route.element;
          const Layout = route.layout || MainLayout;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Element />
                </Layout>
              }
            />
          );
        })}
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
