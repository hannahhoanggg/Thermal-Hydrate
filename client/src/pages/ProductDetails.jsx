import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

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

  return (
    <div>
      <Link to="/catalog" className="underline">
        Back to Catalog
      </Link>
      <div className="flex items-center">
        <img
          src={image}
          alt="insulated bottles"
          className="object-contain h-80 w-80"
        />
        <div className="text-center">
          <h2>{name}</h2>
          <h3>{style}</h3>
          <h4>{color}</h4>
          <p>${price}</p>
        </div>
      </div>
      <button className="px-4 py-2 font-medium rounded bg-emerald-300">
        ADD TO CART
      </button>
    </div>
  );
}
