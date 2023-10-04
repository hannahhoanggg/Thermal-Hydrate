import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import AppContext from './components/AppContext';

export default function Home() {
  const { user } = useContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/sign-in');
  }, [user, navigate]);

  return <div></div>;
}
