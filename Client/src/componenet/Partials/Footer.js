import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="main-footer">
      <p className="col-sm">
        &copy;{new Date().getFullYear()} SMT IT Team | Developed By Shahar
        Assenheim | All right reserved
      </p>
    </div>
  );
};

export default Footer;
