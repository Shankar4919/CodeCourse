import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { FaCaretSquareRight } from "react-icons/fa";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/ext-language_tools";
import { MdMemory } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import PreLoader from "../PreLoader/PreLoader";
import UserNavBar from "../UserNavBar/UserNavBar";
import Footer from "../Footer/Footer";
import "./Practice.css";

export default function Practice() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      fetch(`/api/user/verifyToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.user) {
            localStorage.removeItem("token");
            navigate("/");
          } else {
            setName(data.user.name);
          }
        });
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, [navigate]);

     

  return (
    <div style={{backgroundColor:"white"}}>
      {loading ? (
        <PreLoader />
      ) : (
        <div>
          {/* Navbar compnent */}
          <UserNavBar />

          {/* main heading */}
          <div className="practice container">
            <h2>Hello {name}</h2>
            <div className="editor">
              <h3>Practice Below in the Editor</h3>
              <Row xs={2} md={4} lg={6}>
                <Col>
                  <Form.Label>Select Language</Form.Label>
                  <Form.Select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Select Theme</Form.Label>
                  
                    
                </Col>

                <Col>
                  
                    <FaCaretSquareRight /> Run Code
                  </Button>
                </Col>
                
              </Row>
              <Row>
                <Col>
                  
                </Col>
              </Row>
            </div>
          </div>

          {/* footer */}
          <Footer />
        </div>
      )}
    </div>
  );
}
