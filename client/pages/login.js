import React from "react";
import { Divider, Typography, Button, Card, Tooltip } from "antd";
import { GoogleOutlined, GoogleCircleFilled } from "@ant-design/icons";
import Link from "next/link";

const { Title } = Typography;


const Login = () => {
  return (
    <>
      <div className="container col-md-4 offset-md-4 mt-4">
        <Card
          style={{
            backgroundColor: "white",
            border: "none",
          }}
        >
          <Title level={4}>Login to your Account</Title>
          <Divider style={{ border: "0.5px solid #edf0f1" }} />
          <div style={{ align: "center" }}>
            {/* <Tooltip title="search">
              <Button shape="circle" icon={<GoogleOutlined />} size="large" style={{
                height: "3rem",
                width: "3rem",
                fontSize: "1.5rem",
                fontWeight: "bold",
                border: "1px solid black",
              }}/>
            </Tooltip> */}
            <Button
              icon={<GoogleCircleFilled style={{color:"#ce4c2f", fontSize:"1.7rem"}}/>}
              size="large"
              type="text"
              
              style={{
                height: "4rem",
                fontWeight: "bold",
                
                alignItems:"center",
                display:"inline-flex"
              }}
            >Continue with Google</Button>
          </div>

          <Divider>Sign In with Account</Divider>
          
          {/* start form */}
          <form>
            <input
              type="email"
              name="email"
              className="form-control mb-2 p-2 mt-3"
              placeholder="Email"
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
              className="form-control mb-2 p-2 mt-3"
              placeholder="Password"
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
                {/* {loading ? <SyncOutlined spin /> : "Sign Up"} */} Sign In
              </button>
            </div>
          </form>
          {/* end form */}
          
          <Title
            level={5}
            style={{
              textAlign: "center",
            }}
          >
            Don't have an account?
            <Link href="/register">
              <a style={{ color: "red" }}>
                {" "}
                Sign Up
              </a>
            </Link>
          </Title>
        </Card>

        {/* <button>Continue with Google</button> */}
        <form></form>
      </div>
    </>
  );
};

export default Login;
