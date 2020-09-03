import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../../img/football.jpg";
import "./AuthForm.css";

const Login = () => (
  <div className="auth-card">
    <img className="auth-logo" src={logoImg} alt="Logo" />
    <div className="auth-form">
      <input className="auth-input" type="email" placeholder="email" />
      <input className="auth-input" type="password" placeholder="password" />
      <button className="auth-button">Sign In</button>
    </div>
    <Link to="/signup">Don't have an account?</Link>
  </div>
);

export default Login;
