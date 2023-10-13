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
  }, [user?.userId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;

  return (
    <div className="mt-4">
      <h1 className="mt-5 text-2xl font-semibold text-center text-teal-500">
        Your Shopping Cart
      </h1>
      <div className="container grid flex-col grid-cols-2 mt-4 space-x-8">
        <div>
          {cart?.map((product, index) => (
            <div key={index}>
              <img src={product.image} className="object-contain w-40 h-40" />
              <div>
                <h4 className="font-medium">{product.name}</h4>
                <h4>{product.style}</h4>
                <h4>Quantity: {product.quantity}</h4>
                <h4>${product.price}</h4>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-10 border-2 bg-slate-200 border-cyan-300">
          <h1 className="mt-3 text-lg font-bold text-center">ORDER SUMMARY</h1>
          <p className="font-normal">Subtotal</p>
          <p className="font-normal">Shipping</p>
          <p className="font-normal">Tax</p>
          <div className="mt-8 text-center">
            <button
              type="submit"
              className="p-1.5 font-medium border-2 border-black border-solid rounded bg-slate-500">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
