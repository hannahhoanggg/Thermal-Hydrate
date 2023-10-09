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
      <Link to="/">Back to Catalog</Link>
      <img src={image} />
      <h2>{name}</h2>
      <h3>{style}</h3>
      <h4>{color}</h4>
      <p>{price}</p>
    </div>
  );
}
