// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Login from "./components/Login";
import Container from "react-bootstrap/Container";

const App = () => {
  return (
    <Container className="w-100">
      <Router>
        <Routes>
        <Route
            path="/"
            element={
              <div>
                <Header /> <Home />
              </div>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </Container>
  );
};

export default App;
