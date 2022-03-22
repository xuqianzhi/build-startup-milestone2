import logo from './logo.svg';
import './App.css';
import Landing from './pages/Landing.jsx';
import Signin from './pages/Signin.jsx';
import Signup from './pages/Signup.jsx';
import Dashboard from './pages/landlord/Dashboard.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="signin/tenant" element={<Signin userType='tenant' />} />
        <Route path="signin/landlord" element={<Signin userType='landlord' />} />
        <Route path="signup" element={<Signup />} />
        <Route path="dashboard/landlord" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
