import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";
import "./EditCourse.css";

export default function EditCourse() {
  const navigate = useNavigate();

  const { courseId } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [urls, setUrls] = useState([{ url: "", title: "" }]);
  const [image, setImage] = useState("");
  const [imageData, setImageData] = useState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setName("");
    setDescription("");
    setLevel("Beginner");
    setUrls([{ url: "", title: "" }]);
    setImage("");
    setImageData();
    setError(false);
    setErrorMessage("");
    if (!localStorage.getItem("adminToken")) {
      navigate("/admin_login");
    } else {
      fetch(`/api/admin/verifyToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminToken: localStorage.getItem("adminToken"),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.admin) {
            localStorage.removeItem("adminToken");
            navigate("/admin_login");
          }
        });
    }
    fetch(
      `/api/admin/course/${courseId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((cdata) => {
        setName(cdata.course.name);
        setDescription(cdata.course.description);
        setLevel(cdata.course.difficulty);
        setUrls(cdata.course.videos);
        setImageData(cdata.course.image);
      });
  }, [courseId, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", imageData);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("difficulty", level);
    formData.append("videos", JSON.stringify(urls));
    formData.append("courseId", courseId);
    fetch(`/api/admin/courseEdit`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(true);
          setErrorMessage(data.error);
        } else {
          navigate("/admin_home");
        }
      });
  };

  return (
    <div style={{backgroundColor:"#fff"}}>
      <div className="edit-track-div">
        <Card className="add-track-card">
          <Card.Title>Edit Course</Card.Title>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Course Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Course Name"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Course Description</Form.Label>
                <Form.Control
                  as="textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Course Level</Form.Label>
                <Form.Control
                  as="select"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advance">Advanced</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Enter Video URL's</Form.Label>
                {urls.map((ele, ind) => (
                  <div key={ind} className="videos">
                    <Form.Control
                      key={ind}
                      type="text"
                      name="video"
                      className="video-url"
                      value={ele.url}
                      onChange={(e) => {
                        const newUrls = [...urls];
                        newUrls[ind].url = e.target.value;
                        setUrls(newUrls);
                      }}
                      placeholder="Enter Video URL"
                    />
                    <Form.Control
                      key={ind}
                      type="text"
                      name="title"
                      className="video-title"
                      value={ele.title}
                      onChange={(e) => {
                        const newUrls = [...urls];
                        newUrls[ind].title = e.target.value;
                        setUrls(newUrls);
                      }}
                      placeholder="Enter Video Title"
                    />
                    {ind ? (
                      <Button
                        variant="danger"
                        onClick={() => {
                          const newUrls = [...urls];
                          newUrls.splice(ind, 1);
                          setUrls(newUrls);
                        }}
                      >
                        Remove
                      </Button>
                    ) : null}
                  </div>
                ))}
                <Button
                  variant="primary"
                  onClick={() => {
                    const newUrls = [...urls];
                    newUrls.push({ url: "", title: "" });
                    setUrls(newUrls);
                  }}
                >
                  Add More
                </Button>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="image">Course Image</Form.Label>
                <Form.Control
                  type="File"
                  accept="image/*"
                  value={image}
                  onChange={(e) => {
                    setImage(e.target.value);
                    setImageData(e.target.files[0]);
                  }}
                  name="image"
                  placeholder="Upload Course Image"
                />
              </Form.Group>
              <div className="add-track-btn">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
            <img className="edit_image" src={imageData} alt="course" />
            <div className="error-message">{error ? errorMessage : ""}</div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
