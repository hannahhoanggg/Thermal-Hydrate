import { IoPersonCircle } from 'react-icons/io5';
import { GrCart } from 'react-icons/gr';

export default function NavBar() {
  return (
    <div className="flex w-screen text-white bg-pink-300">
      <nav className="flex items-center space-x-5 ms-auto">
        <a href="" className="font-normal hover:text-teal-400">
          Home
        </a>
        <a href="" className="font-normal hover:text-teal-400">
          Products
        </a>
        <a href="" className="font-normal hover:text-teal-400">
          Sign In
        </a>
        <IoPersonCircle className="cursor-pointer hover:text-teal-400" />
        <GrCart className="cursor-pointer" />
      </nav>
    </div>
  );
}
