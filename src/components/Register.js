import React, { useState } from "react";
import "./Register.css";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/auth/auth-action";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    contactInfo: "",
    address: {
      state: "",
      city: "",
      zip: "",
      street: "",
      country: "",
    },
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (Object.keys(form.address).includes(name)) {
      setForm({
        ...form,
        address: {
          ...form.address,
          [name]: value,
        },
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userDetails = {
      email: form.email,
      contactInfo: form.contactInfo,
      address: form.address,
    };
    dispatch(registerUser(userDetails, navigate));
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h1>Register User</h1>
      <input
        type="email"
        name="email"
        onChange={handleChange}
        placeholder="Email"
        className="register-input"
      />
      <input
        type="text"
        name="contactInfo"
        onChange={handleChange}
        placeholder="Contact Info"
        className="register-input"
      />
      <input
        type="text"
        name="state"
        onChange={handleChange}
        placeholder="State"
        className="register-input"
      />
      <input
        type="text"
        name="city"
        onChange={handleChange}
        placeholder="City"
        className="register-input"
      />
      <input
        type="text"
        name="zip"
        onChange={handleChange}
        placeholder="Zip"
        className="register-input"
      />
      <input
        type="text"
        name="street"
        onChange={handleChange}
        placeholder="Street"
        className="register-input"
      />
      <input
        type="text"
        name="country"
        onChange={handleChange}
        placeholder="Country"
        className="register-input"
      />
      <button type="submit" className="register-button">
        Register
      </button>
      <p>
        Already have an account? <Link to="/register">Login</Link>
      </p>
    </form>
  );
}

export default Register;
