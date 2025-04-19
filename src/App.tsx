import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Chemicals from "./pages/chemicals";

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Chemicals />} />
              <Route path="/chemicals" element={<Chemicals />} />
          </Routes>
      </Router>
  );
}

export default App;
