// import React, { ChangeEvent, useEffect, useState } from "react";
// import { Box, Container, Stack, Button, Typography } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
// import Badge from "@mui/material/Badge";
// import Pagination from "@mui/material/Pagination";
// import PaginationItem from "@mui/material/PaginationItem";
// import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import { useDispatch, useSelector } from "react-redux";
// import { Dispatch } from "@reduxjs/toolkit";
// import { setProducts } from "./slice";
// import { createSelector } from "reselect";
// import { Product, ProductInquery } from "../../../lib/data/types/product";
// import { retriveProducts } from "./selector";
// import ProductService from "../../services/ProductService";
// import { useAppSelector } from "../../hooks";
// import { serverApi } from "../../../lib/config";
// import { ProductCollection } from "../../../lib/enums/product.enum";
// import { useHistory } from "react-router-dom";

// /** REDUX SLICE & SELECTOR */
// const actionDispatch = (dispatch: Dispatch) => ({
//   setProducts: (data: Product[]) => dispatch(setProducts(data)),
// });

// const ProductsRetriever = createSelector(retriveProducts, (products) => ({
//   products,
// }));

// export default function Products() {
//   const { setProducts } = actionDispatch(useDispatch());
//   const { products } = useSelector(ProductsRetriever);
//   const [productSearch, setProductSearch] = useState<ProductInquery>({
//     page: 1,
//     limit: 8,
//     order: "createdAt",
//     // productCollection = ProductCollection.DISH
//     search: "",
//   });

//   const [searchText, setSearchText] = useState<string>("");
//   const history = useHistory();

//   useEffect(() => {
//     const product = new ProductService();
//     product
//       .getProducts(productSearch)
//       .then((data) => setProducts(data as unknown as Product[]))
//       .catch((err) => console.log(err));
//   }, [productSearch]);

//   useEffect(() => {
//     if (searchText === "") {
//       productSearch.search = "";
//       setProductSearch({ ...productSearch });
//     }
//   }, [searchText]);

//   /** HANDLERS */

//   const searchCollectionHandler = (collection: ProductCollection) => {
//     productSearch.page = 1;
//     productSearch.productCollection = collection;
//     setProductSearch({ ...productSearch });
//   };

//   const searchOrderHandler = (order: string) => {
//     productSearch.page = 1;
//     productSearch.order = order;
//     setProductSearch({ ...productSearch });
//   };

//   const searchProductHandler = () => {
//     productSearch.search = searchText;
//     setProductSearch({ ...productSearch });
//   };

//   const paginationHandler = (e: ChangeEvent<any>, value: number) => {
//     productSearch.page = value;
//     setProductSearch({ ...productSearch });
//   };

//   const chooseDishHandler = (id: string) => {
//     history.push(`/products/${id}`);
//   };

//   return (
//     <div className={"products"}>
//       <Container>
//         <Stack flexDirection={"column"} alignItems={"center"}>
//           <Stack className={"avatar-big-box"}>
//             <Stack className={"avatar-wrapper"}>
//               <Box className={"category-title"}>Burak Restaurant</Box>
//               <Box className={"search-wrapper"}>
//                 <input
//                   className={"search-input"}
//                   type="search"
//                   id="product-search"
//                   name="searched-product"
//                   placeholder="Type here"
//                   value={searchText}
//                   onChange={(e) => {
//                     setSearchText(e.target.value);
//                   }}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") searchProductHandler();
//                   }}
//                 />
//                 <Button
//                   className={"search-button"}
//                   variant="contained"
//                   onClick={searchProductHandler}
//                 >
//                   Search
//                   <SearchIcon className={"search-icon"} />
//                 </Button>
//               </Box>
//             </Stack>
//           </Stack>
//           <Stack className={"dishes-filter-section"}>
//             <Stack className={"dishes-filter-box"}>
//               <Button
//                 variant={"contained"}
//                 color={
//                   productSearch.order === "createdAt" ? "primary" : "secondary"
//                 }
//                 className={"order"}
//                 onClick={() => searchOrderHandler("createdAt")}
//               >
//                 New
//               </Button>
//               <Button
//                 variant={"contained"}
//                 color={
//                   productSearch.order === "productPrice"
//                     ? "primary"
//                     : "secondary"
//                 }
//                 className={"order"}
//                 onClick={() => searchOrderHandler("productPrice")}
//               >
//                 Price
//               </Button>
//               <Button
//                 variant={"contained"}
//                 color={
//                   productSearch.order === "productViews"
//                     ? "primary"
//                     : "secondary"
//                 }
//                 className={"order"}
//                 onClick={() => searchOrderHandler("productViews")}
//               >
//                 Views
//               </Button>
//             </Stack>
//           </Stack>

