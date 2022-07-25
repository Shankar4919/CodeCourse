import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Col, Row } from "react-bootstrap";
import "./Admin.css";
import icon from "../../images/icon.png";
import authImage from "../../images/auth-image.png";

export default function Admin() {
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      // fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/verifyToken`, {
      fetch(`/api/admin/verifyToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminToken: localStorage.getItem("adminToken"),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.admin) {
            navigate("/admin_home");
          } else {
            localStorage.removeItem("adminToken");
          }
        });
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      // fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/login`, {
      fetch(`/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setError(true);
            setErrorMessage(data.error);
            setEmail("");
            setPassword("");
            setTimeout(() => {
              setError(false);
            }, 3000);
          } else {
            localStorage.setItem("adminToken", data.adminToken);
            navigate("/admin_home");
          }
        });
    }
    setValidated(true);
  };

  return (
    <div className="login-container" style={{ backgroundColor: "#fff" }}>
      <Container>
        <Row>
          <Col>
            <div className="auth-image">
              <img className="left-logo" src={authImage} alt="left-logo" />
            </div>
          </Col>

          <Col>
            <div className="card-top">
              <div className="card-icon">
                <img src={icon} alt="icon" />
              </div>
              <Button className="register-button"></Button>
              <Button className="login-button">SIGNIN</Button>
            </div>
            <Card
              className="login-card"
              style={{ width: "30rem", backgroundColor: "#ecfdec" }}
            >
              <Card.Title>Login Into Admin Account</Card.Title>
              <Card.Body>
                <Form
                  className="login-form"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                >
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter valid email.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter Password.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button className="submit-button" type="submit">
                    SIGN IN
                  </Button>
                  <div className="error-message">
                    {error ? errorMessage : ""}
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
