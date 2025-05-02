export type HeaderRoutingCategoryItem = {
  id: string;
  name: string;
  route: string;
};

export type HeaderRoutingCategory = {
  id: string;
  name: string;
  items: HeaderRoutingCategoryItem[];
};
