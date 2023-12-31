import React, { useState } from "react";
import axios from "axios";
import { RiDeleteBin2Line } from "react-icons/ri";

export default function Liste({ user, pflanzen, triggerRefetch }) {
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filterPflanzenart, setFilterPflanzenart] = useState("Alle");

  const url1 = "https://gehoelzwertermittlung.onrender.com/pflanzen";
  const url2 = "http://localhost:8080/pflanzen";

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const applyFilter = () => {
    if (filterPflanzenart === "Alle") {
      return pflanzen;
    } else {
      return pflanzen.filter(
        (plant) => plant.pflanzenart === filterPflanzenart
      );
    }
  };

  const compareValues = (a, b) => {
    if (a === b) {
      return 0;
    }
    return a < b ? -1 : 1;
  };

  const sortedPflanzen = [...applyFilter()].sort((a, b) => {
    if (sortColumn === "pflanzenart") {
      return (
        compareValues(
          a[sortColumn].toLowerCase(),
          b[sortColumn].toLowerCase()
        ) * (sortDirection === "asc" ? 1 : -1)
      );
    } else if (
      sortColumn === "pflegekostenProJahr" ||
      sortColumn === "alter" ||
      sortColumn === "schaeden"
    ) {
      const aValue = a[sortColumn]
        ? parseFloat(a[sortColumn])
        : Number.MAX_VALUE;
      const bValue = b[sortColumn]
        ? parseFloat(b[sortColumn])
        : Number.MAX_VALUE;
      return compareValues(aValue, bValue) * (sortDirection === "asc" ? 1 : -1);
    } else {
      return (
        compareValues(a[sortColumn], b[sortColumn]) *
        (sortDirection === "asc" ? 1 : -1)
      );
    }
  });

  const handleFilterChange = (e) => {
    setFilterPflanzenart(e.target.value);
  };

  const pflanzenartOptions = [
    ...new Set(pflanzen.map((plant) => plant.pflanzenart)),
  ];
  pflanzenartOptions.unshift("Alle");

  const confirmDelete = (plantId) => {
    if (window.confirm("Eintrag unwiderruflich löschen?")) {
      deletePlant(plantId);
    }
  };

  const deletePlant = async (plantId) => {
    const deleteUrl = `${url1}/del/${plantId}`;

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;
      if (!token) {
        console.error("No token found, user must be logged in to delete.");
        return;
      }
      await axios.delete(deleteUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      triggerRefetch();
    } catch (error) {
      console.error("Pflanze konnte nicht gelöscht werden", error);
    }
  };

  return (
    <div className="ergebnisse-container">
      <h1>Alle Pflanzen</h1>
      <div className="dropdown">
        <label>
          Filter by Pflanzenart:{" "}
          <select value={filterPflanzenart} onChange={handleFilterChange}>
            {pflanzenartOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <table className="ergebnisse-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("pflanzenart")}>
              Pflanzenart{" "}
              {sortColumn === "pflanzenart" && sortDirection === "asc"
                ? "▲"
                : "▼"}
            </th>
            <th onClick={() => handleSort("anschaffungskosten")}>
              Anschaffungskosten{" "}
              {sortColumn === "anschaffungskosten" && sortDirection === "asc"
                ? "▲"
                : "▼"}
            </th>
            <th onClick={() => handleSort("hoehe")}>
              Höhe{" "}
              {sortColumn === "hoehe" && sortDirection === "asc" ? "▲" : "▼"}
            </th>
            <th onClick={() => handleSort("pflegekostenProJahr")}>
              Pflegekosten pro Jahr{" "}
              {sortColumn === "pflegekostenProJahr" && sortDirection === "asc"
                ? "▲"
                : "▼"}
            </th>
            <th onClick={() => handleSort("pflegejahre")}>
              Pflegejahre{" "}
              {sortColumn === "pflegejahre" && sortDirection === "asc"
                ? "▲"
                : "▼"}
            </th>
            <th onClick={() => handleSort("alter")}>
              Alter{" "}
              {sortColumn === "alter" && sortDirection === "asc" ? "▲" : "▼"}
            </th>
            <th onClick={() => handleSort("engstand")}>
              Engstand{" "}
              {sortColumn === "engstand" && sortDirection === "asc" ? "▲" : "▼"}
            </th>
            <th onClick={() => handleSort("schaeden")}>
              Schäden{" "}
              {sortColumn === "schaeden" && sortDirection === "asc" ? "▲" : "▼"}
            </th>
            <th onClick={() => handleSort("pflegemaengel")}>
              Pflegemängel{" "}
              {sortColumn === "pflegemaengel" && sortDirection === "asc"
                ? "▲"
                : "▼"}
            </th>
            <th onClick={() => handleSort("anschaffungshoehe")}>
              Anschaffungshöhe{" "}
              {sortColumn === "anschaffungshoehe" && sortDirection === "asc"
                ? "▲"
                : "▼"}
            </th>
            <th onClick={() => handleSort("pflanzung")}>
              Pflanzung{" "}
              {sortColumn === "pflanzung" && sortDirection === "asc"
                ? "▲"
                : "▼"}
            </th>
            <th onClick={() => handleSort("risiko")}>
              Risiko{" "}
              {sortColumn === "risiko" && sortDirection === "asc" ? "▲" : "▼"}
            </th>
            <th onClick={() => handleSort("lebenserwartung")}>
              Lebenserwartung{" "}
              {sortColumn === "lebenserwartung" && sortDirection === "asc"
                ? "▲"
                : "▼"}
            </th>
            <th onClick={() => handleSort("funktionserfuellung")}>
              Funktionserfüllung{" "}
              {sortColumn === "funktionserfuellung" && sortDirection === "asc"
                ? "▲"
                : "▼"}
            </th>
            <th onClick={() => handleSort("zwischensumme1")}>
              Zwischensumme{" "}
              {sortColumn === "zwischensumme1" && sortDirection === "asc"
                ? "▲"
                : "▼"}
            </th>
            <th onClick={() => handleSort("zwischensummeKoch")}>
              Zwischensumme nach Koch{" "}
              {sortColumn === "zwischensummeKoch" && sortDirection === "asc"
                ? "▲"
                : "▼"}
            </th>
            <th onClick={() => handleSort("zeitwert")}>
              Zeitwert{" "}
              {sortColumn === "zeitwert" && sortDirection === "asc" ? "▲" : "▼"}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedPflanzen.map((plant, index) => (
            <tr key={index}>
              <td>{plant.pflanzenart}</td>
              <td>{plant.anschaffungskosten}</td>
              <td>{plant.hoehe}</td>
              <td>{plant.pflegekostenProJahr}</td>
              <td>{plant.pflegejahre}</td>
              <td>{plant.alter}</td>
              <td>{plant.engstand}</td>
              <td>{plant.schaeden}</td>
              <td>{plant.pflegemaengel}</td>
              <td>{plant.anschaffungshoehe}</td>
              <td>{plant.pflanzung}</td>
              <td>{plant.risiko}</td>
              <td>{plant.lebenserwartung}</td>
              <td>{plant.funktionserfuellung}</td>
              <td>{plant.zwischensumme1}</td>
              <td>{plant.zwischensummeKoch}</td>
              <td>{plant.zeitwert}</td>
              <td>
                <button
                  onClick={() => confirmDelete(plant._id)}
                  aria-label="Delete plant"
                  className="delete-button"
                >
                  <RiDeleteBin2Line />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
