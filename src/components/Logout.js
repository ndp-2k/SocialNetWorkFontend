import { useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";

const Logout = () => {
  const navigate = useNavigate();
  const toLogin = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Nav.Item>
      <Nav.Link onClick={toLogin}>
        <i>Logout</i>
      </Nav.Link>
    </Nav.Item>
  );
};

export default Logout;
