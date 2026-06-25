import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CustomCursor } from "./components/CustomCursor";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { ParticleField } from "./components/ParticleField";
import { SEO } from "./components/SEO";
import { useTheme } from "./hooks/useTheme";
import { Home } from "./pages/Home";

const ThreeBackground = lazy(() =>
  import("./components/ThreeBackground").then((module) => ({ default: module.ThreeBackground })),
);

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoaded(true), 1900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <SEO />
      <LoadingScreen isComplete={isLoaded} />
      <Suspense fallback={null}>
        <ThreeBackground />
      </Suspense>
      <ParticleField />
      <CustomCursor />
      <div className="relative z-10 min-h-screen">
        <Navbar theme={theme} onThemeToggle={toggleTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
