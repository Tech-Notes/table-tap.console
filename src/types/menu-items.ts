export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  business_id: number;
  photo_id: number;
  category: string;
  category_id: number;
}

export interface MenuItemListResponse {
  menu_items: MenuItem[];
}
