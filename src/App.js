import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./Pages/Login"
import Dashboard from './Pages/Dashboard'
import './App.css';

import { ContextBody } from './context/Context'

function App() {
  return (
    <ContextBody>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </ContextBody>

  );
}

export default App;
