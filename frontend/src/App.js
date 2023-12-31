import "./App.css";
import Rechner from "./Components/Rechner";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Ergebnisse from "./Components/Ergebnis";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import { useJwt } from "react-jwt";
import Navbar from "./Components/Navbar";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // Extract the token from the user object, or use an empty string as a fallback
  const token = user?.token || "";

  // Use the useJwt hook with the token
  const { decodedToken, isExpired } = useJwt(token);

  useEffect(() => {
    // If the token is expired, remove user from localStorage and update state
    if (isExpired) {
      localStorage.removeItem("user");
      setUser(null);
    }
  }, [isExpired]);

  useEffect(() => {
    if (isExpired) {
      // Handle expired token
      localStorage.removeItem("user");
      setUser(null);
    }
  }, [isExpired]);

  useEffect(() => {
    if (!user) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [user]);

  const [pflanzen, setPflanzen] = useState([]);

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
