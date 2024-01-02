import "../App.css";
import userState from "../store/atoms/userState";

import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function NavBar() {
  const navigate = useNavigate();

  const [usernameState, setUserNameState] = useRecoilState(userState);

  if (usernameState === "") {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h3"
              component="div"
              sx={{ flexGrow: 1 }}
              onClick={() => {
                navigate("/");
              }}
            >
              TulsiTreats
            </Typography>
            <div className="appBarAboutButton">
              <Button
                color="inherit"
                variant="outlined"
                onClick={() => {
                  navigate("/about");
                }}
              >
                About
              </Button>
            </div>
            <div className="appBarLoginButton">
              <Button
                color="inherit"
                variant="outlined"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
            </div>
            <div>
              <Button
                color="inherit"
                variant="outlined"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                SignUp
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  } else {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h3"
              component="div"
              sx={{ flexGrow: 1 }}
              onClick={() => {
                navigate("/");
              }}
            >
              TulsiTreats
            </Typography>
            <div className="appBarAboutButton">
              <Button
                color="inherit"
                variant="outlined"
                onClick={() => {
                  navigate("/about");
                }}
              >
                About
              </Button>
            </div>
            <div className="appBarLoginButton">
              <Button
                color="inherit"
                variant="outlined"
                onClick={() => {
                  navigate("/cart");
                }}
              >
                Cart
              </Button>
            </div>
            <div>
              <Button
                color="inherit"
                variant="outlined"
                onClick={() => {
                  localStorage.setItem("token", "");
                  localStorage.setItem("username", "");
                  setUserNameState("");
                }}
              >
                logout
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default NavBar;
