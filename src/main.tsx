import "./registerSW.ts";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppShell } from "./AppShell.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppShell>
      <RouterProvider router={router} />
    </AppShell>
  </StrictMode>,
);
