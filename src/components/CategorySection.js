import React from "react";

const CategorySection = ({ title, type, productData, checkLogin, handleAddToCart }) => {
  return (
    <section className="mb-16">
      <h3 className="text-3xl font-bold text-amber-400 border-b-2 border-slate-700 pb-4 mb-8">
        {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {productData
          .filter((i) => i.type === type)
          .map((i) => (
            <div
              key={i.id}
              className="bg-slate-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 flex flex-col"
            >
              <img
                src={
                  i.image ||
                  "https://via.placeholder.com/300x200.png?text=No+Image"
                }
                alt={i.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 flex flex-col flex-grow">
                <h4 className="text-lg font-bold text-white mb-2 truncate">
                  {i.name}
                </h4>
                <p className="text-sm text-slate-400 mb-4 flex-grow">
                  {i.description}
                </p>
                <p className="text-xl font-semibold text-amber-400 text-right">
                  {i.price}원
                </p>
              </div>
              <button
                className="w-full p-3 bg-amber-400 text-slate-900 font-semibold cursor-pointer transition-colors duration-200 hover:bg-amber-300"
                onClick={() => checkLogin(() => handleAddToCart(i.id))}
              >
                장바구니 담기
              </button>
            </div>
          ))}
      </div>
    </section>
  );
};

export default CategorySection;
