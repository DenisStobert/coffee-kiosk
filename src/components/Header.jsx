// src/components/Header.jsx
import vector from "../assets/vector2.png";

export default function Header() {
  return (
    <div className="header">
      <img src={vector} alt="bg vector" className="header-vector" />
      <h1>Выбор напитка</h1>
    </div>
  );
}
