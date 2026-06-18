import React from 'react';

function ProductTable({ products = [], onUpdateStock, onDeleteProduct }) {
  if (!Array.isArray(products)) {
    return (
      <div className="bg-[#FFFFFF] border border-[#DDD6C8] rounded p-6 text-center my-6">
        <p className="text-red-500 font-medium"> products is not valid</p>
      </div>
    );
  }
  
  const UpdateStock = (product) => {
    const userInput = window.prompt(`Enter new stock value for "${product.name}":`, product.stock);
    
    if (userInput === null) return;
    
    const parsedStock = Number(userInput);
    
    if (isNaN(parsedStock) || !Number.isInteger(parsedStock) || parsedStock < 0) {
      window.alert('Please enter a valid number.');
      return;
    }
    
    onUpdateStock(product._id, parsedStock);
  };

  const handleDeleteClick = (product) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete "${product.name}"?`);
    if (isConfirmed) {
      onDeleteProduct(product._id);
    }
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#DDD6C8] rounded overflow-hidden max-w-4xl mx-auto my-6">
      <div className="overflow-x-auto max-w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FAF8F5] border-b border-[#DDD6C8]">
              <th className="p-4 font-bold text-sm text-[#2F3437]">Name</th>
              <th className="p-4 font-bold text-sm text-[#2F3437]">Category</th>
              <th className="p-4 font-bold text-sm text-[#2F3437]">Price</th>
              <th className="p-4 font-bold text-sm text-[#2F3437]">Stock</th>
              <th className="p-4 font-bold text-sm text-[#2F3437] text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const isOutOfStock = product.stock === 0;
              return (
                <tr
                  key={product._id}
                  className={`border-b border-[#DDD6C8] transition-colors duration-150 ${
                    isOutOfStock 
                      ? 'hover:bg-[#FCD2D2]' 
                      : 'hover:bg-[#FAF8F5]'
                  }`}
                >
                  <td className="p-4 font-medium text-[#2F3437]">{product.name}</td>
                  <td className="p-4 text-[#2F3437] text-sm">{product.category}</td>
                  <td className="p-4 text-[#2F3437] font-medium">{Number(product.price)}</td>
                  <td className="p-4">
                    {isOutOfStock ? (
                      <span className="inline-block px-2.5 py-0.5 text-xs text-center font-semibold rounded-full bg-[#FEE2E2] text-[#991B1B] border border-red-200">
                        Out of Stock
                      </span>
                    ) : (
                      <span className="text-[#2F3437] font-medium">{product.stock}</span>
                    )}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => UpdateStock(product)}
                      className=" px-3 py-1 bg-[#4F6D5D] text-white text-xs font-medium rounded hover:bg-[#19ac5e] transition-colors"
                    >
                      Update Stock
                    </button>
                    <button
                      onClick={() => handleDeleteClick(product)}
                      className="px-3 py-1 bg-white border border-red-300 text-red-600 text-xs font-medium rounded hover:bg-red-200 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductTable;
