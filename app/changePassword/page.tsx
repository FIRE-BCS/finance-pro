'use client';

import { useState } from 'react';
import "../global.css";
import {
    Paper,
    Grid,
    Stack,
    TextField,
    Button,
    InputAdornment,
    IconButton,
} from '@mui/material'
import {
    VisibilityOff,
    Visibility
} from '@mui/icons-material';
import BaseCard from '../(DashboardLayout)/components/shared/BaseCard';
import RootLayout from '../(DashboardLayout)/layout';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body1,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
  }));
  
const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

export default function ChangePassword(){

  const currentPassword = "password"

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState(false)
  const [error2, setError2] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmNewPassword = () => setShowConfirmNewPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
  };

  return (
    <RootLayout>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <BaseCard title="Change Password">
            <>
            <Stack spacing={3}>
                <TextField
                    id="pass-basic"
                    label="Enter New Password"
                    type={showNewPassword ? 'text' : 'password'}
                    variant="outlined"
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowNewPassword}
                                onMouseDown={handleMouseDownPassword}
                                >
                                {showNewPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                    }}
                    onChange={(e) => {
                      if (e.target.value === currentPassword){
                        setError(true)
                        setErrorMessage("New password cannot be the same as current password")
                      }
                      else if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).test(e.target.value)){
                        setError(true)
                        setErrorMessage("Password must contain at least eight characters, one uppercase letter, one lowercase letter, one number, and one special character")
                      }
                      else if (e.target.value !== currentPassword && (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).test(e.target.value)){
                        setError(false)
                        setErrorMessage("")
                        setNewPassword(e.target.value)
                      }
                      else{
                        setError(false)
                        setErrorMessage("")
                      }
                    }}
                    error={error}
                    helperText={errorMessage}
                />
                <TextField
                    id="pass-confirm"
                    label="Confirm New Password"
                    type={showConfirmNewPassword ? 'text' : 'password'}
                    variant="outlined"
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfirmNewPassword}
                                onMouseDown={handleMouseDownPassword}
                                >
                                {showConfirmNewPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                    }}
                    onChange={(e) => {
                      if (e.target.value !== "" && e.target.value !== newPassword){
                        setError2(true)
                      }
                      else{
                        setError2(false)
                      }
                      setConfirmNewPassword(e.target.value)
                    }}
                    error={error2}
                    helperText={error2? "The passwords do not match":""}
                />
            </Stack>
            <br />
            <Button>
              Submit
            </Button>
            </>
          </BaseCard>
        </Grid>
      </Grid>
    </RootLayout>
  );
};