import React, { useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { Typography, Divider, Card } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";

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
      const { data } = await axios.post(`/api/register`, {
        name,
        email,
        password,
      });
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
        {/* <Card style={{
          backgroundColor: "white",
          border:"none",
        }}> */}
        <Title level={5}>Sign up and Starting Learning</Title>

        {/* start input form */}
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
            style={{
              textAlign: "center",
              marginTop: "2rem",
            }}
          >
            By signing up, you agree to our Terms of Use and Privacy Policy
          </Typography.Paragraph>
          <Divider style={{ border: "0.5px solid #edf0f1", marginTop:"0.5rem" }} />
          <Title
            level={5}
            style={{
              textAlign: "center",
              marginTop: "-1rem",
            }}
          >
            Already have an account?
            <Link href="/login">
              <a style={{ color: "#ce4c2f" }}>
                {" "}
                Login
              </a>
            </Link>
          </Title>
        </form>
        {/* end input form */}
        
        {/* </Card> */}
      </div>
    </>
  );
};

export default Register;
