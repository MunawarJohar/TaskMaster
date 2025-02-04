import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='bg-indigo-900 text-white py-4 px-6'>
      <div className="flex justify-between items-center">
        <div className="logo text-xl font-bold">TaskMaster</div>

        <div className="hidden sm:flex gap-6">
          <ul className="flex gap-6">
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
          </ul>
        </div>

        <div className="sm:hidden">
          <button onClick={toggleMenu} className="text-2xl">
            ☰
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden mt-4">
          <ul className="flex flex-col gap-4">
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
