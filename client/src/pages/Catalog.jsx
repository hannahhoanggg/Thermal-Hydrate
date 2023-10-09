// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// export default function Catalog() {
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState();

//   useEffect(() => {
//     async function loadCatalog() {
//       try {
//         const response = await fetch('/api/products');
//         if (!response.ok) throw new Error(`fetch Error ${response.status}`);
//         const user = await response.json();
//         setProducts(user);
//       } catch (error) {
//         setError(error);
//       }
//     }
//     loadCatalog();
//   }, [products]);
// }

// if (error) return <div>Error! {error.message}</div>;

// return (
//   <div>
//     <h2 className="mx-auto">OUR PRODUCTS</h2>
//     <div className="row">
//       {products?.map((product) => (
//         <div key={product.productId}>
//           <ProductCard product={product} />
//         </div>
//       ))}
//     </div>
//     <button>ADD TO CART</button>
//   </div>
// );

// function ProductCard({ product }) {
//   const { productId, name, style, color, image, price } = product;
//   return (
//     <Link to={`/details/${productId}`}>
//       <img src={image} alt="insulated bottles" />
//       <h3>{name}</h3>
//       <h4>{style}</h4>
//       <h4>{color}</h4>
//       <p>'$'{price}</p>
//     </Link>
//   );
// }
