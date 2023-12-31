import "./App.css";
import Rechner from "./Components/Rechner";
import { useState, useEffect } from "react";
import Ergebnisse from "./Components/Ergebnis";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import { useJwt } from "react-jwt";
import Navbar from "./Components/Navbar";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const token = user?.token || "";

  const { isExpired } = useJwt(token);

  useEffect(() => {
    if (isExpired) {
      localStorage.removeItem("user");
      setUser(null);
    }
  }, [isExpired]);

  useEffect(() => {
    if (isExpired) {
      localStorage.removeItem("user");
      setUser(null);
    }
  }, [isExpired]);

  useEffect(() => {
    if (!user) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [user]);

  const [triggerFetch, setTriggerFetch] = useState(false);

  const triggerRefetch = () => {
    setTriggerFetch((prev) => !prev);
  };

  return (
    <div className="App">
      {user && <Navbar setUser={setUser} />}
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/rechner" /> : <Navigate to="/login" />}
        />

        <Route
          path="/rechner"
          element={<Rechner triggerRefetch={triggerRefetch} user={user} />}
        />
        <Route
          path="/ergebnisse"
          element={<Ergebnisse triggerRefetch={triggerRefetch} />}
        />
        <Route
          path="/login"
          element={
            !user ? <Login setUser={setUser} /> : <Navigate to="/rechner" />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
