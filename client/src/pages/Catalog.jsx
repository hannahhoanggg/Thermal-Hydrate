import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function loadCatalog() {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error(`fetch Error ${response.status}`);
        const user = await response.json();
        setProducts(user);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    loadCatalog();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;

  return (
    <div className="mt-4">
      <h1 className="mb-2 text-2xl font-medium text-center text-red-600">
        OUR PRODUCTS
      </h1>
      <div className="grid grid-flow-col grid-rows-5">
        {products?.map((product) => (
          <div key={product.productId}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  const { productId, name, style, color, image, price } = product;
  return (
    <div className="text-center">
      <Link to={`/details/${productId}`}>
        <img
          src={image}
          alt="insulated bottles"
          className="object-cover h-48 mx-auto"
        />
        <h2 className="text-xl font-medium">{name}</h2>
        <h4 className="text-base font-normal">{style}</h4>
        <h4 className="text-sm">{color}</h4>
        <p className="text-base font-normal">${price}</p>
      </Link>
    </div>
  );
}
