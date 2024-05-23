import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="m-auto px-5 max-w-[1440px] rounded-t-25 bg-accentTwo">
        <div className="flex justify-between">
          <div className="flex flex-col m-8">
            <div className="flex items-center gap-2">
              <i>
                <FaGithub size={26} className="text-secondary" />
              </i>
              <a
                className="text-left text-secondary  text-xl"
                href="https://github.com/Spookyrumble"
              >
                GitHub
              </a>
            </div>
            <div className="flex items-center gap-2">
              <i>
                <FaXTwitter size={26} className="text-secondary" />
              </i>
              <a
                className="text-secondary text-xl"
                href="https://x.com/HansMarAnd"
              >
                X/Twitter
              </a>
            </div>
          </div>
        </div>
        <p className="text-secondary text-xs text-center pb-1">
          &copy; All Rights Reserved - Powered By Noroff API
        </p>
      </div>
    </footer>
  );
};

export default Footer;
