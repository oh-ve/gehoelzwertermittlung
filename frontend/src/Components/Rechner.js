import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Liste from "./Liste";

export default function Rechner({ user, triggerRefetch }) {
  const [formData, setFormData] = useState({
    pflanzenart: "",
    anschaffungskosten: 0,
    hoehe: 0,
    pflegekostenProJahr: 0,
    pflegejahre: 0,
    alter: 0,
    engstand: 0,
    schaeden: 0,
    pflegemaengel: 5,
    anschaffungshoehe: 0,
    pflanzung: 0,
    risiko: 0,
    lebenserwartung: 0,
    funktionserfuellung: 0,
  });

  const [pflanzen, setPflanzen] = useState([]);
  const navigate = useNavigate();
  const url1 = "https://gehoelzwertermittlung.onrender.com/pflanzen";
  const url2 = "http://localhost:8080/pflanzen";

  const fetchData = () => {
    if (user && user.token) {
      axios
        .get(url1, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          setPflanzen(response.data.plants);
        })
        .catch((error) => {
          console.error("Error fetching plants:", error);
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, [user, triggerRefetch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value && !isNaN(value) ? parseFloat(value) : value,
    });
  };

  const handleCalculateClick = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;
      if (!token) {
        console.error("No token found, user must be logged in to calculate.");
        return;
      }
      const response = await axios.post(url1, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/ergebnisse", {
        state: { formData, calculatedData: response.data },
      });
    } catch (error) {
      console.error("Fehler bei der Berechnung:", error);
    }
  };

  return (
    <div>
      <form>
        <h1>Gehölzwertermittlung</h1>

        <label>
          Pflanzenart:
          <input
            type="text"
            name="pflanzenart"
            value={formData.pflanzenart}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Anschaffungskosten (Euro):
          <input
            type="number"
            name="anschaffungskosten"
            value={formData.anschaffungskosten}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Höhe (cm):
          <input
            type="number"
            name="hoehe"
            value={formData.hoehe}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Pflegekosten pro Jahr (Euro):
          <input
            type="number"
            name="pflegekostenProJahr"
            value={formData.pflegekostenProJahr}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Pflegejahre:
          <input
            type="number"
            name="pflegejahre"
            value={formData.pflegejahre}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Alter (Jahre):
          <input
            type="number"
            name="alter"
            value={formData.alter}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Engstand (%):
          <input
            type="number"
            name="engstand"
            value={formData.engstand}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Schäden (%):
          <input
            type="number"
            name="schaeden"
            value={formData.schaeden}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Pflegemängel (%):
          <input
            type="number"
            name="pflegemaengel"
            value={formData.pflegemaengel}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Anschaffungshöhe (cm):
          <input
            type="number"
            name="anschaffungshoehe"
            value={formData.anschaffungshoehe}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Pflanzung (Stunden):
          <input
            type="number"
            name="pflanzung"
            value={formData.pflanzung}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Risiko (%):
          <input
            type="number"
            name="risiko"
            value={formData.risiko}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Lebenserwartung (Jahre):
          <input
            type="number"
            name="lebenserwartung"
            value={formData.lebenserwartung}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Funktionserfüllung (Jahre):
          <input
            type="number"
            name="funktionserfuellung"
            value={formData.funktionserfuellung}
            onChange={handleInputChange}
          />
        </label>

        <button type="button" onClick={handleCalculateClick}>
          Berechnen
        </button>
      </form>
      <Liste pflanzen={pflanzen} triggerRefetch={triggerRefetch} user={user} />
    </div>
  );
}
