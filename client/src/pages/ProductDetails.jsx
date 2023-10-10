import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [count, setCount] = useState(0);

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

  function handleClickDown() {
    setCount(count - 1);
  }

  function handleClickUp() {
    setCount(count + 1);
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
        <CustomButton onClick={handleClickDown} count={count} text="-" />
        <CustomButton text={count} />
        <CustomButton onClick={handleClickUp} count={count} text="+" />
      </div>
      <div className="flex justify-center mt-5">
        <button className="px-4 py-2 font-medium rounded bg-emerald-400">
          ADD TO CART
        </button>
      </div>
    </div>
  );
}

function CustomButton({ text, count, onClick }) {
  return <button onClick={() => onClick(count)}>{text}</button>;
}