//           <Stack className={"list-category-section"} flexDirection={"row"}>
//             <Stack className={"product-category"}>
//               <div className="category-main">
//                 <Button
//                   variant={"contained"}
//                   color={
//                     productSearch.productCollection === ProductCollection.OTHER
//                       ? "primary"
//                       : "secondary"
//                   }
//                   className={"order"}
//                   onClick={() =>
//                     searchCollectionHandler(ProductCollection.OTHER)
//                   }
//                 >
//                   <div>Other</div>
//                 </Button>
//                 <Button
//                   variant={"contained"}
//                   color={
//                     productSearch.productCollection ===
//                     ProductCollection.DESSERT
//                       ? "primary"
//                       : "secondary"
//                   }
//                   className={"order"}
//                   onClick={() =>
//                     searchCollectionHandler(ProductCollection.DESSERT)
//                   }
//                 >
//                   Dessert
//                 </Button>
//                 <Button
//                   variant={"contained"}
//                   color={
//                     productSearch.productCollection === ProductCollection.DRINK
//                       ? "primary"
//                       : "secondary"
//                   }
//                   className={"order"}
//                   onClick={() =>
//                     searchCollectionHandler(ProductCollection.DRINK)
//                   }
//                 >
//                   Drink
//                 </Button>
//                 <Button
//                   variant={"contained"}
//                   color={
//                     productSearch.productCollection === ProductCollection.SALAD
//                       ? "primary"
//                       : "secondary"
//                   }
//                   className={"order"}
//                   onClick={() =>
//                     searchCollectionHandler(ProductCollection.SALAD)
//                   }
//                 >
//                   Salad
//                 </Button>
//                 <Button
//                   variant={"contained"}
//                   color={
//                     productSearch.productCollection === ProductCollection.DISH
//                       ? "primary"
//                       : "secondary"
//                   }
//                   className={"order"}
//                   onClick={() =>
//                     searchCollectionHandler(ProductCollection.DISH)
//                   }
//                 >
//                   Dish
//                 </Button>
//               </div>
//             </Stack>
//             <Stack className={"product-wrapper"}>
//               {products.length !== 0 ? (
//                 products.map((product: Product) => {
//                   const imagePath = `${serverApi}/${product.productImages[0]}`;
//                   const sizeVolume =
//                     product.productCollection === ProductCollection.DRINK
//                       ? product.productVolume + " litre"
//                       : product.productSize + " size";
//                   return (
//                     <Stack
//                       key={product._id}
//                       className={"product-card"}
//                       onClick={() => chooseDishHandler(product._id)}
//                     >
//                       <Stack
//                         className={"product-img"}
//                         sx={{ backgroundImage: `url(${imagePath})` }}
//                       >
//                         <div className="product-sale">{sizeVolume}</div>
//                         <div className="view-wrapper">
//                           <Button className={"shop-btn"}>
//                             <img
//                               src={"/icons/shopping-cart.svg"}
//                               style={{ display: "flex" }}
//                               alt=""
//                             />
//                           </Button>
//                           <Button className={"view-btn"} sx={{ right: "36px" }}>
//                             <Badge
//                               badgeContent={product.productViews}
//                               color="secondary"
//                             >
//                               <RemoveRedEyeIcon
//                                 sx={{
//                                   color:
//                                     product.productViews === 0
//                                       ? "gray"
//                                       : "white",
//                                 }}
//                               />
//                             </Badge>
//                           </Button>
//                         </div>
//                       </Stack>

