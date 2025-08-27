import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/data/types/screen";

const selectProductPage = (state: AppRootState) => state.productPage;

export const retriveRestaurant = createSelector(
  selectProductPage,
  (ProductsPage) => ProductsPage.restaurant
);

export const retriveChosenProduct = createSelector(
  selectProductPage,
  (ProductsPage) => ProductsPage.chosenProduct
);

export const retriveProducts = createSelector(
  selectProductPage,
  (ProductsPage) => ProductsPage.products
);