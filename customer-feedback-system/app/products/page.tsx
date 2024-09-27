"use client"
import { useState, useEffect } from 'react';
import axios from '../../lib/axios';
import { Product } from '../../lib/types';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]); // Explicitly typing products array
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  const handleCreateProduct = async () => {
    try {
      await axios.post('/products', { name, description });
      fetchProducts(); // Refresh product list after creation
    } catch (error) {
      console.error('Error creating product', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleCreateProduct}>Create Product</button>

      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
