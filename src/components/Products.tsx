import { Button, Card, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import productState from "../store/atoms/productState";

Product.propTypes = {
  product: PropTypes.any.isRequired,
};

function Product({ product }) {
  const navigate = useNavigate();

  return (
    <Card
      style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20,
      }}
    >
      <Typography textAlign={"center"} variant="h5">
        {product.title}
      </Typography>
      <Typography textAlign={"center"} variant="subtitle1">
        {product.description}
      </Typography>
      <img src={product.imageLink} style={{ width: 300 }}></img>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            navigate("/course/" + product._id);
          }}
        >
          Wishlist
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            navigate("/course/" + product._id);
          }}
          style={{ marginLeft: 30 }}
        >
          Shop
        </Button>
      </div>
    </Card>
  );
}

function Products() {
  //const [Products, setProducts] = useState({});

  const [ProductState, setProductState] = useRecoilState(productState);

  useEffect(() => {
    async function fetchdata() {
      const response = await fetch("http://localhost:3000/users/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setProductState(result.availableProducts);
    }

    fetchdata();
  });

  if (ProductState === null) {
    return (
      <div>
        <p>WAIT MACHAA!</p>
      </div>
    );
  } else {
    return (
      <div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {ProductState.map((product) => {
            return <Product key={product._id} product={product} />;
          })}
        </div>
      </div>
    );
  }
}

export default Products;
