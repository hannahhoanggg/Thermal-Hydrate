import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegistrationForm() {
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
      const res = await fetch('/api/sign-up', req);
      if (!res.ok) throw new Error(`fetch Error ${res.status}`);
      const user = await res.json();
      alert('Registered', user);
    } catch (error) {
      alert(`Error registering user: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }

  function handleNavigate() {
    navigate('/sign-in');
  }

  return (
    <div className="flex-row">
      <h1 className="mt-5 text-2xl font-semibold text-center">
        Create an Account
      </h1>
      <form onSubmit={handleSubmit} className="text-base font-normal px-14">
        <div className="mt-3">
          <label>
            First Name
            <input
              required
              name="firstName"
              type="text"
              placeholder="Enter your first name here"
              className="block py-px mt-3 border-2 focus:ring-0 focus:outline-none focus:border-fuchsia-600 border-fuchsia-600"
            />
          </label>
        </div>
        <div className="mt-3">
          <label>
            Last Name
            <input
              required
              name="lastName"
              type="text"
              placeholder="Enter your last name here"
              className="block py-px mt-3 border-2 focus:ring-0 focus:outline-none focus:border-fuchsia-600 border-fuchsia-600"
            />
          </label>
        </div>
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
        <div className="mt-3">
          <label>
            Email
            <input
              required
              name="email"
              type="email"
              placeholder="Enter email"
              className="block py-px mt-3 border-2 focus:ring-0 focus:outline-none focus:border-fuchsia-600 border-fuchsia-600"
            />
          </label>
        </div>
        <div className="flex justify-end mx-auto mt-10">
          <button
            disabled={isLoading}
            type="submit"
            onClick={() => handleNavigate('register')}
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
