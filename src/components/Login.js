import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ValidateToken from "../common/ValidateToken";

function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    const isValidToken = ValidateToken();
    if (isValidToken) {
      navigate("/"); // Chuyển hướng nếu token hợp lệ
    }
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowPasswordInput] = useState(true);
  const handleGetOTP = async (event) => {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/otp/send-otp",
        requestOptions
      );

      const data = await response.json();
      if (response.ok) {
        setOtp(data.otp);
        setShowPasswordInput(false);
      } else {
        console.error(response.status, data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    if (otp != null) {
      const requestGetToken = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, otp }),
      };
      try {
        const responseGetToken = await fetch(
          "http://localhost:3000/auth/generateToken",
          requestGetToken
        );

        const data = await responseGetToken.json();
        if (responseGetToken.ok) {
          localStorage.setItem("token", data.token);
          navigate("/");
        } else {
          console.error(responseGetToken.status, data.error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="container py-5 h-100">
      <div className="row d-flex align-items-center justify-content-center h-100">
        <div className="col-md-8 col-lg-7 col-xl-6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="img-fluid"
            alt="Login illustration"
          />
        </div>
        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
          <form>
            <div className="mb-4">
              <input
                type="text"
                id="username"
                className="form-control form-control-lg"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label className="form-label" htmlFor="form1Example13">
                Username
              </label>
            </div>

            <div className="mb-4">
              <input
                type={"password"}
                id="password"
                className="form-control form-control-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="form-label" htmlFor="form1Example23">
                Password
              </label>
            </div>
            {showOtpInput ? (
              <div></div>
            ) : (
              <div className="mb-4">
                <input
                  type="text"
                  id="otp"
                  className="form-control form-control-lg"
                  value={otp}
                  readOnly={true}
                />
                <label className="form-label" htmlFor="form1ExampleOTP">
                  OTP
                </label>
              </div>
            )}
            <div className="d-flex justify-content-around align-items-center mb-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="form1Example3"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="form1Example3">
                  Remember me
                </label>
              </div>
              <a href="#!">Forgot password?</a>
            </div>

            <div className="d-flex flex-column align-items-center my-">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                onClick={showOtpInput ? handleGetOTP : handleSignIn}
              >
                {showOtpInput ? "Get OTP" : "Sign In"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
