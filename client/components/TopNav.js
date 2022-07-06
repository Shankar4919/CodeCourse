
import React from 'react';
import { Menu } from 'antd';
//make sure not to destructure i.e. {Link} like in react it will give weird error
import Link from 'next/link'; 
import {AppstoreOutlined, LoginOutlined, UserAddOutlined} from "@ant-design/icons";

const { Item } = Menu; // destructuring so that we can use Item instead of Menu.Item


const TopNav = () => {
  return (
    <Menu mode="horizontal" style={{
        backgroundColor: '#fafafa',
        fontSize: '1.2rem',
        padding: '0.4rem',
        fontWeight: 'bold',
    }}>
        <Item icon={<AppstoreOutlined/>} key="home">
            <Link href="/">
                <a>Home</a>
            </Link>
        </Item>
        <Item icon={< LoginOutlined />} key="login">
            <Link href="/login">
                <a>Login</a>
            </Link>
        </Item>
        <Item  icon={< UserAddOutlined />} key="register">
            <Link href="/register">
                <a>Register</a>
            </Link>
        </Item>
    </Menu>
  )
}

export default TopNav;