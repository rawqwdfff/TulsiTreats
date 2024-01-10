import { Button, Card, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import productState from "../store/atoms/productState";

interface productType {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageLink: string;
  InStock: boolean;
}

interface productComponentType {
  key: string;
  product: productType;
}

const Product: React.FC<productComponentType> = (productComponent) => {
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
        {productComponent.product.title}
      </Typography>
      <Typography textAlign={"center"} variant="subtitle1">
        {productComponent.product.description}
      </Typography>
      <img
        src={productComponent.product.imageLink}
        style={{ width: 300 }}
      ></img>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            navigate("/course/" + productComponent.product._id);
          }}
        >
          Wishlist
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            navigate("/course/" + productComponent.product._id);
          }}
          style={{ marginLeft: 30 }}
        >
          Shop
        </Button>
      </div>
    </Card>
  );
};

const Products: React.FC = () => {
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
        <p>WAIT!</p>
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
          {ProductState.map((product: productType) => {
            return <Product key={product._id} product={product} />;
          })}
        </div>
      </div>
    );
  }
};

export default Products;
