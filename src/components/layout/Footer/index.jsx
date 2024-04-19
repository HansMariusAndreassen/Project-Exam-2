import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="absolute bottom-0 w-full px-10">
      <div className="rounded bg-brown rounded-t-25">
        <div className="flex justify-between">
          <div className="flex flex-col m-8">
            <div className="flex items-center gap-2">
              <i className="box-shadow-lg">
                <FaGithub className="text-background" />
              </i>
              <a className="text-left text-background text-shadow" href="#">
                GitHub
              </a>
            </div>
            <div className="flex items-center gap-2">
              <i>
                <FaXTwitter className="text-background" />
              </i>
              <a className="text-background text-shadow" href="#">
                X/Twitter
              </a>
            </div>
          </div>
          <div className="m-8">
            <p className="text-background mr-4 text-shadow">Pages:</p>
            <p className="text-background text-xs text-right text-shadow">
              About
            </p>
            <p className="text-background text-xs text-right text-shadow">
              Venues
            </p>
          </div>
        </div>
        <p className="text-background text-xs pb-1">
          &copy; All Rights Reserved - Powered By Noroff API
        </p>
      </div>
    </footer>
  );
};

export default Footer;
