import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DrinkModal from "../components/DrinkModal";
import Header from "../components/Header";
import { products } from "../data/products"; // ✅ Импортируем данные
import "./DrinkSelectionPage.css";

export default function DrinkSelectionPage() {
  const [selectedDrink, setSelectedDrink] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (drink) => setSelectedDrink(drink);
  const handleClose = () => setSelectedDrink(null);

  const handlePay = (method) => {
    if (selectedDrink) {
      navigate(`/payment/${selectedDrink.id}/${method}`);
    }
  };

  return (
    <>
      <Header />
      <div className="drink-page">
        <div className="category-title-wrapper">
          <h2 className="category-title">Кофе</h2>
        </div>
        <div className="drink-grid">
          {products.map((drink) => (
            <DrinkCard
              key={drink.id}
              name={drink.name}
              image={drink.baseImage}
              price={drink.sizes.find((s) => s.ml === 300)?.price ?? drink.sizes[0].price}
              onClick={() => handleSelect(drink)}
            />
          ))}
        </div>
      </div>
      <DrinkModal drink={selectedDrink} onClose={handleClose} onPay={handlePay} />
    </>
  );
}

function DrinkCard({ name, image, price, onClick }) {
  return (
    <div className="drink-card" onClick={onClick}>
      <img src={image} alt={name} />
      <div className="drink-name">{name}</div>
      <div className="drink-price">
        от <span className="main-price">{price}₽</span>
      </div>
    </div>
  );
}
