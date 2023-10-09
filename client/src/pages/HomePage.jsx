import { useState, useEffect } from 'react';
import Banner from './components/Banner';
import NavBar from './components/NavBar';
import BodyBanner from './components/BodyBanner';
import Advertisement from './components/Advertisement';
import { Link } from 'react-router-dom';

export default function Home() {
  const [products, setProducts] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function loadCatalog() {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error(`Error: , ${response.status}`);
        const user = await response.json();
        setProducts(user);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    }
    loadCatalog();
  }, []);

  if (error || !products) {
    console.error('Fetch error:', error);
    return <div>Error! {error.message}</div>;
  }

  return (
    <div>
      <Banner />
      <NavBar />
      <h3 className="mt-10 text-2xl font-medium text-center">
        Shop different brands!
      </h3>
      <div>
        {products?.map((product) => (
          <Link
            to="/catalog"
            key={product.productId}
            className="flex justify-center py-1 text-lg font-normal underline cursor-pointer decoration-cyan-500 text-cyan-500">
            Shop Now
          </Link>
        ))}
      </div>
      <BodyBanner />
      <Advertisement />
    </div>
  );
}
