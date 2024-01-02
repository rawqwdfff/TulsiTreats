import tree from "../assets/tree.png";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function Landing() {
  return (
    <div>
      <div className="landingPage" style={{ display: "flex" }}>
        <div className="landingPageText">
          <Typography variant="body1" gutterBottom style={{ fontSize: "30px" }}>
            Experience the holistic goodness of nature with our Ayurvedic
            products, crafted to rejuvenate your mind, body, and soul, and
            embrace a journey towards wellness and balance.
          </Typography>
          <Button variant="contained" href="/products">
            Shop
          </Button>
        </div>
        <div>
          <img src={tree} alt="Sample Tree Image" />
        </div>
      </div>
    </div>
  );
}

export default Landing;