//                       <Box className={"product-descs"}>
//                         <span className={"product-title"}>
//                           {product.productName}
//                         </span>
//                         <div className="product-desc">
//                           <MonetizationOnIcon className={"dollar-icon"} />
//                           {product.productPrice}
//                         </div>
//                       </Box>
//                     </Stack>
//                   );
//                 })
//               ) : (
//                 <Box className="no-data">Products are not available!</Box>
//               )}
//             </Stack>
//           </Stack>
//         </Stack>
//         <Stack className={"pagination-wrapper"}>
//           <Pagination
//             count={
//               products.length !== 0
//                 ? productSearch.page + 1
//                 : productSearch.page
//             }
//             page={productSearch.page}
//             renderItem={(item) => (
//               <PaginationItem
//                 components={{
//                   previous: ArrowBackIcon,
//                   next: ArrowForwardIcon,
//                 }}
//                 {...item}
//                 color={"secondary"}
//               />
//             )}
//             onChange={paginationHandler}
//           />
//         </Stack>
//       </Container>

//       <div className="brands-logo">
//         <Container>
//           <Stack className={"brands-logo-categories"}>
//             <Stack className={"brands-logo-categories"}>
//               <Box className={"brands-logo-title"}>Our Family Brands</Box>
//             </Stack>
//             <Stack className={"members-wrapper"}>
//               <div className="brand-img-wrapper">
//                 <img className={"member-img"} src="/img/gurme.webp" alt="" />
//               </div>
//               <div className="brand-img-wrapper">
//                 <img className={"member-img"} src="/img/seafood.webp" alt="" />
//               </div>
//               <div className="brand-img-wrapper">
//                 <img className={"member-img"} src="/img/sweets.webp" alt="" />
//               </div>
//               <div className="brand-img-wrapper">
//                 <img className={"member-img"} src="/img/doner.webp" alt="" />
//               </div>
//             </Stack>
//           </Stack>
//         </Container>
//       </div>

//       <div className="address">
//         <Container>
//           <Stack className={"address-area"}>
//             <Box className={"title"}>Our address</Box>
//             <iframe
//               style={{ marginTop: "60x" }}
//               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.294937416325!2d55.278124775509866!3d25.193274331859396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6955cdc0a649%3A0xf08ece466df23124!2sCZN%20Burak%20Dubai!5e0!3m2!1sen!2skr!4v1721117848383!5m2!1sen!2skr"
//               height="500"
//               referrerPolicy="no-referrer-when-downgrade"
//             ></iframe>
//           </Stack>
//         </Container>
//       </div>
//     </div>
//   );
// }

import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Card, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { createSelector } from "reselect";
import { retriveProducts } from "./selector";
import { Product, ProductInquery } from "../../../lib/data/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/data/types/search";
//____________________________________________________________________________________________

