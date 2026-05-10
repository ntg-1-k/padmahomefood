import type { MenuCategory, MenuItem } from "../types/menu";

export const MENU_CATEGORIES: MenuCategory[] = [
  "Breakfast",
  "South Indian",
  "Rice",
  "Snack",
  "Dinner",
];

export const MENU_ITEMS: MenuItem[] = [
  // Rice
  {
    id: "rice-1",
    name: "Lemon Rice",
    description:
      "Tangy lemon rice tempered with mustard, curry leaves & turmeric. A South Indian classic.",
    price: 60,
    category: "Rice",
    imageUrl:
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&q=80",
    isVeg: true,
  },
  {
    id: "rice-2",
    name: "Mango Lemon Rice",
    description:
      "Zesty lemon rice elevated with fresh raw mango. Sweet, sour, and utterly satisfying.",
    price: 69,
    category: "Rice",
    imageUrl:
      "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&q=80",
    isVeg: true,
  },
  // South Indian
  {
    id: "si-1",
    name: "Idli with Chutney",
    description:
      "4 soft, pillowy steamed idlis served with fresh coconut chutney & sambar.",
    price: 50,
    category: "South Indian",
    imageUrl:
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=80",
    isVeg: true,
    isBestseller: true,
  },
  {
    id: "si-2",
    name: "Fish Curry",
    description:
      "Traditional Andhra-style fish curry slow-cooked with aromatic spices & tamarind.",
    price: 89,
    category: "South Indian",
    imageUrl:
      "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&q=80",
    isVeg: false,
    isBestseller: true,
  },
  // Snacks
  {
    id: "snack-1",
    name: "Bonda",
    description:
      "Crispy fried potato bonda with spiced masala filling. Perfect evening snack.",
    price: 49,
    category: "Snack",
    imageUrl:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80",
    isVeg: true,
  },
  {
    id: "snack-2",
    name: "Ragi Sangati with Fish Curry",
    description:
      "Traditional finger millet balls paired with our signature fish curry. Hearty & wholesome.",
    price: 220,
    category: "Snack",
    imageUrl:
      "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&q=80",
    isVeg: false,
    isBestseller: true,
  },
  {
    id: "snack-3",
    name: "Chicken Fry",
    description:
      "250g of perfectly spiced, golden-fried chicken with aromatic South Indian masala.",
    price: 199,
    category: "Snack",
    imageUrl:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c3?w=600&q=80",
    isVeg: false,
    isBestseller: true,
  },
  {
    id: "snack-4",
    name: "Fish Curry (Snack)",
    description:
      "A smaller serving of our beloved Andhra fish curry, perfect as a side or snack.",
    price: 89,
    category: "Snack",
    imageUrl:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
    isVeg: false,
  },
  // Breakfast
  {
    id: "bfast-1",
    name: "Karam Dosa",
    description:
      "Crispy thin dosa with fiery red chutney spread. A spice lover's delight.",
    price: 49,
    category: "Breakfast",
    imageUrl:
      "https://images.unsplash.com/photo-1630409351241-e0d0b0b2b4d8?w=600&q=80",
    isVeg: true,
    isBestseller: true,
  },
  {
    id: "bfast-2",
    name: "Poori",
    description:
      "Fluffy deep-fried whole wheat bread served with spiced potato masala.",
    price: 49,
    category: "Breakfast",
    imageUrl:
      "https://images.unsplash.com/photo-1606491048802-8342506d6471?w=600&q=80",
    isVeg: true,
  },
  {
    id: "bfast-3",
    name: "Onion Dosa",
    description:
      "Golden crispy dosa topped with caramelized onions. Simple perfection.",
    price: 49,
    category: "Breakfast",
    imageUrl:
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=80",
    isVeg: true,
  },
  {
    id: "bfast-4",
    name: "Ragi Dosa",
    description:
      "Nutritious finger millet dosa, crispy and packed with health benefits.",
    price: 49,
    category: "Breakfast",
    imageUrl:
      "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&q=80",
    isVeg: true,
  },
  {
    id: "bfast-5",
    name: "Egg Dosa",
    description:
      "Crispy dosa with a freshly cracked egg spread over it. Protein-rich morning fuel.",
    price: 69,
    category: "Breakfast",
    imageUrl:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80",
    isVeg: false,
  },
  {
    id: "bfast-6",
    name: "Ragi Sangati & Fish Curry",
    description:
      "Traditional ragi balls with our signature fish curry — comfort food at its finest.",
    price: 220,
    category: "Breakfast",
    imageUrl:
      "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&q=80",
    isVeg: false,
  },
  {
    id: "bfast-7",
    name: "Uttapam",
    description:
      "Thick, soft rice pancake topped with onions, tomatoes and fresh coriander.",
    price: 79,
    category: "Breakfast",
    imageUrl:
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=80",
    isVeg: true,
  },
  {
    id: "bfast-8",
    name: "Plain Dosa",
    description:
      "Classic thin crispy dosa served with coconut chutney and piping hot sambar.",
    price: 39,
    category: "Breakfast",
    imageUrl:
      "https://images.unsplash.com/photo-1630409351241-e0d0b0b2b4d8?w=600&q=80",
    isVeg: true,
  },
  {
    id: "bfast-9",
    name: "Chapathi",
    description:
      "Soft whole wheat flatbread, freshly made and served warm. Simple and satisfying.",
    price: 25,
    category: "Breakfast",
    imageUrl:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80",
    isVeg: true,
  },
  {
    id: "bfast-10",
    name: "Omelette",
    description:
      "Fluffy egg omelette seasoned with herbs and a touch of green chilli.",
    price: 20,
    category: "Breakfast",
    imageUrl:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80",
    isVeg: false,
  },
  // Dinner
  {
    id: "din-1",
    name: "Chicken Curry",
    description:
      "Rich, aromatic Andhra-style chicken curry slow-cooked to tender perfection.",
    price: 120,
    category: "Dinner",
    imageUrl:
      "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&q=80",
    isVeg: false,
    isBestseller: true,
  },
  {
    id: "din-2",
    name: "Egg Curry",
    description:
      "2 boiled eggs in a tangy, spiced gravy. Comforting and full of flavour.",
    price: 80,
    category: "Dinner",
    imageUrl:
      "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=600&q=80",
    isVeg: false,
  },
  {
    id: "din-3",
    name: "Dal Curry",
    description:
      "Home-style yellow lentil curry tempered with mustard and curry leaves.",
    price: 49,
    category: "Dinner",
    imageUrl:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80",
    isVeg: true,
  },
  {
    id: "din-4",
    name: "Curd Rice",
    description:
      "500g cooling curd rice tempered with mustard, cumin & green chilli. Soul food.",
    price: 120,
    category: "Dinner",
    imageUrl:
      "https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?w=600&q=80",
    isVeg: true,
  },
  {
    id: "din-5",
    name: "Ragi Sangati with Fish Curry",
    description:
      "Traditional ragi balls paired with our star fish curry. Authentic Andhra dinner.",
    price: 220,
    category: "Dinner",
    imageUrl:
      "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&q=80",
    isVeg: false,
  },
  {
    id: "din-6",
    name: "Chicken Fry",
    description:
      "250g crispy fried chicken with signature house spice blend. Unmissable.",
    price: 199,
    category: "Dinner",
    imageUrl:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c3?w=600&q=80",
    isVeg: false,
    isBestseller: true,
  },
  {
    id: "din-7",
    name: "Fish Curry",
    description:
      "Our flagship tamarind-based Andhra fish curry. Bold, tangy, deeply satisfying.",
    price: 89,
    category: "Dinner",
    imageUrl:
      "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&q=80",
    isVeg: false,
  },
];
