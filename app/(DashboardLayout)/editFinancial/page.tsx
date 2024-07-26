'use client';

import { useState } from 'react';
import {
    Paper,
    Grid,
    Stack,
    TextField,
    Button,
    InputAdornment,
    MenuItem
} from '@mui/material'
import BaseCard from '../components/shared/BaseCard';
import { useSnackbar } from "notistack";
import { useRouter } from 'next/navigation'

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

    const [newTrading, setNewTrading] = useState("");
    const [newLoan, setNewLoan] = useState("");
    const [newInvestment, setNewInvestment] = useState("");
    const [newFD, setNewFD] = useState("");
    const [newSavings, setNewSavings] = useState("");
    const [newIncome, setNewIncome] = useState("");
    const [tradingError, setTradingError] = useState(false);
    const [loanError, setLoanError] = useState(false);
    const [investmentError, setInvestmentError] = useState(false);
    const [fdError, setFDError] = useState(false);
    const [savingsError, setSavingsError] = useState(false);
    const [incomeError, setIncomeError] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();

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

    let customerData;

    if (typeof window !== "undefined") {
      const data = window.sessionStorage.getItem("data");
      customerData = data ? JSON.parse(data) : {};
    } else {
      customerData = {};
    }

    return (
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <BaseCard title="Edit Financial Preferences">
            <>
            <Stack spacing={3}>
            <TextField
                id="account-trading"
                label="Trading Account No."
                variant="outlined"
                defaultValue="111000000"
                onChange={(e) => {
                  if (e.target.value !== "" && !(/^111\d{6}$/).test(e.target.value)){
                    setTradingError(true)
                  }
                  else{
                    setTradingError(false)
                    setNewTrading(e.target.value)
                  }
                }}
                error={tradingError}
                helperText={tradingError? "Trading account number must begin with '111' with 6 other digits following it":""}
              />
              <TextField
                id="account-loan"
                label="Loan Account No."
                variant="outlined"
                defaultValue="222000000"
                onChange={(e) => {
                  if (e.target.value !== "" && !(/^222\d{6}$/).test(e.target.value)){
                    setLoanError(true)
                  }
                  else{
                    setLoanError(false)
                    setNewLoan(e.target.value)
                  }
                }}
                error={loanError}
                helperText={loanError? "Loan account number must begin with '222' with 6 other digits following it":""}
              />
              <TextField
                id="account-fd"
                label="Fixed Deposit Account No."
                variant="outlined"
                defaultValue="333000000"
                onChange={(e) => {
                  if (e.target.value !== "" && !(/^333\d{6}$/).test(e.target.value)){
                    setFDError(true)
                  }
                  else{
                    setFDError(false)
                    setNewFD(e.target.value)
                  }
                }}
                error={fdError}
                helperText={fdError? "Fixed deposit account number must begin with '333' with 6 other digits following it":""}
              />
              <TextField
                id="account-investment"
                label="Investment Account No."
                variant="outlined"
                defaultValue="444000000"
                onChange={(e) => {
                  if (e.target.value !== "" && !(/^444\d{6}$/).test(e.target.value)){
                    setInvestmentError(true)
                  }
                  else{
                    setInvestmentError(false)
                    setNewInvestment(e.target.value)
                  }
                }}
                error={investmentError}
                helperText={investmentError? "Investment account number must begin with '444' with 6 other digits following it":""}
              />
              <TextField
                id="account-savings"
                label="Savings Account No."
                variant="outlined"
                defaultValue="555000000"
                onChange={(e) => {
                  if (e.target.value !== "" && !(/^555\d{6}$/).test(e.target.value)){
                    setSavingsError(true)
                  }
                  else{
                    setSavingsError(false)
                    setNewSavings(e.target.value)
                  }
                }}
                error={savingsError}
                helperText={savingsError? "Savings account number must begin with '555' with 6 other digits following it":""}
              />
              <TextField
                id="income-yearly"
                label="Yearly Income"
                variant="outlined"
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                defaultValue="100000"
                onChange={(e) => {
                  if (e.target.value !== "" && !(/^\d+$/).test(e.target.value)){
                    setIncomeError(true)
                  }
                  else{
                    setIncomeError(false)
                    setNewIncome(e.target.value)
                  }
                }}
                error={incomeError}
                helperText={incomeError? "Yearly income field must only consist of numerical digits":""}
              />
               <TextField
                id="risk-tolerance"
                select
                label="Risk Tolerance"
                variant="outlined"
                defaultValue={customerData.riskTolerance}
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
                defaultValue={customerData.financialGoal}
              >
                {financialGoals.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.value}
                    </MenuItem>
                ))}
              </TextField>
            </Stack>
            <br />
            <Button
            onClick={(e)=>{
              e.preventDefault()
              if (!tradingError 
                  && !loanError
                  && !fdError
                  && !investmentError
                  && !savingsError
                  && !incomeError
                ){
                enqueueSnackbar("Financial information successfully changed", { variant: "success" });
                router.push("/")
              }
              else{
                enqueueSnackbar("Please ensure the fields are properly filled and try submitting again", { variant: "error" });
              }
            }}>
              Submit
            </Button>
            </>
          </BaseCard>
          <br/>
          <Button variant="contained" color="primary"  sx={{marginTop:'10px'}} href="/myaccount">
                Back
          </Button>
        </Grid>
      </Grid>
    );
  };