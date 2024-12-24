import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 px-4 mt-12 absolute bottom-0 w-full">
      <div className="max-w-7xl mx-auto">
        
        {/* Social Media & Copyright Section */}
        <div className="border-t border-gray-300 mt-8 pt-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex space-x-4 text-xl">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook className="hover:text-blue-600" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter className="hover:text-blue-400" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram className="hover:text-pink-500" />
            </a>
          </div>
          <div className="text-center text-sm mt-4 md:mt-0">
            &copy; 2024 Task Manager, Inc. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
