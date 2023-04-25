import { createSelector } from "reselect";

export const listOrderState$ = (state) => state.orderManage.listOrder;

export const filterStatusState$ = (state) => state.orderManage.filterStatus;
// export const orderRemainingSelector = listOrderState$.filter((order) => {
//   return order.status.includes(filterStatusState$);
// });
export const orderRemainingSelector = createSelector(
  listOrderState$,
  filterStatusState$,
  (listOrder, status) => {
    return listOrder.filter((order) => {
      return order.status?.toString().includes(status);
    });
  }
);
