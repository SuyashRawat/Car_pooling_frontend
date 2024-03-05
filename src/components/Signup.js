/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";

function SignUp(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      setVisibleOtp(true);
      props.showAlert("Check Email to verify the opt", "primary");
      const response = await fetch("http://localhost:3000/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // console.log("Registration successful:", data);
        props.showAlert("Registration successfull , Enter Credentials to Login ", "success");
        navigate("/login");
      } else {
        setVisibleOtp(false);
        const errorData = await response.json();
        // console.error("Registration failed:", errorData);
        props.showAlert("Registration failed. Please try again.", "danger");
        // alert("Registration failed. Please try again.");
      }
    } catch (error) {
      // console.error("Error during registration:", error);
      props.showAlert("Registration failed. Please try again.", "danger");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }),
      });
      const data = await response.json();
      if (response.ok) {
        // console.log("OTP validated successfully");
        props.showAlert("OTP validated successfully", "success");
        // Proceed with user creation or other actions
        navigate("/login");
      } else {
        // console.error("OTP validation failed:", data.msg);
        props.showAlert("OTP validation failed", "danger");
      }
    } catch (error) {
      // console.error("Error validating OTP:", error);
      props.showAlert("Internal Server Error occured during OTP verification", "danger");
    }
  };

  return (
    <div className="main">
      <MDBContainer fluid>
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className="bg-dark text-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "400px" }}
            >
              <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className="text-white-50 mb-5">
                  Please enter your login and password!
                </p>
                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-white"
                  label="Email address"
                  id="formControlLg"
                  type="email"
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-white"
                  label="Password"
                  id="formControlLg"
                  type={showPassword ? "text" : "password"}
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="white">
                  <button className="btn btn-primary" onClick={handleLogin}>
                    <strong>Login</strong>
                  </button>
                </div>
                <br />
                <div>
                  <p className="mb-0">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-white-50 fw-bold">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Signup;