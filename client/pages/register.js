import React, { useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { Typography, Divider, Link } from "antd";

const { Title } = Typography;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents page from refreshing on submit
    try {
      const { data } = await axios.post(`http://localhost:8000/api/register`, {
        name,
        email,
        password,
      });
      // console.log("Register Data", data);
      toast.success("Register Successful. Please Login");
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  return (
    <>
      <div className="container col-md-4 offset-md-4 p-4 mt-4">
        <Title level={5}>Sign up and Starting Learning</Title>
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
            
              border: "1px solid black",
            }}
            required
          />
          <div className="d-grid gap-2 mt-2">
            <button
              className="btn btn-block btn-primary"
              style={{
                height: "4rem",
               
                border: "1px solid black",
              }}
            >
              Submit
            </button>
          </div>
          <Typography.Paragraph className="mt-2" style={{
            textAlign: "center",
          }}>
            By signing up, you agree to our Terms of Use and Privacy Policy
          </Typography.Paragraph>
          <Divider />
          <Typography.Paragraph style={{
            textAlign: "center",
          }}>
            Already have an account?<a href="/" style={{color:"red"}}> Login</a>
          </Typography.Paragraph>
        </form>
      </div>
    </>
  );
};

export default Register;
