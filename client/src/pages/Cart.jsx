import { useState, useEffect, useContext } from 'react';
import AppContext from '../components/AppContext';

export default function Cart() {
  const [cart, setCart] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AppContext);

  useEffect(() => {
    async function fetchCartItem() {
      setError(undefined);
      try {
        const response = await fetch(`/api/orderItems/${user.userId}`);
        if (!response.ok) throw new Error(`fetch Error ${response.status}`);
        const cartItems = await response.json();
        setCart(cartItems);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    fetchCartItem();
  }, [user.userId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;

  return (
    <div className="mt-4">
      <h1 className="mt-5 text-2xl font-semibold text-center text-teal-500">
        Your Shopping Cart
      </h1>
      <div className="flex justify-center">
        {cart?.map((product, index) => (
          <div key={index}>
            <img src={product.image} />
            <div>
              <h4>{product.name}</h4>
              <h4>{product.style}</h4>
              <h4>{product.quantity}</h4>
              <h4>${product.price}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
