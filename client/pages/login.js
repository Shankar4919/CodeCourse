import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Divider, Typography, Button, Card, Tooltip } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";


const { Title } = Typography;


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents page from refreshing on submit
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/login`, {
        email,
        password,
      });
      console.log("login Data", data);
      // toast.success("Login Successful");
      // setLoading(false);
    } catch (err) {
      // toast.error(err.response.data);
      setLoading(false);
    }
  };
  return (
    <>
      <div className="container col-md-4 offset-md-4 p-4 mt-4">
        <Card
          style={{
            backgroundColor: "white",
            border: "none",
          }}
        >
          <Title level={5}>Login to your Account</Title>
          
          {/* start form */}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              value={email}
              className="form-control mb-2 p-2 mt-3"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              style={{
                height: "4rem",
                fontSize: "1.2rem",
                border: "1px solid black",
              }}
              required
            />

            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                height: "4rem",
                fontSize: "1.2rem",
                border: "1px solid black",
              }}
              required
            />

            <div className="d-grid gap-2 mt-2">
              <button
                className="btn btn-block btn-primary"
                type="sign up"
                style={{
                  height: "4rem",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  border: "1px solid black",
                }}
              >
                {loading ? <SyncOutlined spin /> : "Sign In"}
              </button>
            </div>
          </form>
          {/* end form */}

          {/* start forgot password */}
          <Title
            level={5}
            style={{
              textAlign: "center",
              marginTop: "2em",
            }}
          >
            <Link href="/register">
              <a style={{ color: "#ce4c2f" }}>
                Forgot Password?
              </a>
            </Link>
          </Title>
          {/* end forgot password */}

          <Divider style={{ border: "0.5px solid #edf0f1", marginTop:"0.5rem" }} />

          {/* start signup link */}
          <Title
            level={5}
            style={{
              textAlign: "center",
              marginTop: "-1rem",
            }}
          >
            Don't have an account?
            <Link href="/register">
              <a style={{ color: "#ce4c2f"}}>
                {" "}
                Sign Up
              </a>
            </Link>
          </Title>
          {/*  end sign up link */}

        </Card>

      </div>
    </>
  );
};

export default Login;
