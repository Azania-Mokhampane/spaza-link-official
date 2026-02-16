import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";
import { SystemBanners } from "./app/SystemBanners";
import { routes } from "./routes";
import BottomNav from "./components/navigation/BottomNav";
import { Toaster } from "./components/ui/sonner";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex min-h-svh w-full flex-col pb-16 sm:pb-0">
        <Toaster richColors />
        <Navbar />
        <SystemBanners />
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))}
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
};

export default App;
