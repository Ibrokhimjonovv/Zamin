import { Route, Routes, useNavigate } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/main.scss";
import ZaminEco from "./pages/zamineco";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import HomeLayout from "./layouts/home-layout";
import { useUserContext } from "./contexts/users-context";
import { useEffect } from "react";
import Signup from "./pages/signup";
import Tests from "./pages/tests";
import Testing from "./pages/tests-inner";

function App() {
  const navigate = useNavigate();
  const { token, setToken } = useUserContext();

  useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");
    if (savedToken) {
      setToken(savedToken);
    }
  }, [navigate, setToken]);

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<HomeLayout />} />
        <Route path="/eco" element={<ZaminEco />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/testing" element={<Testing />}/>
        { token && <Route path="/dashboard" element={<Dashboard />} /> }
      </Routes>
    </div>
  );
}

export default App;
