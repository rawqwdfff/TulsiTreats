import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

import About from "./components/About";
import AppBar from "./components/AppBar";
import Login from "./components/Login";
import Products from "./components/Products";
import SignUp from "./components/SignUp";

function App() {
  return (
    <Router>
      <AppBar />

      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
