export async function fetchCatalog() {
  const response = await fetch('/api/products');
  if (!response.ok) throw new Error(`Fetch Error ${response.status}`);
  return await response.json();
}

export async function fetchProducts(productId) {
  const product = await fetch(`/api/products/${productId}`);
  if (!product.ok) throw new Error(`Fetch Error ${product.status}`);
  return await product.json();
}

export async function fetchCart(userId) {
  const cartItems = await fetch(`/api/orderItems/${userId}`);
  if (!cartItems.ok) throw new Error(`Fetch Error ${cartItems.status}`);
  return await cartItems.json();
}

export async function updateItem(orderItemId, quantity, token) {
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
  return await res.json();
}

export async function deleteItem(orderItemId, productId, token) {
  const req = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ orderItemId, productId }),
  };
  const res = await fetch(`/api/orderItems/${orderItemId}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
}
