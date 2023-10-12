import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(event.currentTarget);
      const userData = Object.fromEntries(formData.entries());
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      };
      const res = await fetch('/api/sign-in', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const { user, token } = await res.json();
      sessionStorage.setItem('token', token);
      if (token) navigate('/');
      console.log('Signed In', user, '; received token:', token);
    } catch (error) {
      alert(`Error signing in: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="flex-row">
      <h1 className="mt-5 text-2xl font-semibold text-center">
        Sign Into Your Account
      </h1>
      <form onSubmit={handleSubmit} className="text-base font-normal px-14">
        <div className="mt-3">
          <label>
            Username
            <input
              required
              name="username"
              type="text"
              placeholder="Enter username"
              className="block py-px mt-3 border-2 focus:ring-0 focus:outline-none focus:border-fuchsia-600 border-fuchsia-600"
            />
          </label>
        </div>
        <div className="mt-3">
          <label>
            Password
            <input
              required
              name="password"
              type="password"
              placeholder="Enter password"
              className="block py-px mt-3 border-2 focus:ring-0 focus:outline-none focus:border-fuchsia-600 border-fuchsia-600"
            />
          </label>
        </div>
        <div className="flex mx-auto mt-10">
          <button
            disabled={isLoading}
            type="submit"
            className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
