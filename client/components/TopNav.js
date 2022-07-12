import React, { useState, useEffect, useContext } from "react";
import { Space, Input, Menu } from "antd";
//make sure not to destructure i.e. {Link} like in react it will give weird error
import Link from "next/link";
import { Context } from "../context";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import {
  AppstoreOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

const { Search } = Input;

const { Item } = Menu; // destructuring so that we can use Item instead of Menu.Item

const TopNav = () => {
  const router = useRouter();
  const [current, setCurrent] = useState("");
  

  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname); // if we are in the browser then set the current pathname as the current
    // console.log( window.location.pathname );
  }, [process.browser && window.location.pathname]);

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    const { data } = await axios.post("/api/logout");
    toast.success(data.message);
    router.push("/login");
  };

  const onSearch = (value) => console.log(value);
  return (
    <Menu
      mode="horizontal"
      style={{
        backgroundColor: "#fafafa",
        fontSize: "1.2rem",
        paddingTop: "0.7rem",
        paddingBottom: "0.4rem",
        fontWeight: "bold",
        borderSpacing: "black",
        borderBottom: "2px solid #efefef",
      }}
      selectedKeys={[current]}
    >
      <Item
        icon={<AppstoreOutlined />}
        key="/"
        onClick={(e) => setCurrent(e.key)}
        style={{
          alignItems: "center",
          display: "inline-flex",
        }}
      >
        <Link href="/">
          <a>Home</a>
        </Link>
      </Item>

      <Search
        placeholder="Search"
        allowClear
        onSearch={onSearch}
        size="large"
        bg="red"
        backgroundColor="#red"
        style={{ width: 400, padding: "0.4rem" }}
      />

      <Item
        icon={<LoginOutlined />}
        key="/login"
        onClick={(e) => setCurrent(e.key)}
        style={{
          alignItems: "center",
          display: "inline-flex",
        }}
      >
        <Link href="/login">
          <a>Login</a>
        </Link>
      </Item>

      <Item
        icon={<UserAddOutlined />}
        key="/register"
        onClick={(e) => setCurrent(e.key)}
        style={{
          alignItems: "center",
          display: "inline-flex",
        }}
      >
        <Link href="/register">
          <a>Register</a>
        </Link>
      </Item>

      <Item
        icon={<LogoutOutlined />}
        onClick={logout}
        style={{
          alignItems: "center",
          display: "inline-flex",
          float: "end",
        }}
      >
        Logout
      </Item>

    </Menu>
  );
};

export default TopNav;
