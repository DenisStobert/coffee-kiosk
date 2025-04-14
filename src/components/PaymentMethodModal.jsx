import './PaymentMethodModal.css';

export default function PaymentMethodModal({ onClose, onSelect }) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content payment-modal" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>✕</button>
          <h2 className="modal-title">Выберите способ оплаты</h2>
          <div className="payment-button-row">
            <button className="pay-method-square" onClick={() => onSelect("card")}>
              <span className="pay-icon">💳</span>
              <span>Банковская карта</span>
            </button>
            <button className="pay-method-square" onClick={() => onSelect("cash")}>
              <span className="pay-icon">💵</span>
              <span>Наличные</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
  