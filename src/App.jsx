// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";

export default function App() {
  // Optional: simple scroll-to-top on route changes
  React.useEffect(() => {
    const unlisten = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };
    // react-router v6 doesn't expose history listen easily here; this keeps it simple.
    // If you want a more robust solution, implement a ScrollToTop component that
    // reads location from `useLocation()` and calls scrollTo in a useEffect.
    return () => unlisten?.();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route
          path="*"
          element={
            <div className="pt-24 min-h-[60vh] px-6 text-center">
              <h1 className="text-3xl font-bold">Page Not Found</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                The page you’re looking for doesn’t exist.
              </p>
              <a href="/" className="mt-4 inline-block underline text-emerald-500">
                ← Back to home
              </a>
            </div>
          }
        />
      </Routes>
    </>
  );
}
