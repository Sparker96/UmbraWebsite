import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "../components/features/about";
import Apply from "../components/features/apply";
import Home from "../components/features/home";
import Teams from "../components/features/teams";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/raidTeams" element={<Teams />} />
      <Route path="/about" element={<About />} />
      <Route path="/apply" element={<Apply />} />
    </Routes>
  );
};

export default App;
