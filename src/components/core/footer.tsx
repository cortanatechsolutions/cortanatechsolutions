import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import ThreadsIcon from "../Icons/ThreadsIcon";

const Footer: React.FC = () => {
  return (
    <footer className="overflow-hidden py-15 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center py-10 sm:flex-row sm:justify-between">
          <img
            alt=""
            src={`/default-logo.svg`}
            className="flex h-10 mb-10 sm:mb-0"
          />
          <nav
            className="-my-1 flex text-2sm sm:text-sm"
            aria-label="quick links"
          >
            <div className="-my-1 flex justify-center gap-x-12 gap-y-6 md:gap-x-10 grid grid-cols-3 sm:grid-cols-6">
              <a
                className="transition hover:text-blue-500 hover:text-theme-royalBlue"
                href="#Home"
              >
                Home
              </a>
              <a
                className="transition hover:text-blue-500 hover:text-theme-royalBlue"
                href="#PartnerWithUs"
              >
                Partner With Us
              </a>
              <a
                className="transition hover:text-blue-500 hover:text-theme-royalBlue"
                href="#Testimonial"
              >
                Testimonial
              </a>
              <a
                className="transition hover:text-blue-500 hover:text-theme-royalBlue"
                href="#OurWork"
              >
                Our Work
              </a>
              <a
                className="transition hover:text-blue-500 hover:text-theme-royalBlue"
                href="#Blog"
              >
                Blog
              </a>
              <a
                className="transition hover:text-blue-500 hover:text-theme-royalBlue"
                href="#OurLeadership"
              >
                Our Team
              </a>
            </div>
          </nav>
        </div>
        <div className="flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-between">
          <div className="flex gap-x-6 mb-5 sm:mb-0">
            <a
              href="https://www.facebook.com/cortanatechsolutions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl"
            >
              <FontAwesomeIcon
                icon={faFacebook}
                className="hover:text-blue-500"
              />
            </a>
            <a
              href="https://www.instagram.com/cortanatechsolutions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                className="hover:text-pink-500"
              />
            </a>
            <a
              href="https://www.linkedin.com/company/cortanatech-solutions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl"
            >
              <FontAwesomeIcon
                icon={faLinkedin}
                className="hover:text-blue-700"
              />
            </a>
            <a
              href="https://www.threads.net/@cortanatechsolutions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl"
            >
              <ThreadsIcon className="w-6 h-6 hover:text-gray-400" />
            </a>
          </div>
          <p className="text-sm">
            <span className="text-gray-500">2024 © </span>
            <a
              className="text-gray-600 hover:text-primary"
              href="https://cortanatechsolutions.com/"
            >
              Cortanatech Solutions, Inc.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
