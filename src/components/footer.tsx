import React from "react";

interface FooterProps {
  data: {
    text: string;
  };
}

const Footer: React.FC<FooterProps> = ({ data }) => {
  return (
    <footer className="mt-1 flex-none">
      <div className="sm:px-8">
        <div className="mx-auto w-full max-w-7xl lg:px-8">
          <div className="border-t border-zinc-100 pb-16">
            <div className="relative px-4 sm:px-8 lg:px-12">
              <div className="mx-auto max-w-2xl lg:max-w-5xl">
                <div className="flex flex-col items-center pt-10 justify-between gap-6 sm:flex-row">
                  <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800">
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
      </div>
    </footer>
  );
};

export default Footer;
