export type MenuCategory =
  | "All"
  | "Rice"
  | "South Indian"
  | "Snack"
  | "Breakfast"
  | "Dinner";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Exclude<MenuCategory, "All">;
  imageUrl: string;
  isVeg: boolean;
  isBestseller?: boolean;
}
