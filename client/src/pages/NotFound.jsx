import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex justify-center min-h-screen align-center">
      <div className="mb-5 text-center col">
        <h3>Uh oh, we could not find the page you were looking for!</h3>
        <Link to="/home">Return to Home</Link>
      </div>
    </div>
  );
}
