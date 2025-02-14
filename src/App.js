import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

function RecommendationApp() {
  const [memberId, setMemberId] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async () => {
    if (!memberId) {
      setError("Please enter a Member ID.");
      return;
    }
    setLoading(true);
    try {
      const response = await API.get(`/recommend/${memberId}`);
      setData(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch recommendations. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="container py-5">
      <h2 className="text-center text-primary mb-4">
        AI Matchmaking Recommendations
      </h2>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <label className="form-label">Member ID</label>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter Member ID"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
            />
            <button
              className="btn btn-primary w-100"
              onClick={fetchRecommendations}
              disabled={loading}
            >
              {loading ? "Loading..." : "Get Recommendations"}
            </button>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
          </div>
        </div>
      </div>

      {data && (
        <>
          <div className="card mt-4 p-4 shadow-sm">
            <h4 className="text-primary">User Details</h4>
            <p>
              <strong>Member ID:</strong> {data.user_details.Member_ID}
            </p>
            <p>
              <strong>Gender:</strong> {data.user_details.Gender}
            </p>
            <p>
              <strong>Age:</strong> {data.user_details.Age}
            </p>
            <p>
              <strong>Marital Status:</strong>{" "}
              {data.user_details.Marital_Status}
            </p>
            <p>
              <strong>Sect:</strong> {data.user_details.Sect}
            </p>
            <p>
              <strong>Caste:</strong> {data.user_details.Caste}
            </p>
            <p>
              <strong>State:</strong> {data.user_details.State}
            </p>
          </div>

          <div className="row mt-4">
            {/* Age Distribution */}
            <div className="col-md-4">
              <div className="card p-4 shadow-sm">
                <h5 className="text-primary">Age Distribution</h5>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={Object.entries(data.statistics.age_distribution).map(
                      ([key, value]) => ({ age: key, count: value })
                    )}
                  >
                    <XAxis dataKey="age" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#6366F1" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Sect Distribution */}
            <div className="col-md-4">
              <div className="card p-4 shadow-sm">
                <h5 className="text-primary">Sect Distribution</h5>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={Object.entries(data.statistics.sect_distribution).map(
                      ([key, value]) => ({ sect: key, count: value })
                    )}
                  >
                    <XAxis dataKey="sect" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* State Distribution */}
            <div className="col-md-4">
              <div className="card p-4 shadow-sm">
                <h5 className="text-primary">State Distribution</h5>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={Object.entries(
                      data.statistics.state_distribution
                    ).map(([key, value]) => ({ state: key, count: value }))}
                  >
                    <XAxis dataKey="state" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#A78BFA" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default RecommendationApp;
