import React, { useEffect } from "react";
import { useCart } from "../api/useCart";
import LoginApi from "../api/LoginApi";
import LoginModal from "../components/auth/LoginModal";
import CategorySection from "../components/CategorySection";

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

  useEffect(() => {
    const forSet = JSON.parse(localStorage.getItem("loginUser"));
    if (forSet) {
      setLoginuser(forSet);
    }
  }, []);

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        <main className="w-full lg:w-2/3">
          {/* ✅ 분리된 CategorySection 컴포넌트를 사용하고 props를 전달합니다. */}
          <CategorySection
            title="🍿 음식"
            type="food"
            productData={productData}
            checkLogin={checkLogin}
            handleAddToCart={handleAddToCart}
          />
          <CategorySection
            title="🥤 음료"
            type="drink"
            productData={productData}
            checkLogin={checkLogin}
            handleAddToCart={handleAddToCart}
          />
          <CategorySection
            title="🎬 굿즈"
            type="goods"
            productData={productData}
            checkLogin={checkLogin}
            handleAddToCart={handleAddToCart}
          />
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

                  <div className="mt-6 pt-4 border-t border-slate-700">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-medium text-slate-300">
                        총 금액
                      </span>
                      <span className="text-2xl font-bold text-amber-400">
                        {total}원
                      </span>
                    </div>
                    <button
                      onClick={handlePurchase}
                      className="w-full p-3 bg-amber-400 text-slate-900 font-bold text-lg rounded-lg transition-colors duration-200 hover:bg-amber-300 shadow-lg hover:shadow-amber-400/30"
                    >
                      결제하러 가기
                    </button>
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
