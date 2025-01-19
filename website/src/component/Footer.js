import React from 'react';

function Footer() {
  return (
    <footer className="w-full text-white">
      <div className="bg-bg-footer flex flex-row gap-5 px-5 py-5">
        <div>
          <p className="font-bold text-lg">🦈steamShark</p>
          <p>The tool that smells scam websites!</p>
        </div>
        <div>
          <p className="font-bold text-lg">USEFUL LINKS</p>
          <ul>
            <li>
              <a
                href="https://github.com/Franciscoborges2002/ASteamShark"
                target="_blank"
                className="font-medium transition-all delay-50 text-purple-500 hover:text-purple-600 hover:underline"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </li>
            <li>
              <a
                href="/steamShark/changelog"
                target="_blank"
                className="font-medium transition-all delay-50 text-purple-500 hover:text-purple-600 hover:underline"
                rel="noopener noreferrer"
              >
                Changelog
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-bg-footer-bottom flex justify-center items-center p-3 text-white">
        <p>
          Made with ❤️ and ☕ by{' '}
          <a
            href="https://github.com/Franciscoborges2002"
            className="font-medium transition-all delay-50 text-purple-500 hover:text-purple-600 hover:underline"
          >
            Francisco Borges
          </a>
          .
        </p>
      </div>
    </footer>
  );
}

export default Footer;
