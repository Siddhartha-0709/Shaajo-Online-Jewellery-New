import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from React Router if you're using it
import logo from '../assets/shaajoLOGO.png';
function Header() {
  const navigate = useNavigate();
  const handleTrackOrders =()=>{
    alert('c')
    navigate('/track');
  }
  return (
    <div className="relative w-full bg-white mt-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span>
            <img
              alt="logo"
              className="rounded-lg object-cover lg:block"
              src={logo}
              style={{height:50, width:50}}
            />
          </span>
          <span className="font-bold">Shaajo's Creation</span>
        </div>
        <div className="hidden lg:block">
          <ul className="inline-flex space-x-8">
            <li>
              <Link
                to="/"
                className="text-sm font-semibold text-gray-800 hover:text-gray-900"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-sm font-semibold text-gray-800 hover:text-gray-900"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-sm font-semibold text-gray-800 hover:text-gray-900"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/privacy"
                className="text-sm font-semibold text-gray-800 hover:text-gray-900"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/upload"
                className="text-sm font-semibold text-gray-800 hover:text-gray-900"
              >
                Product Upload
              </Link>
            </li>
          </ul>
        </div>
        <div className="hidden lg:block">
          <button
            type="button"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={handleTrackOrders}
          >
            Track Orders
          </button>
        </div>
        <div className="lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 cursor-pointer"
          >
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Header;
