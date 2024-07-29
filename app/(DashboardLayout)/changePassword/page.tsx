"use client";

import { useState } from "react";
import {
  Grid,
  Stack,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import BaseCard from "../components/shared/BaseCard";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";

export default function ChangePassword() {
  const currentPassword = "password";

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState(false);
  const [error2, setError2] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error2Message, setError2Message] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmNewPassword = () =>
    setShowConfirmNewPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Box mt={3}>
      <Typography mt="0" variant="h2">
        Change Password
      </Typography>
      <br></br>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <BaseCard>
            <>
              <Stack spacing={3}>
                <TextField
                  id="pass-basic"
                  label="Enter New Password"
                  type={showNewPassword ? "text" : "password"}
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowNewPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showNewPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    if (e.target.value === currentPassword) {
                      setError(true);
                      setErrorMessage(
                        "New password cannot be the same as current password"
                      );
                    } else if (
                      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                        e.target.value
                      )
                    ) {
                      setError(true);
                      setErrorMessage(
                        "Password must contain at least eight characters, one uppercase letter, one lowercase letter, one number, and one special character"
                      );
                    } else if (
                      e.target.value !== currentPassword &&
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                        e.target.value
                      )
                    ) {
                      setError(false);
                      setErrorMessage("");
                      setNewPassword(e.target.value);
                    } else {
                      setError(false);
                      setErrorMessage("");
                    }
                  }}
                  error={error}
                  helperText={errorMessage}
                />
                <TextField
                  id="pass-confirm"
                  label="Confirm New Password"
                  type={showConfirmNewPassword ? "text" : "password"}
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmNewPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showConfirmNewPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    if (e.target.value === "" && newPassword !== "") {
                      setError2(true);
                      setError2Message("Confirm Password cannot be empty");
                    } else if (
                      e.target.value !== "" &&
                      e.target.value !== newPassword
                    ) {
                      setError2(true);
                      setError2Message("The passwords do not match");
                    } else {
                      setError2(false);
                    }
                    setConfirmNewPassword(e.target.value);
                  }}
                  error={error2}
                  helperText={error2 ? error2Message : ""}
                />
              </Stack>
              <br />
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  if (
                    !error &&
                    newPassword !== "" &&
                    !error2 &&
                    confirmNewPassword !== ""
                  ) {
                    enqueueSnackbar("Password successfully changed", {
                      variant: "success",
                    });
                    router.push("/");
                  } else {
                    enqueueSnackbar(
                      "Please ensure the password fields are properly filled and try submitting again",
                      { variant: "error" }
                    );
                  }
                }}
                variant="contained"
              >
                Submit
              </Button>
            </>
          </BaseCard>
        </Grid>
      </Grid>
    </Box>
  );
}
