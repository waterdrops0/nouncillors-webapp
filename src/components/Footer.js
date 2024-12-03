import React from 'react';

const Footer = () => {
  return (
    <footer className="py-4 bg-gray-800 text-white text-center">
      <div className="container mx-auto">
        <div className="flex justify-center space-x-6">
          <a
            href="https://twitter.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            Twitter
          </a>
          <a
            href="https://discord.gg/yourserver"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400"
          >
            Discord
          </a>
          <a
            href="https://farcaster.xyz/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400"
          >
            Farcaster
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
