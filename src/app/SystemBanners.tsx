import { useEffect, useState } from "react";

export function SystemBanners() {
  const [showOfflineReady, setShowOfflineReady] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then(() => {
        const hasShown = localStorage.getItem("offline-ready-shown");
        if (!hasShown) {
          setShowOfflineReady(true);
          localStorage.setItem("offline-ready-shown", "true");
        }
      });

      navigator.serviceWorker.addEventListener("controllerchange", () => {
        setUpdateAvailable(true);
      });
    }
  }, []);

  return (
    <>
      {showOfflineReady && (
        <div
          style={{
            background: "#E6F4ED",
            color: "#1E7F43",
            padding: "0.75rem 1rem",
          }}
        >
          Spaza Link is ready to use offline.
        </div>
      )}

      {updateAvailable && (
        <div
          style={{
            background: "#FFF4E5",
            color: "#8A4B00",
            padding: "0.75rem 1rem",
          }}
        >
          A new version is available. Refresh when you’re ready.
        </div>
      )}
    </>
  );
}
