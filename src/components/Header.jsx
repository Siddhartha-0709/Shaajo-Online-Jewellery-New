import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/shaajoLOGO.png';

function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleTrackOrders = () => {
    alert('c');
    navigate('/track');
  }

  return (
    <div className="relative w-full bg-white mt-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span>
            <Link to={"/"}>
              <img
                alt="logo"
                className="rounded-lg object-cover lg:block"
                src={logo}
                style={{ height: 50, width: 50 }}
              />
            </Link>
          </span>
          <Link to={"/"}>
            <span className="font-bold">Shaajo's Creation</span>
          </Link>
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
                to="/track"
                className="text-sm font-semibold text-gray-800 hover:text-gray-900"
              >
                Track Orders
              </Link>
            </li>
            <li>
              <Link
                to="/upload"
                className="text-sm font-semibold text-gray-800 hover:text-gray-900 hidden"
              >
                Upload
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden ml-50">
          <button
            type="button"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            Menu
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden">
            <ul className="bg-white absolute top-16 left-0 right-0 shadow-lg py-8 px-4">
              <li className='pt-4 pb-4'>
                <Link to="/" className="text-lg font-semibold text-gray-800 hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li className='pt-4 pb-4'>
                <Link to="/about" className="text-lg font-semibold text-gray-800 hover:text-gray-900">
                  About Us
                </Link>
              </li>
              <li className='pt-4 pb-4'>
                <Link to="/contact" className="text-lg font-semibold text-gray-800 hover:text-gray-900">
                  Contact Us
                </Link>
              </li>
              <li className='pt-4 pb-4'>
                <Link to="/privacy" className="text-lg font-semibold text-gray-800 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
              <li className='pt-4 pb-4'>
                <Link to="/track" className="text-lg font-semibold text-gray-800 hover:text-gray-900">
                  Track Orders
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
