import espresso from "../assets/espresso.png";
import americano from "../assets/americano.png";
import latte from "../assets/latte.png";
import cappuccino from "../assets/cappuccino.png";
import macchiato from "../assets/macchiato.png";

export const products = [
  {
    id: 0,
    name: "Эспрессо",
    baseImage: espresso,
    sizes: [
      { ml: 200, price: 79 },
      { ml: 300, price: 99 },
      { ml: 400, price: 119 },
    ],
  },
  {
    id: 1,
    name: "Эспрессо 2x",
    baseImage: espresso,
    sizes: [
      { ml: 200, price: 89 },
      { ml: 300, price: 109 },
      { ml: 400, price: 129 },
    ],
  },
  {
    id: 2,
    name: "Американо",
    baseImage: americano,
    sizes: [
      { ml: 200, price: 99 },
      { ml: 300, price: 119 },
      { ml: 400, price: 139 },
    ],
  },
  {
    id: 3,
    name: "Латте",
    baseImage: latte,
    sizes: [
      { ml: 200, price: 119 },
      { ml: 300, price: 139 },
      { ml: 400, price: 159 },
    ],
  },
  {
    id: 4,
    name: "Капучино",
    baseImage: cappuccino,
    sizes: [
      { ml: 200, price: 109 },
      { ml: 300, price: 129 },
      { ml: 400, price: 149 },
    ],
  },
  {
    id: 5,
    name: "Макиато",
    baseImage: macchiato,
    sizes: [
      { ml: 200, price: 109 },
      { ml: 300, price: 129 },
      { ml: 400, price: 149 },
    ],
  },
];
