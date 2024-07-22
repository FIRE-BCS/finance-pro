'use client';
import { useState } from 'react';
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
} from '@mui/icons-material'
import BaseCard from '../(DashboardLayout)/components/shared/BaseCard';
// import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
// const Item = styled(Paper)(({ theme }) => ({
//     ...theme.typography.body1,
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//     height: 60,
//     lineHeight: '60px',
//   }));
  
// const darkTheme = createTheme({ palette: { mode: 'dark' } });
// const lightTheme = createTheme({ palette: { mode: 'light' } });

export default function Privacy(){

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    return (
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <BaseCard title="Privacy Settings">
            <>
            <Stack spacing={3}>
                <TextField
                    id="pass-basic"
                    label="Enter New Password"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                    }}
                />
                <TextField
                    id="pass-confirm"
                    label="Confirm New Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    variant="outlined"
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfirmPassword}
                                onMouseDown={handleMouseDownPassword}
                                >
                                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                    }}
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
    );
  };