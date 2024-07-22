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

const Account = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <BaseCard title="Account Information">
            <>
            <Stack spacing={3}>
              <TextField
                id="name-full"
                label="Full Name"
                variant="outlined"
                defaultValue="Get from supabase"
              />
              <TextField
                id="name-user"
                label="Username"
                variant="outlined"
                defaultValue="Get from supabase"
              />
              <TextField
                id="email-basic"
                label="Email"
                variant="outlined"
                defaultValue="Get from supabase"
              />
               <TextField
                id="dob"
                label="Date of Birth"
                variant="outlined"
                defaultValue="Get from supabase, to change to date field"
              />
               <TextField
                id="address"
                label="Address"
                variant="outlined"
                defaultValue="Get from supabase"
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
  
  export default Account();