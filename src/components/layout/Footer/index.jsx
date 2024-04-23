import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full px-10">
      <div className="rounded bg-accent rounded-t-25">
        <div className="flex justify-between">
          <div className="flex flex-col m-8">
            <div className="flex items-center gap-2">
              <i className="box-shadow-lg">
                <FaGithub className="text-secondary" />
              </i>
              <a className="text-left text-secondary text-shadow" href="#">
                GitHub
              </a>
            </div>
            <div className="flex items-center gap-2">
              <i>
                <FaXTwitter className="text-secondary" />
              </i>
              <a className="text-secondary text-shadow" href="#">
                X/Twitter
              </a>
            </div>
          </div>
          <div className="m-8">
            <p className="text-secondary mr-4 text-shadow">Pages:</p>
            <p className="text-secondary text-xs text-right text-shadow">
              About
            </p>
            <p className="text-secondary text-xs text-right text-shadow">
              Venues
            </p>
          </div>
        </div>
        <p className="text-secondary text-xs pb-1">
          &copy; All Rights Reserved - Powered By Noroff API
        </p>
      </div>
    </footer>
  );
};

export default Footer;
