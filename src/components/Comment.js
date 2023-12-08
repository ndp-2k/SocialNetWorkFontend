import React from "react";
import { Card, Image } from "react-bootstrap";

const Comment = ({ avatarSrc, username, comment }) => {
  return (
    <Card className="mb-3">
      <Card.Body style={{ padding: "8px" }}>
        <div className="d-flex align-items-center">
          <Image
            src={avatarSrc}
            alt="User Avatar"
            roundedCircle
            style={{ width: "40px", height: "40px", marginRight: "15px" }}
          />
          <div>
            <p style={{ margin: "0px" }}>
              <b>{username}</b>
            </p>
            <p style={{ margin: "0px" }}>{comment}</p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Comment;
