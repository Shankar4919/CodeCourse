import React, { useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents page from refreshing on submit
    try{
      const { data } = await axios.post(`http://localhost:8000/api/register`,
      { name, email, password });
    // console.log("Register Data", data);
    toast.success("Register Successful. Please Login");
    } catch (err){
      toast.error(err.response.data);
    }
  };

  return (
    <>

      <div className="container col-md-4 offset-md-4 p-4">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            className="form-control mb-2 p-2"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            name="email"
            className="form-control mb-2 p-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            className="form-control mb-2 p-2"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="d-grid gap-2">
            <button className="btn btn-block btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
