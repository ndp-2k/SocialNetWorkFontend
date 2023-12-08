import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Form, InputGroup, Button } from "react-bootstrap";
import Comment from "../Comment";
import PostCard from "./PostInforCard";
import User from "../../container/UserDetails";
import React, { useState, useEffect } from "react";
import PostImgCart from "./PostImgCart";

const Post = ({ post }) => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await User(post.userId);
        console.log("user heheh:" + data);
        setUserDetails(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="p-2 d-flex justify-content-center align-items-center">
      <Card style={{ maxWidth: "500px" }}>
        {post.id && <PostImgCart postId={post.id} type={"post"} />}
        <Card.Body>
          <Stack gap={3}>
            {userDetails && (
              <PostCard
                postId={post.id}
                userFullname={userDetails.fullName}
                content={post.content}
              />
            )}
            <div>
              <Comment
                avatarSrc="https://i1.sndcdn.com/artworks-000623435371-0tmohq-t500x500.jpg"
                username="Nguyễn Hữu Đa"
                comment="Phải tôi tôi đấm cho mấy nhát"
              />
            </div>
          </Stack>
          <div>
            <Form style={{ marginTop: "20px" }}>
              <InputGroup className="mb-3">
                <Form.Control type="email" placeholder="Viết bình luận..." />
                <Button variant="primary">
                  <FontAwesomeIcon icon={faPaperPlane} />
                </Button>
              </InputGroup>
            </Form>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Post;
