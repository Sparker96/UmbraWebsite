import React from "react";
import { Routes, Route } from "react-router-dom";
import Members from "./features/members";
import Apply from "./features/apply";
import Home from "./features/home";
import Teams from "./features/teams";
import Member from "./features/member";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/raidTeams" element={<Teams />} />
      <Route path="/members" element={<Members />} />
      <Route path="/apply" element={<Apply />} />
      <Route path="/member/:name" element={<Member />} />
    </Routes>
  );
};

export default App;
