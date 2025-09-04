import React, { useEffect } from "react";
import { useCart } from "../api/useCart";
import '../css/StorePage.css'; // CSS 파일 import
import LoginApi from "../api/LoginApi";
import LoginModal from "../components/auth/LoginModal";

const StorePage = () => {
  const {checkLogin,modalOpen,toggleModal,setLoginuser,navigate}=LoginApi();
  const { cart, productData, handleAddToCart, handleDecrease, handleRemove, total } = useCart();
  const fmt = (n) => n.toLocaleString("ko-KR");
  useEffect(() => {
     const forSet = JSON.parse(localStorage.getItem("loginUser"));
     if (forSet) {
       setLoginuser(forSet);
     }
   }, []);
  const CategorySection = ({ title, type }) => (
    <section className="category-section">
      <h3 className="category-title">{title}</h3>
      <div className="product-grid">
        {productData
          .filter((i) => i.type === type)
          .map((i) => (
            <div key={i.id} className="product-card">
              <img
                src={i.image || "https://via.placeholder.com/300x200.png?text=No+Image"}
                alt={i.name}
                className="product-image"
              />
              <div className="product-card-body">
                <h4 className="product-name">{i.name}</h4>
                <p className="product-description">{i.description}</p>
                <p className="product-price">{fmt(i.price)}원</p>
              </div>
              <button
                className="add-to-cart-button"
                onClick={() => checkLogin(()=>handleAddToCart(i.id))}
              >
                장바구니 담기
              </button>
            </div>
          ))}
      </div>
    </section>
  );

  return (
    <div className="store-page-container">
      <div className="store-layout">
        
        <main className="product-list-area">
          <CategorySection title="🍿 음식" type="food" />
          <CategorySection title="🥤 음료" type="drink" />
          <CategorySection title="🎬 굿즈" type="goods" />
        </main>

        <aside className="cart-area">
          <div className="cart-sticky-wrapper">
            <div className="cart-container">
              <h3 className="cart-title">장바구니</h3>
              {cart.length === 0 ? (
                <div className="cart-empty-message">담긴 상품이 없습니다.</div>
              ) : (
                <>
                  <ul className="cart-item-list">
                    {cart.map(({ id, name, price, quantity }) => (
                      <li key={id} className="cart-item">
                        <div>
                          <div className="cart-item-name">{name}</div>
                          <div className="cart-item-details">{fmt(price)}원 × {quantity}개</div>
                        </div>
                        <div className="cart-item-controls">
                          <button className="quantity-button" onClick={() => handleDecrease(id)}>−</button>
                          <button className="quantity-button" onClick={() => handleAddToCart(id)}>＋</button>
                          <button className="remove-item-button" onClick={() => handleRemove(id)}>✕</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="cart-total">
                    총 금액: <span className="total-price-amount">{fmt(total)}원</span>
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