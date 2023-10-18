import { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AppContext from '../components/AppContext';

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [quantity, setQuantity] = useState(0);
  const { user, token } = useContext(AppContext);

  useEffect(() => {
    async function loadProduct(productId) {
      try {
        const product = await fetch(`/api/products/${productId}`);
        if (!product.ok) throw new Error(`Fetch Error ${product.status}`);
        const user = await product.json();
        setProduct(user);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (productId) {
      setIsLoading(true);
      loadProduct(productId);
    }
  }, [productId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>'{error.message}</div>;
  if (!product) return null;
  const { name, style, color, image, price } = product;

  function handleDecreaseQuantity() {
    setQuantity(quantity - 1);
  }

  function handleIncreaseQuantity() {
    setQuantity(quantity + 1);
  }

  async function addToCart() {
    if (!user) {
      alert('Please sign in to continue');
      navigate('/sign-in');
      return;
    }
    if (quantity === 0) {
      alert('Please select a quantity to continue');
      return;
    }
    if (quantity <= 0) {
      alert('Quantity must be a positive integer.');
      return;
    }
    try {
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      };
      const res = await fetch(`/api/orderItems/${user.userId}`, req);
      if (!res.ok) throw new Error(`fetch Error ${res.status}`);
      const data = await res.json();
      if (data) {
        navigate('/cart');
        alert('Added to cart!', data);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }

  return (
    <div>
      <Link to="/catalog" className="underline">
        Back to Catalog
      </Link>
      <div className="flex items-center justify-center">
        <img
          src={image}
          alt="insulated bottles"
          className="object-contain w-80 h-80"
        />
        <div className="text-center">
          <h2 className="text-4xl">{name}</h2>
          <h3 className="text-xl">{style}</h3>
          <h4 className="text-base">{color}</h4>
          <p className="text-base">${price}</p>
        </div>
      </div>
      <div className="flex justify-center w-24 p-2 mx-auto mt-5 space-x-4 text-lg border-2 border-solid rounded-lg align-center border-rose-200">
        <CustomButton
          onClick={handleDecreaseQuantity}
          count={quantity}
          text="-"
        />
        <CustomButton text={quantity} />
        <CustomButton
          onClick={handleIncreaseQuantity}
          count={quantity}
          text="+"
        />
      </div>
      <div className="flex justify-center mt-5">
        <button
          onClick={addToCart}
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
          ADD TO CART
        </button>
      </div>
    </div>
  );
}

function CustomButton({ text, count, onClick }) {
  return <button onClick={() => onClick(count)}>{text}</button>;
}
