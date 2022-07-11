import React from "react";
import { Space, Input, Menu } from "antd";
//make sure not to destructure i.e. {Link} like in react it will give weird error
import Link from "next/link";
const { Search } = Input;
import {
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

const { Item } = Menu; // destructuring so that we can use Item instead of Menu.Item

const TopNav = () => {
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
        borderSpacing:"black",
        borderBottom: "2px solid #efefef",
      }}
    >
      <Item icon={<AppstoreOutlined />} key="home">
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

      <Item icon={<LoginOutlined />} key="login">
        <Link href="/login">
          <a>Login</a>
        </Link>
      </Item>
      <Item icon={<UserAddOutlined />} key="register">
        <Link href="/register">
          <a>Register</a>
        </Link>
      </Item>
    </Menu>
  );
};

export default TopNav;
