import { useState } from 'react';

export default function RegistrationForm() {
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div>
      <h1>Create an Account</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name
          <input
            required
            name="firstName"
            type="text"
            placeholder="Enter your first name here"
          />
        </label>
        <label>
          Last Name
          <input
            required
            name="lastName"
            type="text"
            placeholder="Enter your last name here"
          />
        </label>
        <label>
          Username
          <input required name="username" type="text" />
        </label>
        <label>
          Password
          <input required name="password" type="password" />
        </label>
        <label>
          Email
          <input
            required
            name="email"
            type="email"
            placeholder="Enter your email"
          />
        </label>
        <div>
          <button disabled={isLoading} type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
