import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main';
import Detail from "./Detail";

function App() {

  return (
    <React.StrictMode>
         <Router>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/:name" element={<Detail />} />
          </Routes>
        </Router>
    </React.StrictMode>
  );
}

export default App;
