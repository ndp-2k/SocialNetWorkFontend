import React, { useState, useEffect } from "react";
import { Nav, Image } from "react-bootstrap";
import Logout from "./Logout";
import User from "../container/UserDetails";
import ImgDetails from "../container/ImgDetails";

function Header() {
  const [userDetails, setUserDetails] = useState(null);
  const [img, setImg] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await User();
        setUserDetails(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchImgData = async () => {
      try {
        const data = await ImgDetails({ postId: userDetails.id, type: "avt" });
        setImg(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchImgData();
  }, []);

  let imgUrlAvt;
  if (img) {
    imgUrlAvt = "http://localhost:3000/images/" + img.imgName;
  } else {
    imgUrlAvt =
      "https://inkythuatso.com/uploads/thumbnails/800/2022/03/anh-dai-dien-facebook-dep-cho-nam-32-28-16-27-04.jpg";
  }

  return (
    <Nav className="d-flex justify-content-between">
      <Nav.Item>
        <Nav.Link href="/home">Social Network</Nav.Link>
      </Nav.Item>

      <Nav.Item className="d-flex justify-content-between">
        <Nav.Item>
          <Nav.Link href="/info">
            {userDetails && <p>{userDetails.fullName}</p>}
          </Nav.Link>
        </Nav.Item>
        <Image
          src={imgUrlAvt}
          alt="User Avatar"
          roundedCircle
          style={{ width: "40px", height: "40px" }}
        />
        <Logout></Logout>
      </Nav.Item>
    </Nav>
  );
}

export default Header;
