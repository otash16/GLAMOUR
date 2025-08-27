import React, { useEffect } from "react";
import Events from "./Events";
import ActiveUsers from "./ActiveUsers";
import Advertisement from "./Advertisement";
import NewDishes from "./NewDishes";
import PopularDishes from "./PopularDishes";
import Statistics from "./Statistics";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import { Product } from "../../../lib/data/types/product";
import ProductService from "../../services/ProductService"
import { ProductCollection } from "../../../lib/enums/product.enum";
import "../../../css/home.css";
import dotenv from "dotenv";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/data/types/member";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

export default function HomePage() {
  const { setPopularDishes, setNewDishes, setTopUsers } = actionDispatch(
    useDispatch()
  );

  // Select: Store => Data
  console.log(process.env.REACT_APP_API_URL);

  useEffect(() => {
    // FETCH DATA FROM BACKEND
    const product = new ProductService();
    const member = new MemberService();

    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        // productCollection: ProductCollection.DISH,
      })
      .then((data) => {
        // console.log("data:", data);
        setPopularDishes(data as unknown as Product[]);
      })
      .catch((err) => console.log(err));

    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
        // productCollection: ProductCollection.DISH,
      })
      .then((data) =>
        // console.log("data:", data);
        setNewDishes(data as unknown as Product[])
      )
      .catch((err) => console.log(err));

    member
      .getTopUsers()
      .then((data) => setTopUsers(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={"homepage"}>
      <Statistics />
      <PopularDishes />
      <NewDishes />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}

console.log(process.env.REACT_APP_API_URL);