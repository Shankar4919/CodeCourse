import React, { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // prevents page from refreshing on submit
    console.log([ name, email, password ]);
  };

  return (
    <>
      <h1 className="jumbotron text-center bg-primary">Register</h1>
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
