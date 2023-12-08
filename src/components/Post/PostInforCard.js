import Card from "react-bootstrap/Card";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
const PostCard = ({ postId, userFullname, content }) => {
  return (
    <div>
      <Card.Text style={{ marginLeft: "20px" }}>{content}</Card.Text>
      <div>
        <FontAwesomeIcon icon={faHeart} />
        <span style={{ fontSize: "13px" }}>17 Likes</span>
        <FontAwesomeIcon style={{ marginLeft: "10px" }} icon={faComment} />
      </div>
      <Card.Title style={{ fontSize: "16px" }}>
        <img
          src="https://genk.mediacdn.vn/2018/10/19/photo-1-15399266837281100315834-15399271585711710441111.png"
          alt="Avatar"
          style={{
            maxWidth: "50px",
            maxHeight: "50px",
            borderRadius: "50%",
          }}
        />
        {userFullname}
      </Card.Title>
    </div>
  );
};

export default PostCard;
