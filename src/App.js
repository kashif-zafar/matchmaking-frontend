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
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: { "Content-Type": "application/json" },
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
    <div
      style={{ backgroundColor: "#121212", minHeight: "100vh", width: "100vw" }}
    >
      <Container fluid className="py-5 px-0 mx-0 text-light">
        <h1 className="text-center mb-4 text-primary">
          AI Matchmaking Recommendations
        </h1>

        {/* Input Section */}
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="p-4 bg-dark text-light border border-primary">
              <Form.Group className="mb-3">
                <Form.Label>Member ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Member ID"
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="primary"
                className="w-100"
                onClick={fetchRecommendations}
                disabled={loading}
              >
                {loading ? "Loading..." : "Get Recommendations"}
              </Button>
              {error && (
                <Alert variant="danger" className="mt-3">
                  {error}
                </Alert>
              )}
            </Card>
          </Col>
        </Row>

        {/* User Details */}
        {data && (
          <>
            <Card
              className="p-4 mt-4"
              style={{
                backgroundColor: "#2C2F33",
                color: "#E0E0E0",
                border: "1px solid #FFD700",
              }}
            >
              <h3 style={{ color: "#FFD700" }}>User Details</h3>
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
            </Card>

            {/* Charts Section */}
            <Row className="mt-4">
              {/* Row 1: Age & Caste Distribution */}
              <Col md={6} className="mb-4">
                <Card className="p-3 bg-dark text-light border border-primary">
                  <h4 className="text-primary">Age Distribution</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                      data={Object.entries(
                        data.statistics.age_distribution
                      ).map(([key, value]) => ({ age: key, count: value }))}
                    >
                      <XAxis dataKey="age" stroke="#ffffff" />
                      <YAxis stroke="#ffffff" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          color: "#000000",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                        }}
                      />
                      <Bar dataKey="count" fill="#6366F1" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </Col>

              <Col md={6} className="mb-4">
                <Card className="p-3 bg-dark text-light border border-info">
                  <h4 className="text-info">Caste Distribution</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                      data={Object.entries(
                        data.statistics.caste_distribution
                      ).map(([key, value]) => ({ caste: key, count: value }))}
                    >
                      <XAxis dataKey="caste" stroke="#ffffff" />
                      <YAxis stroke="#ffffff" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          color: "#000000",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                        }}
                      />
                      <Bar dataKey="count" fill="#22D3EE" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </Col>

              {/* Row 2: State & Sect Distribution (both 50%) */}
              <Col md={6} className="mb-4">
                <Card className="p-3 bg-dark text-light border border-warning">
                  <h4 className="text-warning">State Distribution</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                      data={Object.entries(
                        data.statistics.state_distribution
                      ).map(([key, value]) => ({ state: key, count: value }))}
                    >
                      <XAxis dataKey="state" stroke="#ffffff" />
                      <YAxis stroke="#ffffff" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          color: "#000000",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                        }}
                      />
                      <Bar dataKey="count" fill="#A78BFA" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </Col>

              <Col md={6} className="mb-4">
                <Card className="p-3 bg-dark text-light border border-success">
                  <h4 className="text-success">Sect Distribution</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                      data={Object.entries(
                        data.statistics.sect_distribution
                      ).map(([key, value]) => ({ sect: key, count: value }))}
                    >
                      <XAxis dataKey="sect" stroke="#ffffff" />
                      <YAxis stroke="#ffffff" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          color: "#000000",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                        }}
                      />
                      <Bar dataKey="count" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
}

export default RecommendationApp;
