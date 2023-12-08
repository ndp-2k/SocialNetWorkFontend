import Stack from "react-bootstrap/Stack";
import Post from "./Post/Post";
import ValidateToken from "../common/ValidateToken";
import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeDetails from "../container/HomeDetails";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const navigate = useNavigate();
  const [homeDetails, setHomeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    const isValidToken = ValidateToken();
    if (!isValidToken) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const fetchHomeDetailsData = async () => {
      try {
        const data = await HomeDetails();
        setHomeDetails(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeDetailsData();
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      setFile(selectedFile);
    }
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("content", content);

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/posts/create",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log("Post created successfully");
        window.location.reload();
      } else {
        console.error("Error creating post:", result.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <Form className="w-100 mb-3">
        <InputGroup>
          <Form.Group
            controlId="exampleForm.ControlTextarea1"
            className="w-100"
          >
            <Form.Control
              placeholder="Bạn đang nghĩ gì?"
              as="textarea"
              rows={2}
              value={content}
              onChange={handleContentChange}
            />

            <InputGroup className="d-flex justify-content-between">
              <Form.Control type="file" onChange={handleFileChange} />
              <Button variant="primary" onClick={handleSubmit}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </Button>
            </InputGroup>
          </Form.Group>
        </InputGroup>
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            style={{ maxWidth: "100%", marginTop: "10px" }}
          />
        )}
      </Form>

      <Stack gap={homeDetails?.content?.length || 0}>
        {homeDetails?.content?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </Stack>
    </div>
  );
};

export default Home;