/**   Slice  */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});
/**   Select */
const productsRetriever = createSelector(retriveProducts, (products) => ({
  products,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}
export default function Products(props: ProductsProps) {
  //_____________________________________________________________________________________________________________________________
  //____________________________________________Hooks____________________________________________
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquery>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.DISH,
    search: "",
  });
  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  /** _________________________________________useEffect_____________________________________*/
  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => {
        setProducts(data as unknown as Product[]);
      })
      .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, []);

  /** _________________________________________HANDLERS_____________________________________*/
  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;

    setProductSearch({ ...productSearch });
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;

    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;

    setProductSearch({ ...productSearch });
  };

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <div className={"products"}>
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className={"avatar-big-box"}>
            <Stack className="top-text">
              <Box className="title"> Glamour Restaurant</Box>
              <Box className="search-box">
                <input
                  className="search-input"
                  placeholder="Type here"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") searchProductHandler();
                  }}
                />
                <Button
                  className="search-button"
                  variant="contained"
                  onClick={searchProductHandler}
                >
                  Search
                  <SearchIcon />
                </Button>
              </Box>
            </Stack>
          </Stack>

          <Stack className={"dishes-filter-section"}>
            <Stack className={"dishes-filter-box"}>
              <Button
                variant={"contained"}
                color={
                  productSearch.order === "createdAt" ? "primary" : "secondary"
                }
                className={"order"}
                onClick={() => searchOrderHandler("createdAt")}
              >
                {" "}
                New{" "}
              </Button>
              <Button
                variant={"contained"}
                color={
                  productSearch.order === "productPrice"
                    ? "primary"
                    : "secondary"
                }
                className={"order"}
                onClick={() => searchOrderHandler("productPrice")}
              >
                {" "}
                Price{" "}
              </Button>
              <Button
                variant={"contained"}
                color={
                  productSearch.order === "productView"
                    ? "primary"
                    : "secondary"
                }
                className={"order"}
                onClick={() => searchOrderHandler("productView")}
              >
                {" "}
                Views{" "}
              </Button>
            </Stack>
          </Stack>

          <Stack className={"list-category-section"}>
            <Stack className={"product-category"}>
              <div className={"category-main"}>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.OTHER
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.OTHER)
                  }
                >
                  Other
                </Button>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection ===
                    ProductCollection.DESSERT
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DESSERT)
                  }
                >
                  Desert
                </Button>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.DRINK
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DRINK)
                  }
                >
                  Drink
                </Button>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.SALAD
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.SALAD)
                  }
                >
                  Salad
                </Button>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.DISH
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DISH)
                  }
                >
                  Dish
                </Button>
              </div>
            </Stack>

            <Stack className={"product-wrapper"}>
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume =
                    product.productCollection === ProductCollection.DRINK
                      ? product.productVolume + " liter"
                      : product.productSize + " size";
                  return (
                    <div className="product-card-wrapper">
                      <Stack
                        key={product._id}
                        className={"product-card"}
                        onClick={() => {
                          chooseDishHandler(product._id);
                        }}
                      >
                        <Stack
                          className={"product-img"}
                          sx={{ backgroundImage: `url(${imagePath})` }}
                        >
                          <div className={"product-sale"}> {sizeVolume} </div>
                          <Button
                            className={"shop-btn"}
                            onClick={(e) => {
                              e.stopPropagation();
                              onAdd({
                                _id: product._id,
                                quantity: 1,
                                name: product.productName,
                                price: product.productPrice,
                                image: product.productImages[0],
                              });
                            }}
                          >
                            <img src="/icons/shopping-cart.svg" alt="noImage" />
                          </Button>
                          <Button className={"view-btn"}>
                            <Badge
                              badgeContent={product.productViews}
                              color="secondary"
                            >
                              <RemoveRedEyeIcon
                                sx={{
                                  color:
                                    product.productViews === 0
                                      ? "gray"
                                      : "white ",
                                }}
                              />
                            </Badge>
                          </Button>
                        </Stack>
                        <Box className={"product-desc"}>
                          <span className={"product-title"}>
                            {product.productName}
                          </span>
                          <div className={"product-desc"}>
                            <MonetizationOnIcon />
                            {product.productPrice}
                          </div>
                        </Box>
                      </Stack>
                    </div>
                  );
                })
              ) : (
                <Box className={"no-data"}> Products are not available</Box>
              )}
            </Stack>
          </Stack>

          <Stack className={"pagination-section"}>
            <Pagination
              count={
                products.length !== 0
                  ? productSearch.page + 1
                  : productSearch.page
              }
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color={"secondary"}
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>

      <div className={"brands-logo"}>
        <Container className={"family-brands"}>
          <Box className={"category-title"}> Our Family Brands </Box>
          <Stack className={"brand-list"}>
            <Box className={"review-box"}>
              <img src={"img/gurme.webp"} alt="noImage" />
            </Box>
            <Box className={"review-box"}>
              <img src={"img/seafood.webp"} alt="noImage" />
            </Box>
            <Box className={"review-box"}>
              <img src={"img/sweets.webp"} alt="noImage" style={{}} />
            </Box>
            <Box className={"review-box"}>
              <img src={"img/doner.webp"} alt="noImage" />
            </Box>
          </Stack>
        </Container>
      </div>

      <div className={"address"}>
        <Container>
          <Stack className={"address-area"}>
            <Box className={"title"}> Our Address </Box>
            <iframe
              style={{ marginTop: "60px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.4074383000003!2d90.38973931454994!3d23.750202985000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b9f9d6f6d9c1%3A0x5c3a5c0f0d7f8d6!2sDhaka%20City%20College!5e0!3m2!1sen!2sbd!4v1660915272494!5m2!1sen!2sbd"
              width="1320"
              height="500"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}