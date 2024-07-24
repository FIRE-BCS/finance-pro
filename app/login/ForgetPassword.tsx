import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { forgetPassword } from "./actions";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const validateEmail = (value: string): string => {
    if (!value) {
      return "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      return "Invalid email address";
    }
    return "";
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailValidation = validateEmail(email);
    setEmailError(emailValidation);

    if (!emailValidation) {
      try {
        setLoading(true);
        await forgetPassword(email);
        enqueueSnackbar("Password reset link sent", { variant: "success" });
      } catch (error) {
        enqueueSnackbar("Failed to send reset link", { variant: "error" });
        console.log(error)
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <DialogTitle>Forget Password</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Instructions to reset your password will be sent to your email
        </DialogContentText>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
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
          <DialogActions>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleSubmit}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </>
  );
};

export default ForgotPassword;
