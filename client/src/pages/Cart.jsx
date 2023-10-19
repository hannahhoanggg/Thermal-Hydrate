import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../components/AppContext';
import { FaTrashAlt } from 'react-icons/fa';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { user, token } = useContext(AppContext);
  const navigate = useNavigate();

  let subtotal = 0;
  cart.forEach((item) => (subtotal += item.price * item.quantity));
  const salesTax = subtotal * 0.0725;
  const shipping = 5;
  const checkoutTotal = subtotal + salesTax + shipping;

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

  async function updateCart(orderItemId, quantity) {
    try {
      const req = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      };
      const res = await fetch(`/api/orderItems/${orderItemId}`, req);
      if (!res.ok) throw new Error(`fetch error ${res.status}`);
      const update = await res.json();
      if (update) alert('Cart has been updated!', update);
      const updatedCart = cart.map((item) =>
        item.orderItemId === orderItemId ? { ...item, quantity } : item
      );
      setCart(updatedCart);
    } catch (error) {
      setError(error);
    }
  }

  async function deleteCart(orderItemId) {
    try {
      const req = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await fetch(`/api/orderItems/${orderItemId}`, req);
      const updatedCart = cart.filter((i) => i.orderItemId !== orderItemId);
      setCart(updatedCart);
    } catch (error) {
      setError(error);
    }
  }

  async function handleCheckout() {
    navigate('/checkout');
  }

  return (
    <div className="mt-4">
      <h1 className="mt-5 text-2xl font-semibold text-center text-teal-500">
        Your Shopping Cart
      </h1>
      {!cart[0] ? (
        <div>
          <div className="mt-5 text-center">
            Your shopping cart is currently empty.
          </div>
          <div className="mt-5 text-center">
            <Link to="/catalog" className="underline">
              Back to Catalog
            </Link>
          </div>
        </div>
      ) : (
        <div className="container grid flex-col grid-cols-2 mt-4 gap-x-5">
          <div>
            {cart?.map((product, index) => (
              <div key={index}>
                <div>
                  <img
                    src={product.image}
                    className="object-contain w-40 h-40"
                  />
                  <div>
                    <h4 className="font-medium">{product.name}</h4>
                    <h4>{product.style}</h4>
                    <label>
                      Quantity:
                      <select
                        name="quantity"
                        value={product.quantity}
                        onChange={(e) =>
                          updateCart(
                            product.orderItemId,
                            Number(e.target.value)
                          )
                        }
                        className="ml-3 bg-gray-200 border border-rose-300">
                        <option className="font-medium">
                          {product.quantity}
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </label>
                    <h4>${product.price}</h4>
                  </div>
                </div>
                <FaTrashAlt
                  onClick={() => deleteCart(product.orderItemId)}
                  className="text-lg text-pink-500"
                />
              </div>
            ))}
          </div>
          <div className="space-y-10 border-2 bg-slate-200 border-cyan-300">
            <h1 className="mt-3 text-lg font-bold text-center">
              ORDER SUMMARY
            </h1>
            <div className="font-medium columns-2">
              Subtotal
              <div className="font-normal">${subtotal.toFixed(2)}</div>
            </div>
            <div className="font-medium columns-2">
              Shipping
              <div className="font-normal">$5.00</div>
            </div>
            <div className="font-medium columns-2">
              Tax
              <div className="font-normal">${salesTax.toFixed(2)}</div>
            </div>
            <div className="font-medium columns-2">
              Total
              <div className="font-normal">${checkoutTotal.toFixed(2)}</div>
            </div>
            <div className="mt-8 text-center">
              <button
                type="submit"
                onClick={handleCheckout}
                className="p-1.5 font-medium border-2 border-black border-solid rounded bg-slate-500">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
