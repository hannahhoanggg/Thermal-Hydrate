import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';

export default function Banner() {
  return (
    <div>
      <div className="flex items-center justify-center w-screen mx-auto bg-rose-200">
        <img
          src="/images/logo.jpg"
          alt="logo"
          className="object-scale-down h-20"
        />
        <h1 className="px-8 text-3xl font-medium">THERMAL HYDRATE</h1>
      </div>
      <NavBar />
      <Outlet />
    </div>
  );
}
