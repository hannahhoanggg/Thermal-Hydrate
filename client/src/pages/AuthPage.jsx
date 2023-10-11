import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../components/AppContext';
import SignIn from '../components/SignInForm';

export default function AuthPage({ action }) {
  const navigate = useNavigate();
  const { user, handleSignIn } = useContext(AppContext);

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const welcomeMessage =
    action === 'sign-in'
      ? 'Please sign in to continue'
      : 'Create an account to get started!';

  return (
    <div>
      <p className="ml-4 underline">{welcomeMessage}</p>
      <SignIn key={action} action={action} onSignIn={handleSignIn} />
    </div>
  );
}
