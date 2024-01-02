import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import userState from "../store/atoms/userState";

interface sxProps {
  sx: { mt: number };
}

function Copyright(props: sxProps) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        TulsiTreats
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const setUserNameState = useSetRecoilState(userState);

  useEffect(() => {
    localStorage.setItem("username", username);
  }, [username, password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserNameState(username);
    const data = new FormData(e.currentTarget);
    const response = await fetch("http://localhost:3000/users/signup", {
      method: "POST",
      body: JSON.stringify({
        username: data.get("email"),
        password: data.get("password"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);
    localStorage.setItem("token", result.token);
    navigate("/products");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

// function SignUp() {
//   return (
//     <div>
//       UserName -{" "}
//       <input type={"text"} onChange={(e) => setUserName(e.target.value)} />
//       <br />
//       <br />
//       Password -{" "}
//       <input type={"text"} onChange={(e) => setPassword(e.target.value)} />
//       <br />
//       <button onClick={handleClick}>SignUp</button>
//       <br />
//       Already a user? <a href="/login">Login</a>
//     </div>
//   );
// }

// export default SignUp;
