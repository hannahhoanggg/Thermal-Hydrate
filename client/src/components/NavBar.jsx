import { useContext } from 'react';
import { IoPersonCircle } from 'react-icons/io5';
import { GrCart } from 'react-icons/gr';
import AppContext from './AppContext';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const { user, handleSignIn, handleSignOut } = useContext(AppContext);

  return (
    <div className="flex w-screen text-white bg-pink-300">
      <nav className="flex items-center space-x-3 ms-auto">
        <Link to="/" className="font-normal hover:text-teal-400">
          Home
        </Link>
        <Link to="/catalog" className="font-normal hover:text-teal-400">
          Products
        </Link>
        <div className="flex items-center space-x-3 ms-auto">
          {user && (
            <Link
              to="/"
              onClick={handleSignOut}
              className="font-normal hover:text-teal-400">
              Sign Out
            </Link>
          )}
          {!user && (
            <>
              <Link
                to="/sign-in"
                onClick={handleSignIn}
                className="font-normal hover:text-teal-400">
                Sign In
              </Link>
              <Link to="/sign-up">
                <IoPersonCircle className="cursor-pointer hover:text-teal-400" />
              </Link>
            </>
          )}
          <Link to="/">
            <GrCart className="cursor-pointer" />
          </Link>
        </div>
      </nav>
    </div>
  );
}
