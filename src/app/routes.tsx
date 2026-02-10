import { createBrowserRouter } from "react-router-dom";
import { PublicLayout } from "./layouts/PublicLayout";
import { CustomerLayout } from "./layouts/CustomerLayout";
import { TraderLayout } from "./layouts/TraderLayout";

export const router = createBrowserRouter([
  { path: "/", element: <PublicLayout /> },
  { path: "/customer", element: <CustomerLayout /> },
  { path: "/trader", element: <TraderLayout /> },
]);
