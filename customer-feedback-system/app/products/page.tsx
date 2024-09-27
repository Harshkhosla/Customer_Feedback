"use client"; // Add this at the very top of your component

import { useState, useEffect } from 'react';
import axios from '../../lib/axios';
import { Product } from '../../lib/types';
import { useRouter } from 'next/navigation';

const ProductsPage = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  // Only run on client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleNavigation = () => {
    if (isClient) {
      router.push('/users');
    }
  };
  const handleNavigation1 = () => {
    if (isClient) {
      router.push('/feedback');
    }
  };

  const [products, setProducts] = useState<Product[]>([]); // Explicitly typing products array
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  // Fetch products from the backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  // Handle product creation
  const handleCreateProduct = async () => {
    try {
      await axios.post('/products', { name, description });
      fetchProducts(); // Refresh product list after creation
    } catch (error) {
      console.error('Error creating product', error);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-6 ">
      <div className="bg-white p-6 shadow-md rounded-md">
        <h1 className="text-2xl mb-4 font-bold">Products</h1>

        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            onClick={handleCreateProduct}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Create Product
          </button>
          <button
            onClick={handleNavigation}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Create Users
          </button>
          <button
            onClick={handleNavigation1}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Create Feedback
          </button>
        </div>

        <h2 className="text-xl mb-4 font-bold">Product List</h2>

        {/* Scrollable table for product list */}
        <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-md">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                <th className="py-3 px-6 text-left">Product Name</th>
                <th className="py-3 px-6 text-left">Description</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{product.name}</td>
                  <td className="py-3 px-6 text-left">{product.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Conditional message if no products exist */}
        {products.length === 0 && (
          <p className="mt-4 text-gray-500">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
