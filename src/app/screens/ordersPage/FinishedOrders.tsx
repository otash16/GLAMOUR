import React from "react";
import { Container, Stack, Box, Button } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retriveFinishedOrders } from "./selector";
import { Order, OrderItem } from "../../../lib/data/types/orders";
import { Product } from "../../../lib/data/types/product";
import { serverApi } from "../../../lib/config";

/** REDUX  SELECTOR */
const finishedOrdersRetriever = createSelector(
  retriveFinishedOrders,
  (finishedOrders) => ({ finishedOrders })
);

export default function FinishedOrders() {
  const { finishedOrders } = useSelector(finishedOrdersRetriever);
  return (
    <TabPanel className={"table-panel"} value={"3"}>
      <Stack>
        {finishedOrders?.map((order: Order) => {
          return (
            <Box key={order._id} className={"order-main-box"}>
              <Box className={"order-box-scroll"}>
                {order?.orderItems?.map((item: OrderItem) => {
                  const product: Product = order.productData.filter(
                    (ele: Product) => item.productId === ele._id
                  )[0];
                  const imagePath = `${serverApi}/${product?.productImages[0]}`;
                  return (
                    <Box key={item._id} className={"orders-name-price"}>
                      <img src={imagePath} className={"order-dish-img"} />
                      <p className={"title-dish"}>{product?.productName}</p>
                      <Box className={"price-box"}>
                        <p>${item.itemPrice}</p>
                        <img
                          style={{ marginLeft: "5px", marginRight: "5px" }}
                          src={"/icons/close.svg"}
                          alt=""
                        />
                        <p>{item.itemQuantity}</p>
                        <img src={"/icons/pause.svg"} alt="" />
                        <p style={{ marginLeft: "15px" }}>
                          ${item.itemQuantity * item.itemPrice}
                        </p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box className={"total-price-box"}>
                <Box className={"box-total"}>
                  <p className={"box-total-text"}>Produc Price</p>
                  <p className={"box-total-number"}>
                    ${order.orderTotal - order.orderDelivery}
                  </p>
                  <img
                    src={"/icons/plus.svg"}
                    style={{ marginLeft: "20px", marginRight: "20px" }}
                  />
                  <p className={"box-total-text"}>Delivery Cost</p>
                  <p className={"box-total-number"}>${order.orderDelivery}</p>
                  <img
                    src={"/icons/pause.svg"}
                    style={{ marginLeft: "20px", marginRight: "20px" }}
                  />
                  <p className={"box-total-text"}>Total</p>
                  <p className={"box-total-number"}>${order.orderTotal}</p>
                </Box>
              </Box>
            </Box>
          );
        })}

        {!finishedOrders ||
          (finishedOrders.length === 0 && (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
            >
              <img
                src={"/icons/noimage-list.svg"}
                alt=""
                style={{ width: 300, height: 300 }}
              />
            </Box>
          ))}
      </Stack>
    </TabPanel>
  );
}