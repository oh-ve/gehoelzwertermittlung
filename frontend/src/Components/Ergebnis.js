import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

export default function Ergebnisse({ triggerRefetch }) {
  const location = useLocation();
  const { formData, calculatedData } = location.state || {};

  const navigate = useNavigate();

  const fieldNames = [
    "Pflanzenart",
    "Anschaffungskosten",
    "Höhe",
    "Pflegekosten pro Jahr",
    "Pflegejahre",
    "Alter",
    "Engstand",
    "Schäden",
    "Pflegemängel",
    "Anschaffungshöhe",
    "Pflanzung",
    "Risiko",
    "Lebenserwartung",
    "Funktionserfüllung",
  ];
  const handleBackClick = () => {
    triggerRefetch();
    navigate("/rechner");
  };

  return (
    <div className="ergebnisse-container">
      <h1>Ergebnisse der Berechnung</h1>
      {formData && calculatedData ? (
        <table className="ergebnisse-table">
          <thead>
            <tr>
              {fieldNames.map((name, index) => (
                <th key={index}>{name}</th>
              ))}
              <th>ZWISCHENSUMME</th>
              <th>ZWISCHENSUMME NACH KOCH</th>
              <th>ZEITWERT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {Object.values(formData).map((value, index) => (
                <td key={index}>{value}</td>
              ))}
              <td>{calculatedData.zwischensumme1}</td>
              <td>{calculatedData.zwischensummeKoch}</td>
              <td>{calculatedData.zeitwert}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Keine Daten verfügbar.</p>
      )}
      <button onClick={handleBackClick} aria-label="Zurück zum Rechner">
        Zurück
      </button>
    </div>
  );
}
