import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppContext from './components/AppContext';
import Home from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import Banner from './components/Banner';
import Catalog from './pages/Catalog';
import RegistrationForm from './components/RegistrationForm';
import ProductDetails from './pages/ProductDetails';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';

const tokenKey = 'react-context-jwt';

export default function App() {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [isAuthorizing, setIsAuthorizing] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem(tokenKey);
    if (auth) {
      const { user, token } = JSON.parse(auth);
      setUser(user);
      setToken(token);
    }
    setIsAuthorizing(false);
  }, []);

  if (isAuthorizing) return null;

  function handleSignIn(auth) {
    localStorage.setItem(tokenKey, JSON.stringify(auth));
    setUser(auth.user);
    setToken(auth.token);
  }

  function handleSignOut() {
    localStorage.removeItem(tokenKey);
    setUser(undefined);
    setToken(undefined);
  }

  const contextValue = { user, token, handleSignIn, handleSignOut };

  return (
    <AppContext.Provider value={contextValue}>
      <Routes>
        <Route path="/" element={<Banner />}>
          <Route index element={<Home />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="details/:productId" element={<ProductDetails />} />
          <Route path="sign-in" element={<AuthPage action="sign-in" />} />
          <Route
            path="sign-up"
            element={<RegistrationForm action="sign-up" />}
          />
          <Route path="cart" element={<Cart />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppContext.Provider>
  );
}
