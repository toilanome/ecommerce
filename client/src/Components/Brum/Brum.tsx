import React from 'react';
import { Link } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
interface BrumProps {
  handleSearch: (query: string) => void;
}

const Brum: React.FC<BrumProps> = ({ handleSearch }) => {
  return (
    <>
      <div className="mx-auto max-w-screen-xl">
        <nav className="text-sm sm:text-base bg-white p-4 md:p-6 lg:p-6 rounded-md shadow-lg flex items-center justify-between">
          <ol className="list-none p-0 inline-flex space-x-2">
            <li className="flex items-center"></li>
            <li className="flex items-center">
              <Link to={'/'} className="text-gray-600 hover:text-blue-500 transition-colors duration-300">
                Home
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">
              <span className="text-gray-800">Products</span>
            </li>
          </ol>
          <div className='flex '>
            <input
              type="text"
              placeholder="Tìm kiếm"
              onChange={(e) => handleSearch(e.target.value)}
              className='w-full px-4 py-1 text-gray-800  focus:outline-none rounded-l-xl border-1 border-solid border-gray-300 ' style={{border:'1px solid gray'}}
            />
            <div>
            <button className=' flex items-center bg-blue-500 justify-center w-12 h-12 text-white rounded-r-lg text-xl'>
            <CiSearch />
            </button>
            </div>
            
          </div>

          
        </nav>
      </div>
    </>
  );
};

export default Brum;
