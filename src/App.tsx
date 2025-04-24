import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Chemicals from "./pages/chemicals";
import Login from "./pages/login";

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Chemicals />} />
              <Route path="/chemicals" element={<Chemicals />} />
              <Route path="/login" element={<Login />} />
          </Routes>
      </Router>
  );
}

export default App;
