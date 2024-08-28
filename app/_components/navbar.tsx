'use client';
import { useSession, signOut } from "next-auth/react";
import { constants } from '@/constants/projectName'

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-gray-800">
         {constants.projectName}
        </a>

        {/* Navigation Links */}
        {/**<div className="hidden md:flex space-x-8">
          <a href="/" className="text-gray-600 hover:text-blue-600 transition duration-300">
            Home
          </a>
        </div>
        */}
        {/* Welcome Text */}
        <div className="flex items-center space-x-4">
          <span className="text-gray-600 hidden md:inline-block">
            Welcome, {session?.user?.name}
          </span>
          <a  style={{ cursor: 'pointer' }} onClick={() => signOut()}>
              Logout
            </a>
          <button className="md:hidden text-gray-600 focus:outline-none">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
