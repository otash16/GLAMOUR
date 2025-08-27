import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/data/types/screen";

const selectOrdersPage = (state: AppRootState) => state.ordersPage;
export const retrivePausedOrders = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.pausedOrders
);

export const retriveProcessOrders = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.processOrders
);

export const retriveFinishedOrders = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.finishedOrders
);