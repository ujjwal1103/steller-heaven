import React from "react";
import logo from "../assets/logo.png";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200">
      <div className="container mx-auto py-8">
        <div>
          <div className="flex items-center space-x-4 justify-center p-5">
            <img src={logo} alt="Company Logo" className="h-16" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 place-content-center gap-12">
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
            <ul className="space-y-2">
              <li>Facebook</li>
              <li>Instagram</li>
              <li>twitter</li>
            </ul>
          </div>

          <div className="flex  flex-col items-center">
            <h2 className="text-lg font-semibold mb-4">Address</h2>
            <p>123 Street, City</p>
            <p>Country</p>
          </div>

          <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-4">Useful Links</h2>
            <ul className="space-y-2">
              <li>About Us</li>
              <li>Services</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto py-4 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} StellerHevan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
