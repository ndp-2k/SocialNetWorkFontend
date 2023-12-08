import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import ImgDetails from "../../container/ImgDetails";

const PostImgCart = ({ postId, type }) => {
  const [img, setImg] = useState(null);

  useEffect(() => {
    const fetchImgData = async () => {
      try {
        const data = await ImgDetails({ postId, type: type });
        setImg(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchImgData();
  }, []);

  let result;
  if (img) {
    result = (
      <Card.Img
        variant="top"
        src={"http://localhost:3000/images/" + img.imgName}
      />
    );
  }

  return result;
};

export default PostImgCart;
