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
    <footer className="mt-1 flex-none">
      <div className="sm:px-8">
        <div className="mx-auto w-full max-w-7xl lg:px-8">
          <div className="relative px-4 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="py-16">
                <img
                  alt=""
                  src={`${process.env.PUBLIC_URL}/default-logo.svg`}
                  className="mx-auto h-10 w-auto"
                />
                <nav className="mt-10 text-sm" aria-label="quick links">
                  <div className="-my-1 flex justify-center gap-x-6">
                    <a
                      className="transition hover:text-blue-500 hover:text-blue-400"
                      href="#Home"
                    >
                      Home
                    </a>
                    <a
                      className="transition hover:text-blue-500 hover:text-blue-400"
                      href="#PartnerWithUs"
                    >
                      Partner With Us
                    </a>
                    <a
                      className="transition hover:text-blue-500 hover:text-blue-400"
                      href="#OurWork"
                    >
                      Our Work
                    </a>
                    <a
                      className="transition hover:text-blue-500 hover:text-blue-400"
                      href="https://blog.cortanatechsolutions.com"
                    >
                      Our Blog
                    </a>
                  </div>
                </nav>
              </div>
              <div className="flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-between">
                <div className="flex gap-x-6">
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
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;