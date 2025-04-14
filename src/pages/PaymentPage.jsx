// src/pages/PaymentPage.jsx
import { useParams, useNavigate } from "react-router-dom";

const products = [
  { id: 0, name: "Эспрессо", price: 100 },
  { id: 1, name: "Капучино", price: 150 },
  { id: 2, name: "Латте", price: 180 },
];

export default function PaymentPage() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === Number(productId));

  if (!product) return <p>Напиток не найден</p>;

  return (
    <div className="container">
      <h1>Оплата напитка: {product.name}</h1>
      <p>Сумма: <strong>{product.price} ₽</strong></p>
  
      <button onClick={() => navigate(`/payment/${product.id}/cash`)} style={{ marginRight: 20 }}>
        Оплатить наличными
      </button>
      <button onClick={() => navigate(`/payment/${product.id}/card`)}>
        Оплатить картой
      </button>
    </div>
  );  
}
