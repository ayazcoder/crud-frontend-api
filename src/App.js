import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Read from "./Pages/Read";
import Edit from "./Pages/Edit";
import AddEmployeeModal from "./components/AddEmployeeModal.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <AddEmployeeModal />
        <Navbar />
        <Routes>
          <Route path="/" element={<Read />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
