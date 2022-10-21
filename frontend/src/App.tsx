import React from "react";
import { Route, Routes } from "react-router";

import { Add, Books, Update } from "./pages";

import "./App.css";

function App(): React.ReactElement {
  return (
    <Routes>
      <Route path="/" element={<Books />} />
      <Route path="/add" element={<Add />} />
      <Route path="/:bookId" element={<Update />} />
    </Routes>
  );
}

export default App;
