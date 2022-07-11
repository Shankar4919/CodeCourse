import React, { useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { Typography, Divider, Link } from "antd";
import { SyncOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // console.log(process.env.NEXT_PUBLIC_API);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents page from refreshing on submit
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/register`,
        {
          name,
          email,
          password,
        }
      );
      // console.log("Register Data", data);
      toast.success("Register Successful. Please Login");
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container col-md-4 offset-md-4 p-4 mt-4">
        <Title level={4}>Sign up and Starting Learning</Title>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            className="form-control mb-2 p-2 mt-3"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              height: "4rem",
              fontSize: "1.2rem",
              border: "1px solid black",
            }}
            required
          />
          <input
            type="email"
            name="email"
            className="form-control mb-2 p-2 mt-2"
            placeholder="Email"
            value={email}
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
            className="form-control mb-2 p-2 mt-2"
            placeholder="password"
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
              {loading ? <SyncOutlined spin /> : "Sign Up"}
            </button>
          </div>
          <Typography.Paragraph
            className="mt-2"
            style={{
              textAlign: "center",
            }}
          >
            By signing up, you agree to our Terms of Use and Privacy Policy
          </Typography.Paragraph>
          <Divider style={{ border: "0.5px solid #edf0f1" }} />
          <Title
            level={5}
            style={{
              textAlign: "center",
            }}
          >
            Already have an account?
            <a href="/" style={{ color: "red" }}>
              {" "}
              Login
            </a>
          </Title>
        </form>
      </div>
    </>
  );
};

export default Register;
