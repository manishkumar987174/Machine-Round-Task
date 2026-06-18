import React, { useState } from "react";

function ProductTable({
  products = [],
  onUpdateStock,
  onDeleteProduct,
}) {
  if (!Array.isArray(products)) {
    return (
      <div className="bg-[#FFFFFF] border border-[#DDD6C8] rounded p-6 text-center my-6">
        <p className="text-red-500 font-medium">
          Products data is not valid.
        </p>
      </div>
    );
  }

  const [search, setSearch] = useState("");

  
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const UpdateStock = (product) => {
    const userInput = window.prompt(
      `Enter new stock value for "${product.name}":`,
      product.stock
    );

    if (userInput === null) return;

    const parsedStock = Number(userInput);

    if (
      isNaN(parsedStock) ||
      !Number.isInteger(parsedStock) ||
      parsedStock < 0
    ) {
      window.alert("Please enter a valid stock number.");
      return;
    }

    onUpdateStock(product._id, parsedStock);
  };

  const handleDeleteClick = (product) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (isConfirmed) {
      onDeleteProduct(product._id);
    }
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#DDD6C8] rounded overflow-hidden max-w-4xl mx-auto my-6 p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products here..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FAF8F5] border-b border-[#DDD6C8]">
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                const isOutOfStock = product.stock === 0;

                return (
                  <tr
                    key={product._id}
                    className={`border-b border-[#DDD6C8] ${
                      isOutOfStock
                        ? "hover:bg-[#FCD2D2]"
                        : "hover:bg-[#FAF8F5]"
                    }`}
                  >
                    <td className="p-4">{product.name}</td>
                    <td className="p-4">{product.category}</td>
                    <td className="p-4">{product.price}</td>

                    <td className="p-4">
                      {isOutOfStock ? (
                        <span className="text-red-600 font-semibold">
                          Out of Stock
                        </span>
                      ) : (
                        product.stock
                      )}
                    </td>

                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => UpdateStock(product)}
                        className="px-3 py-1 bg-green-400 text-white rounded hover:bg-[#0fac58]"
                      >
                        Update Stock
                      </button>

                      <button
                        onClick={() => handleDeleteClick(product)}
                        className="px-3 py-1 bg-red-400 text-white rounded hover:bg-[#0fac58]"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductTable;