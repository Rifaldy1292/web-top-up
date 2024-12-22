import { Button } from "./components/ui/button";
import { CarouselDemo } from "./components/layout/CaresoulLayOut";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/homePage";
import DiamondListGame from "./pages/diamondListGame";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/DiamondListGame" element={<DiamondListGame />} />
      </Routes>
    </>
  );
}

export default App;
