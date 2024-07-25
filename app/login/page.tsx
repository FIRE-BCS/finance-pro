"use client";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { login } from "./actions";
import Image from "next/image";
import theme from "../../utils/theme";
import { useState } from "react";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  Popover,
} from "@mui/material";
import { useSnackbar } from "notistack";
import ForgetPassword from "./ForgetPassword";
import { getUserData } from "../../utils/supabase/clientApi";
import { useRouter } from "next/navigation";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="sc.com">
        Standard Chartered Bank Singapore
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const validateEmail = (value: string) => {
    if (!value) {
      return "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      return "Invalid email address";
    }
    return "";
  };

  const validatePassword = (value: string) => {
    if (!value) {
      return "Password is required";
    } else if (value.length < 8) {
      return "Password must be at least 8 characters";
    }
    return "";
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    setEmailError(emailValidation);
    setPasswordError(passwordValidation);

    if (!emailValidation && !passwordValidation) {
      try {
        setLoading(true);
        await login(email, password);
        const customerData = await getUserData(email);
        window.sessionStorage.setItem("data", JSON.stringify(customerData));

        router.push("/");
        enqueueSnackbar("Login successful", { variant: "success" });
      } catch (error) {
        enqueueSnackbar("Login Failed", { variant: "error" });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClickOpen = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    setOpen(true);
    return false;
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
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
          <Image
            src="sc_logo.svg"
            alt="logo"
            height={80}
            width={210}
            priority
          />
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 5 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign In"
              )}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  component="button"
                  variant="body2"
                  onClick={(e) => handleClickOpen(e)}
                >
                  Forgot password?
                </Link>
                <Dialog open={open} onClose={handleClose}>
                  <ForgetPassword setOpen={setOpen} />
                </Dialog>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
