import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import axios from "axios";

// Create a reusable Axios instance
const API = axios.create({
  baseURL: "http://127.0.0.1:8000", // Change if hosted elsewhere
  headers: {
    "Content-Type": "application/json",
  },
});

function RecommendationApp() {
  const [memberId, setMemberId] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchRecommendations = async () => {
    if (!memberId) {
      setError("Please enter a Member ID.");
      return;
    }

    try {
      const response = await API.get(`/recommend/${memberId}`);
      setData(response.data);
      console.log(response.data);
      
      setError(""); // Clear previous errors
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setError("Failed to fetch recommendations. Please try again.");
    }
  };

  return (
    <div>
      <h1>AI Matchmaking Recommendations</h1>
      <input
        type="text"
        value={memberId}
        onChange={(e) => setMemberId(e.target.value)}
        placeholder="Enter Member ID"
      />
      <button onClick={fetchRecommendations}>Get Recommendations</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && (
        <>
          <h2>Age Distribution</h2>
          <BarChart
            width={400}
            height={300}
            data={Object.entries(data.statistics.age_distribution).map(
              ([key, value]) => ({ age: key, count: value })
            )}
          >
            <XAxis dataKey="age" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>

          <h2>Sect Distribution</h2>
          <BarChart
            width={400}
            height={300}
            data={Object.entries(data.statistics.sect_distribution).map(
              ([key, value]) => ({ sect: key, count: value })
            )}
          >
            <XAxis dataKey="sect" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>

          <h2>State Distribution</h2>
          <BarChart
            width={400}
            height={300}
            data={Object.entries(data.statistics.state_distribution).map(
              ([key, value]) => ({ state: key, count: value })
            )}
          >
            <XAxis dataKey="state" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#ffc658" />
          </BarChart>
        </>
      )}
    </div>
  );
}

export default RecommendationApp;
