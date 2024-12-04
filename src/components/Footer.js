import React from 'react';

const Footer = () => {
  return (
    <footer className="py-4 bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Left side: Social Media Links */}
        <div className="flex space-x-6">
          <a
            href="https://x.com/nouncil"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            Twitter
          </a>
          <a
            href="https://discord.gg/8ynX9Yr2XR"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400"
          >
            Discord
          </a>
          <a
            href="https://warpcast.com/nouncil"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400"
          >
            Farcaster
          </a>
        </div>

        {/* Right side: Additional Text */}
        <div className="text-right text-sm">
          Nouncil ©2024 by Waterdrops. CC0
        </div>
      </div>
    </footer>
  );
};

export default Footer;
