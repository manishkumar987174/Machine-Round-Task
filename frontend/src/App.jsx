import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from './components/ProductForm';
import ProductTable from './components/ProductTable';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/products';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(API_URL);
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        console.error('API did not return an array:', response.data);
        setError('Invalid data format received from the server.');
        setProducts([]);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (newProductData) => {
    try {
      setError('');
      const response = await axios.post(API_URL, newProductData);
      setProducts((prevProducts) => [response.data, ...prevProducts]);
    } catch (err) {
      console.error('Error adding product:', err);
      const errMsg = err.response?.data?.message || 'Failed to add product. Please try again.';
      setError(errMsg);
    }
  };

  const handleUpdateStock = async (id, newStock) => {
    try {
      setError('');
      const response = await axios.patch(`${API_URL}/${id}`, { stock: newStock });
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === id ? { ...product, stock: response.data.stock } : product
        )
      );
    } catch (err) {
      console.error('Error updating stock:', err);
      const errMsg = err.response?.data?.message || 'Failed to update stock. Please try again.';
      setError(errMsg);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      setError('');
      await axios.delete(`${API_URL}/${id}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
      const errMsg = err.response?.data?.message || 'Failed to delete product. Please try again.';
      setError(errMsg);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2F3437] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8 border-b border-[#DDD6C8] pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-[#2F3437] mb-2">
            Product Inventory System
          </h1>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-[#FEE2E2] text-[#991B1B] border border-red-200 rounded text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-1">
            <ProductForm onAddProduct={handleAddProduct} />
          </div>

          <div className="md:col-span-2">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="bg-[#FFFFFF] border border-[#DDD6C8] rounded p-12 text-center my-6">
                <p className="text-gray-500 text-lg font-medium">No products yet</p>
                <p>Add products</p>
              </div>
            ) : (
              <ProductTable
                products={products}
                onUpdateStock={handleUpdateStock}
                onDeleteProduct={handleDeleteProduct}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
