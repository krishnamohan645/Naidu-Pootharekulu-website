import classicPootharekulu from "@/assets/pootharekulu-classic.jpg";
import dryFruitPootharekulu from "@/assets/dry-fruit-pootharekulu.jpg";
import gheePootharekulu from "@/assets/ghee-pootharekulu.jpg";
import jaggeryPootharekulu from "@/assets/jaggery-pootharekulu.jpg";
import logoImage from "@/assets/naidu-logo.png";

export { logoImage };

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  pack: string;
  badge: string;
  image: string;
  imageAlt: string;
  width: number;
  height: number;
};

export const products: Product[] = [
  {
    id: "classic-pootharekulu",
    name: "Classic Pootharekulu",
    description: "Paper-thin rice sheets layered with sugar, ghee, and traditional sweetness.",
    price: 349,
    pack: "10 pieces",
    badge: "House favourite",
    image: classicPootharekulu,
    imageAlt: "Classic Pootharekulu sweet rolls on an Indian brass plate",
    width: 1024,
    height: 1024,
  },
  {
    id: "dry-fruit-pootharekulu",
    name: "Dry Fruit Pootharekulu",
    description: "Packed with cashew, almond, pistachio, and rich jaggery crumble.",
    price: 499,
    pack: "10 pieces",
    badge: "Premium",
    image: dryFruitPootharekulu,
    imageAlt: "Dry fruit Pootharekulu with nuts on a maroon plate",
    width: 1024,
    height: 1024,
  },
  {
    id: "jaggery-pootharekulu",
    name: "Bellam Pootharekulu",
    description: "Golden jaggery filling wrapped in delicate handmade rice paper layers.",
    price: 429,
    pack: "10 pieces",
    badge: "Traditional",
    image: jaggeryPootharekulu,
    imageAlt: "Jaggery Pootharekulu rolls with ghee and rice sheets",
    width: 1024,
    height: 1024,
  },
  {
    id: "ghee-pootharekulu",
    name: "Ghee Sugar Pootharekulu",
    description: "Soft ghee aroma, powdered sugar, and a crisp melt-in-mouth finish.",
    price: 399,
    pack: "10 pieces",
    badge: "Best seller",
    image: gheePootharekulu,
    imageAlt: "Ghee sugar Pootharekulu on a brass plate with nuts",
    width: 1024,
    height: 1024,
  },
];

export const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;

export const contactDetails = {
  phone: "+91 98765 43210",
  whatsapp: "+91 72072 24597",
  email: "orders@naidupootharekulu.com",
  address: "D.No. 12-4-19, Main Bazaar Road, Atreyapuram, Andhra Pradesh 533235",
};