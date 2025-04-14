import { useState } from "react";
import cupIcon from "../assets/drink-icon.png";
import PaymentMethodModal from "./PaymentMethodModal";
import './DrinkModal.css';

export default function DrinkModal({ drink, onClose, onPay }) {
  const defaultSize = drink?.sizes?.[0]?.ml.toString() || "300";
  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);

  if (!drink) return null;

  const selectedPrice = drink.sizes.find(s => s.ml.toString() === selectedSize)?.price ?? 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {/* Фото напитка */}
        <img src={drink.baseImage} alt={drink.name} className="modal-image" />

        {/* Название */}
        <h2 className="modal-title">{drink.name}</h2>

        {/* Размеры */}
        <div className="size-options">
          {drink.sizes.map(({ ml }) => (
            <div
              key={ml}
              className={`size-option ${selectedSize === ml.toString() ? "active" : ""}`}
              onClick={() => setSelectedSize(ml.toString())}
            >
              <img src={cupIcon} alt="cup" className="size-icon" />
              <span>{ml} мл</span>
            </div>
          ))}
        </div>

        {/* Кнопка оплаты */}
        <button className="pay-button" onClick={() => setShowPaymentMethod(true)}>
          <span className="pay-text">Оплатить</span>
          <span className="pay-price">{selectedPrice}₽</span>
        </button>
      </div>

      {/* Выбор метода оплаты */}
      {showPaymentMethod && (
        <PaymentMethodModal
          onClose={() => setShowPaymentMethod(false)}
          onSelect={(method) => {
            setShowPaymentMethod(false);
            onPay(method, selectedSize); // Можно передать размер, если нужно
          }}
        />
      )}
    </div>
  );
}
