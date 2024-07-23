'use client';
import {
    Paper,
    Grid,
    Stack,
    TextField,
    Button,
    InputAdornment,
    MenuItem
} from '@mui/material'
import BaseCard from '../../components/shared/BaseCard';

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

export default function FinancialsForm(){

    const riskTolerance = [
        {
          value: 'Low',
        },
        {
            value: 'Medium',
        },
        {
        value: 'High',
        },
    ];

    const financialGoals = [
        {
          value: 'Family',
        },
        {
            value: 'Housing',
        },
        {
            value: 'Marriage',
        },
        {
            value: 'Retirement Planning',
        },
    ];

    return (
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <BaseCard title="Edit Financial Preferences">
            <>
            <Stack spacing={3}>
              <TextField
                id="account-loan"
                label="Loan Account No."
                variant="outlined"
                defaultValue="Get from supabase"
              />
              <TextField
                id="account-investment"
                label="Investment Account No."
                variant="outlined"
                defaultValue="Get from supabase"
              />
               <TextField
                id="account-fd"
                label="Fixed Deposit Account No."
                variant="outlined"
                defaultValue="Get from supabase"
              />
              <TextField
                id="income-yearly"
                label="Yearly Income"
                variant="outlined"
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                defaultValue="Get from supabase"
              />
               <TextField
                id="risk-tolerance"
                select
                label="Risk Tolerance"
                variant="outlined"
                defaultValue="Get from supabase"
                >
                    {riskTolerance.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.value}
                        </MenuItem>
                    ))}
               </TextField>
               <TextField
                id="financial goal"
                select
                label="Financial Goal"
                variant="outlined"
                defaultValue="Get from supabase"
              >
                {financialGoals.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.value}
                    </MenuItem>
                ))}
              </TextField>
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