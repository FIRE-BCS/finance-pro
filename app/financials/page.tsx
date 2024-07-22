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

const Financials = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <BaseCard title="Financial Information">
            <>
            <Stack spacing={3}>
              <TextField
                id="account-loan"
                label="Loan Account"
                variant="outlined"
                defaultValue="Get from supabase"
              />
              <TextField
                id="account-investment"
                label="Investment Account"
                variant="outlined"
                defaultValue="Get from supabase"
              />
               <TextField
                id="account-fd"
                label="Fixed Deposit Account"
                variant="outlined"
                defaultValue="Get from supabase"
              />
              <TextField
                id="income-yearly"
                label="Yearly Income"
                variant="outlined"
                defaultValue="Get from supabase"
              />
               <TextField
                id="risk-appetite"
                label="Risk Appetite"
                variant="outlined"
                defaultValue="Get from supabase, to change to drop down field"
              />
               <TextField
                id="financial goal"
                label="Financial Goal"
                variant="outlined"
                defaultValue="Get from supabase, to change to drop down field"
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
  
  export default Financials();