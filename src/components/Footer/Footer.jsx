import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Logo from "../../Images/BR-logo.png";
import ISOLogo from "../../Images/ISO.png";
const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-section">
       <Link> <img src={Logo} alt="Logo" className="logo" /></Link>
        <div className="address dcr">
          Patna | Ranchi | Dhanbad | Bangalore | Kolkata | Delhi NCR | London
        </div>
        <div className="dcr">Mob.No-+91-9122112704</div>
        <div className="dcr">Email Id:-info@brandradiator.com</div>
      </div>
      <div className="footer-section">
        <h4>Quick Links</h4>
        <ul>
          <li className="dcr">
            <Link to="/">Home</Link>
          </li>
          <li className="dcr">
            <Link to="/about">About Us</Link>
          </li>
          <li className="dcr">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="dcr">
            <Link to="/Admin">Admin</Link>
          </li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Services</h4>
        <ul>
          <li className="dcr">Content Marketing</li>
          <li className="dcr">Digital Strategy Consulting</li>
          <li className="dcr">Mobile App Development</li>
          <li className="dcr">Offline Marketing</li>
        </ul>
      </div>
      <div className="footer-section">
        <img src={ISOLogo} alt="Image" className="image" />
      </div>
    </div>
  );
};

export default Footer;
