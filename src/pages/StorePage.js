import React, { useEffect } from "react";
import { useCart } from "../api/useCart";
import LoginApi from "../api/LoginApi";
import LoginModal from "../components/auth/LoginModal";

const StorePage = () => {
  const { checkLogin, modalOpen, toggleModal, setLoginuser } = LoginApi();
  const {
    cart,
    productData,
    handleAddToCart,
    handleDecrease,
    handleRemove,
    total,
    handlePurchase,
  } = useCart();
  // const fmt = (n) => n.toLocaleString("ko-KR");

  useEffect(() => {
    const forSet = JSON.parse(localStorage.getItem("loginUser"));
    if (forSet) {
      setLoginuser(forSet);
    }
  }, []);

  const CategorySection = ({ title, type }) => (
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

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        <main className="w-full lg:w-2/3">
          <CategorySection title="🍿 음식" type="food" />
          <CategorySection title="🥤 음료" type="drink" />
          <CategorySection title="🎬 굿즈" type="goods" />
        </main>

        <aside className="w-full lg:w-1/3">
          <div className="sticky top-24">
            <div className="bg-slate-800 rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-4 border-b border-slate-700 pb-3">
                장바구니
              </h3>
              {cart.length === 0 ? (
                <div className="text-slate-400 py-4">담긴 상품이 없습니다.</div>
              ) : (
                <>
                  <ul className="list-none p-0 m-0 max-h-[50vh] overflow-y-auto pr-2 flex flex-col gap-3">
                    {cart.map(({ id, name, price, quantity }) => (
                      <li
                        key={id}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <div className="font-semibold text-base">{name}</div>
                          <div className="text-sm text-slate-400">
                            {price}원 × {quantity}개
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            className="py-0.5 px-2 rounded bg-slate-700 border-none text-white cursor-pointer hover:bg-slate-600"
                            onClick={() => handleDecrease(id)}
                          >
                            −
                          </button>
                          <button
                            className="py-0.5 px-2 rounded bg-slate-700 border-none text-white cursor-pointer hover:bg-slate-600"
                            onClick={() => handleAddToCart(id)}
                          >
                            ＋
                          </button>
                          <button
                            className="text-xs py-0.5 px-2 rounded bg-red-900/50 text-red-300 ml-1 border-none cursor-pointer hover:bg-red-800"
                            onClick={() => handleRemove(id)}
                          >
                            ✕
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-4 border-t border-slate-700 text-right text-xl font-bold">
                    <button onClick={() => handlePurchase()}>
                      결제하러 가기
                    </button>
                    총 금액:{" "}
                    <span className="text-amber-400">{total}원</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </aside>
      </div>
      <LoginModal modal={modalOpen} r={toggleModal} />
    </div>
  );
};

export default StorePage;
