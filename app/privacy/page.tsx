'use client';
import {
    Paper,
    Grid,
    Stack,
    TextField,
    Button,
} from '@mui/material'
import BaseCard from '../(DashboardLayout)/components/shared/BaseCard';
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

const Privacy = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <BaseCard title="Privacy Settings">
            <>
            <Stack spacing={3}>
            <TextField
                id="pass-basic"
                label="Change Password"
                type="password"
                variant="outlined"
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
  
  export default Privacy();