import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-3 px-4 sm:px-6 text-sm sm:text-base">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-2 sm:mb-0">
          <p>Made by Vadlamani Uday Kumar</p>
        </div>
        <div className="flex space-x-4">
          <a
            href="https://www.linkedin.com/in/vadlamani-uday-095755208/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-500"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://github.com/vadlamaniuday"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900"
          >
            <Github size={20} />
          </a>
          <a
            href="mailto:vadlamaniuday04@gmail.com"
            className="text-gray-600 hover:text-red-500"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
