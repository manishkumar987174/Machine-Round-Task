import React, { useState } from 'react';

function ProductForm({ onAddProduct }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (!name.trim()) {
      setFormError('Product name is required');
      return;
    }
    if (!price || Number(price) < 0) {
      setFormError('Please enter a valid price (0 or more)');
      return;
    }
    if (stock === '' || Number(stock) < 0) {
      setFormError('Please enter a valid stock quantity (0 or more)');
      return;
    }
    if (!category.trim()) {
      setFormError('Category is required');
      return;
    }

    setFormError('');

    const newProduct = {
      name: name.trim(),
      price: Number(price),
      stock: Number(stock),
      category: category.trim()
    };

    onAddProduct(newProduct);

    setName('');
    setPrice('');
    setStock('');
    setCategory('');
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#DDD6C8] rounded p-6 max-w-md mx-auto my-6">
      <h2 className="text-xl font-bold mb-4 text-[#2F3437]">Add New Product</h2>
      
      {formError && (
        <div className="mb-4 p-2 bg-[#FEE2E2] text-[#991B1B] border border-red-200 rounded text-sm">
          {formError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#2F3437] mb-1">
            Product Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-[#DDD6C8] rounded focus:border-[#4F6D5D] focus:ring-1 focus:ring-[#4F6D5D] focus:outline-none"
            placeholder="Enter Product Name"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#2F3437] mb-1">
              Price *
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border border-[#DDD6C8] rounded focus:border-[#4F6D5D] focus:ring-1 focus:ring-[#4F6D5D] focus:outline-none"
              placeholder="Enter product Price"
              
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2F3437] mb-1">
              Stock *
            </label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full px-3 py-2 border border-[#DDD6C8] rounded focus:border-[#4F6D5D] focus:ring-1 focus:ring-[#4F6D5D] focus:outline-none"
              placeholder="Enter quantity"
              
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2F3437] mb-1">
            Category *
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-[#DDD6C8] rounded focus:border-[#4F6D5D] focus:ring-1 focus:ring-[#4F6D5D] focus:outline-none"
            placeholder="Enter Category"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-[#4F6D5D] text-white rounded font-medium hover:bg-[#0fac58] transition-colors"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
