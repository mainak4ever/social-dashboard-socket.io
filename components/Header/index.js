"use client"
import Link from 'next/link';
import { FaHome, FaBell } from 'react-icons/fa';
import { SiPowerpages } from "react-icons/si";
import { FaCircleUser } from "react-icons/fa6";
import { useSelector } from 'react-redux';

const Header = () => {
  const { User } = useSelector((state) => state.user);
  return (
    <header className="bg-black text-white py-4 px-8 drop-shadow">
      <div className="w-full flex justify-between items-center">

        {/* Left side: Logo */}
        <div className="text-gold font-bold text-xl">
          <Link href="/">
            <div className="text-white flex gap-4 items-end">
              <SiPowerpages size={25} className='text-gold' />
              <p className='p-0 m-0'>SPAGES</p>
            </div>
          </Link>
        </div>

        {/* Center: Home and Notification Icons */}
        <div className="flex space-x-8 items-center rounded-3xl bg-[rgb(38,38,38)] px-5 py-1.5 h-full">
          <Link href="/">
            <div className="rounded-full bg-gold text-black hover:bg-black hover:text-white">
              <FaHome size={22} className='p-1' />
            </div>
          </Link>
          <Link href="/notifications">
            <div className="relative">
              <FaBell size={18} className="text-white hover:text-gold" />
              {/* Red Dot */}
              <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full border-[1.5px] border-black"></span>
            </div>
          </Link>
        </div>

        {/* Right side: Login Button */}
        <div>
          <Link href="/profile">
            <div className="border-2 border-light rounded-full text-gold">
              {/* Login */}
              {/* <FaCircleUser size={25} /> */}
              <img
                src={User.avatar}
                alt={User.name}
                className="w-8 h-8 rounded-full   object-cover object-center"
              />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
