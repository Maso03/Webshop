import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-700 w-full py-4 shadow-md mt-4">
      <div className="container mx-auto flex flex-col items-center text-center text-white">
        <p className="mb-2">TrendVault GmbH | All rights reserved</p>
        <p className="mb-2">Email: kontakt@trendvault.de</p>
        <p className="mb-2">Phone: (123) 456-7890</p>
        <div className="flex space-x-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/insta.png" alt="Instagram" className="w-6 h-6" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-gray-200"
          >
            <img src="/X_icon.svg" alt="  X" className="w-6 h-6" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-gray-200"
          >
            <img src="/facebook.png" alt="Facebook" className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
