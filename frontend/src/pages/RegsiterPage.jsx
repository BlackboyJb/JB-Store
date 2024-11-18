import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../component/formCont";
import Loader from "../helpers/loader";
import { useRegisterMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice.js";
import { checkPasswordValidityManual } from "../utils/PasswordValidity.jsx";
import { validateEmailAddress } from "../utils/EmailValidity.jsx";
import { toast } from "react-toastify";

const RegsiterPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(""); // State to hold the email error message
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordValidity, setPasswordValidity] = useState({
    upperCase: false,
    lowerCase: false,
    number: false,
    specialCharacter: false,
    length: false,
  });
  const [showRequirements, setShowRequirements] = useState(false); // State to control visibility of requirements

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const validatePassword = () => {
    const missingRequirements = [];

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }

    // Check other password validity conditions
    if (!passwordValidity.upperCase) {
      missingRequirements.push(
        "Password must contain at least one uppercase letter."
      );
    }
    if (!passwordValidity.lowerCase) {
      missingRequirements.push(
        "Password must contain at least one lowercase letter."
      );
    }
    if (!passwordValidity.number) {
      missingRequirements.push("Password must contain at least one number.");
    }
    if (!passwordValidity.specialCharacter) {
      missingRequirements.push(
        "Password must contain at least one special character."
      );
    }
    if (!passwordValidity.length) {
      missingRequirements.push("Password must be at least 8 characters long.");
    }

    // If there are any missing requirements, show the toast only if it's not already visible in the form
    if (missingRequirements.length > 0) {
      if (!showRequirements) {
        toast.error(missingRequirements.join(" "));
      }
      return false;
    }

    return true;
  };

  const submitInfo = async (e) => {
    e.preventDefault();

    // Run validation before submitting
    if (!validatePassword()) {
      return; // If validation fails, stop submission
    }

    try {
      const res = await register({ fullName, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message) || error.error;
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordValidity(checkPasswordValidityManual(newPassword));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const toggleRequirementsVisibility = () => {
    setShowRequirements((prev) => !prev); // Toggle the visibility
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Validate email address and set error message if invalid
    if (!validateEmailAddress(newEmail)) {
      setEmailError("Invalid email address.");
    } else {
      setEmailError("");
    }
  };

  return (
    <FormContainer>
      <h1>Register</h1>

      <Form onSubmit={submitInfo}>
        <Form.Group controlId="fullName" className="my-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter your Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={handleEmailChange} // Use the handleEmailChange
          ></Form.Control>
          {emailError && <div style={{ color: "red" }}>{emailError}</div>}{" "}
          {/* Display email error message */}
        </Form.Group>

        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={handlePasswordChange}
          ></Form.Control>

          <Button
            variant="primary"
            className="mt-2"
            onClick={toggleRequirementsVisibility}
          >
            {showRequirements ? "Hide" : "Show"} Password Requirements
          </Button>

          {showRequirements && (
            <ul>
              <li
                style={{ color: passwordValidity.upperCase ? "green" : "red" }}
              >
                At least one uppercase letter
              </li>
              <li
                style={{ color: passwordValidity.lowerCase ? "green" : "red" }}
              >
                At least one lowercase letter
              </li>
              <li style={{ color: passwordValidity.number ? "green" : "red" }}>
                At least one number
              </li>
              <li
                style={{
                  color: passwordValidity.specialCharacter ? "green" : "red",
                }}
              >
                At least one special character
              </li>
              <li style={{ color: passwordValidity.length ? "green" : "red" }}>
                At least 8 characters long
              </li>
            </ul>
          )}
        </Form.Group>

        <Form.Group controlId="Confirm Password" className="my-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          ></Form.Control>
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          isLoading={isLoading} // Show loader while loading
        >
          Sign Up
        </Button>
        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>
          Already have an account?
          <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegsiterPage;
